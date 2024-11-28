<script setup lang="ts">
import type { Ticket } from '../models/ticket.interface';
import { fetchQueueTickets } from '../utils/tickets.utils';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { InfoStorage } from '../models/infoStorage.interface';
import RunningLineVue from '../components/RunningLine.vue';

import QrcodeVue from 'qrcode.vue';

const host = import.meta.env.VITE_SERVER_API_HOST;
const terminalPort = import.meta.env.VITE_TERMINAL_PORT;




const router = useRouter();

const queueInfo = ref({} as InfoStorage);
const branchSelected = ref<boolean>(true);

const ticketsMap = ref<Map<number, Ticket>>(new Map());
const allTickets = ref<Set<number>>(new Set());

const audioContext = ref<AudioContext | null>(null);
const audioInitialized = ref(false);
let isFetching = false;

const getQueueTickets = async () => {
    if (isFetching) return;
    isFetching = true;

    try {
        const incomingTickets = await fetchQueueTickets(queueInfo.value);
        let newTicketsAdded = false;

        incomingTickets.forEach(ticket => {
            if (!allTickets.value.has(ticket.ticketNumber)) {
                newTicketsAdded = true;
                allTickets.value.add(ticket.ticketNumber);
                ticketsMap.value.set(ticket.ticketNumber, ticket);
            }
        });

        // Limit the size of ticketsMap
        if (ticketsMap.value.size > 10) {
            const keys = Array.from(ticketsMap.value.keys()).sort((a, b) => {
                const ticketA = ticketsMap.value.get(a);
                const ticketB = ticketsMap.value.get(b);
                return new Date(ticketB?.serviceStartTime || 0).getTime() - new Date(ticketA?.serviceStartTime || 0).getTime();
            });

            const keysToRemove = keys.slice(10);
            keysToRemove.forEach(key => {
                ticketsMap.value.delete(key);
                allTickets.value.delete(key);
            });
        }

        if (newTicketsAdded) {
            const latestTicket = Array.from(ticketsMap.value.values()).reduce((latest, current) => {
                return new Date(current.serviceStartTime).getTime() > new Date(latest.serviceStartTime).getTime() ? current : latest;
            }, incomingTickets[0]);

            const lang = latestTicket.language === "KAZ" ? "KZ" : latestTicket.language === "RUS" ? "RU" : "EN";
            await playAudioForTicket(latestTicket, lang);
        }

    } catch (error) {
        console.error('Error fetching tickets:', error);
    } finally {
        isFetching = false;
        setTimeout(getQueueTickets, 5000);
    }
};

// Function to play audio for a ticket
const playAudioForTicket = async (ticket: Ticket, lang: string) => {
    const voicePlayList = createVoicePlayList(ticket, lang);
    await playAudioSequence(voicePlayList);
};

const createVoicePlayList = (ticket: Ticket, lang: string): string[] => {
    let baseDir = '/src/assets/Voice/';
    const playList: string[] = [];
    playList.push(`${baseDir}01_NUM_${lang}.wav`);
    Say(ticket.ticketNumber, lang, baseDir, playList);
    playList.push(`${baseDir}02_NUM_${lang}.wav`);
    if (['KZ', 'KG'].includes(lang)) {
        SayTurkic(ticket.windowNum, lang, baseDir, playList);
    } else {
        Say(ticket.windowNum, lang, baseDir, playList);
    }
    return playList;
};

const playAudioSequence = async (playList: string[]) => {
    if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    }

    for (const audioSrc of playList) {
        await playSound(audioSrc);
    }
};

const playSound = (audioSrc: string) => {
    return new Promise<void>((resolve, reject) => {
        fetch(audioSrc)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                if (!audioContext.value) return;
                return audioContext.value.decodeAudioData(buffer);
            })
            .then(decodedData => {
                if (!audioContext.value || !decodedData) return;
                const source = audioContext.value.createBufferSource();
                source.buffer = decodedData;
                source.connect(audioContext.value.destination);
                source.onended = resolve;
                source.start(0);
            })
            .catch(error => {
                console.error('Error playing sound:', error);
                resolve(); // Proceed even if there's an error
            });
    });
};

const Say = (number: number, locale: string, baseDir: string, playList: string[]) => {
    locale = locale.toUpperCase();
    let S = number.toString();
    while (S.length !== 3) {
        S = '0' + S;
    }

    let F = S[0];
    if (F !== '0') {
        playList.push(`${baseDir}${F}00_${locale}.wav`);
    }

    S = S.slice(1);
    F = S[0];
    if (F !== '0') {
        if (parseInt(S) >= 10 && parseInt(S) <= 19 && ['RU', 'EN'].includes(locale)) {
            playList.push(`${baseDir}${S}_${locale}.wav`);
            return;
        } else {
            playList.push(`${baseDir}${F}0_${locale}.wav`);
        }
    }

    S = S.slice(1);
    F = S[0];
    if (F !== '0') {
        playList.push(`${baseDir}${F}_${locale}.wav`);
    }
};

const SayTurkic = (number: number, locale: string, baseDir: string, playList: string[]) => {
    let S = number.toString();
    locale = locale.toUpperCase();
    while (S.length !== 3) {
        S = '0' + S;
    }

    if (S.slice(1) === '00') {
        playList.push(`${baseDir}${locale}_${S}.wav`);
        return;
    } else if (S[0] !== '0') {
        playList.push(`${baseDir}${S[0]}00_${locale}.wav`);
    }

    S = S.slice(1);
    if (S[1] === '0') {
        playList.push(`${baseDir}${locale}_${S}.wav`);
    } else {
        if (S[0] !== '0') {
            playList.push(`${baseDir}${S[0]}0_${locale}.wav`);
        }
    }

    if (S[1] !== '0') {
        playList.push(`${baseDir}${locale}_${S[1]}.wav`);
    }
    playList.push(`${baseDir}03_NUM_KZ.wav`);
};

const initializeAudioContext = () => {
    if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.value.state === 'suspended') {
        audioContext.value.resume();
    }
    audioInitialized.value = true;
};

const getBranchIdFromLocalStorage = () => {
    const infoObject = localStorage.getItem("branch");
    if (infoObject) {
        queueInfo.value = JSON.parse(infoObject) as InfoStorage;
    } else {
        branchSelected.value = false;
    }
};

const ticketColumns = computed(() => {
    const ticketsArray = Array.from(ticketsMap.value.values()).sort((a, b) => {
        return new Date(b.serviceStartTime).getTime() - new Date(a.serviceStartTime).getTime();
    });
    const chunkSize = 5; // Number of rows per column
    const columns = 3; // Number of columns
    const result = [];
    for (let i = 0; i < columns; i++) {
        result.push(ticketsArray.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
});
const getBranchQR = () => {
    return `http://${host}:${terminalPort}?branch=${queueInfo.value.branchId}`
   
}

const handleTaps = () => {
    router.push("/admin");
}


onMounted(() => {
    getBranchIdFromLocalStorage();
    getQueueTickets();
    initializeAudioContext();
});
</script>

<template>
    <div class="queue-container h-full w-full p-4">
        <h1 v-if="!branchSelected" class="text-3xl text-red-600 text-center">Выберите отделение в настройках</h1>
        <button id="audioButton" class="initbutton" v-if="!audioInitialized" @click="initializeAudioContext">Инициализация аудио</button>
        <div v-else class="mainBlock w-full h-4/6 flex">
            <div
                v-for="(column, colIndex) in ticketColumns"
                :key="colIndex"
                class="tickets w-1/3 h-full flex flex-wrap  overflow-hidden"
            >
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">Номер</div>
                    <div class="window w-full text-center">Окно</div>
                </div>
                <div
                    v-for="ticket in column"
                    :key="ticket?.id"
                    class="ticket w-full flex justify-around text-2xl"
                >
                    <div class="number w-full text-center text-5xl">
                        {{ ticket?.ticketNumber ?? '-' }}
                    </div>
                    <div class="window w-full text-center text-5xl">
                        {{ ticket?.windowNum ?? '-' }}
                    </div>
                </div>
            </div>
        </div>
        
        <footer class=" w-full">
            <div class="flex w-full">
                <div class="logo  flex w-full">
                    <div class="img img flex justify-center items-center">
                        <!-- <img src="../assets/logo.jpeg" alt="" width="250"> -->
                    </div>
                    <div class="text text-center flex justify-center items-center">
                        <div>
                            <!-- <div>Астана Медицина Университеті</div><br>
                            <div>Медицинский Университет Астана</div><br>
                            <div>Astana Medical University</div><br> -->
                        </div>
                    </div>
                </div>
                <div class="qr w-full flex justify-around my-4">
                    <div class="img flex justify-center items-center">
                        <qrcode-vue  :size="400"
                        level="H"
                        background="#ffffff"
                        foreground="#000000"
                        render-as="svg"  :value="getBranchQR()"></qrcode-vue>
                    </div>
                    <div class="text text-center flex justify-center items-center">
                        <div>
                            <div>Сканируйте QR</div><br>
                        </div>
                    </div>
                    <v-btn @click="handleTaps()" class="absolute bottom-0 right-0"><i class="fas fa-tools"></i></v-btn>
                </div>

            </div>
            <div class="runningText">
                <RunningLineVue>
                    {{ queueInfo.running_text || "Добро пожаловать" }}
                </RunningLineVue>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.queue-container {
    width: 100%;
    height: 100%;
}
.initbutton{
    position: absolute;
    top: 20%;
    left: 30%;
    border: 3px solid black;
    padding: .5rem;
}

.text {
    div {
        font-size: 24px;
        padding: auto;
        font-weight: bold;
        color: black;
    }
}
.tickets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px; // Add spacing between rows
    overflow: hidden;
    background-color: #06a9d1;

    .ticket {
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
        border: 1px solid black;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;

        div {
            width: 50%;
            text-align: center;
        }
    }
}


.ticket {
    div {
        color: rgb(253, 253, 253);
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
