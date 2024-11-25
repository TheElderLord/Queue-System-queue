<script setup lang="ts">
import type { Ticket } from '../models/ticket.interface';
import { fetchQueueTickets } from '../utils/tickets.utils';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';


const videos = [
    "https://youtu.be/wmnw6Ulb6ps",
    "https://youtu.be/JPkui8Z06C8",
    "https://youtu.be/9FVi63VqefM",
    "https://youtu.be/NxC3V92BaPA",
    "https://youtu.be/Vq8TsZXmVXw",
    "https://youtu.be/TvrBJIbNYpY",
]

import bachelor from "../assets/bach.gif"
import res from "../assets/res.gif"
import master from "../assets/master.gif"


import type { InfoStorage } from '../models/infoStorage.interface';
import RunningLineVue from '../components/RunningLine.vue';
// import ShowClips from '../components/ShowClips.vue';

const router = useRouter();

const queueInfo = ref({} as InfoStorage);
const branchSelected = ref<boolean>(true);

const incomingTickets = ref<Ticket[]>([]);
const tickets = ref<(Ticket | null)[]>([]);
const allTickets = ref<(Number)[]>([]);



const audioContext = ref<AudioContext | null>(null);
const VoicePlayList: string[] = [];
const audioInitialized = ref(false);


// const getQueueTickets = async () => {
//     incomingTickets.value = await fetchQueueTickets(queueInfo.value.branchId);
//     if (incomingTickets.value.length > 0) {
//         const latestTicket = incomingTickets.value[incomingTickets.value.length - 1];
//         if (!tickets.value.some(ticket => ticket && ticket.id === latestTicket.id)) {
//             tickets.value.unshift(latestTicket);
//             const lang = latestTicket.language === "KAZ" ? "KZ" : latestTicket.language === "RUS" ? "RU" : "EN";
//             createVoicePlayList(latestTicket, lang);
//             playAudio();
//             tickets.value.pop(); // Remove the last ticket to keep the array size fixed
//         }
//     }
// }

const getQueueTickets = async () => {
    // tickets.value = await fetchQueueTickets(queueInfo.value.branchId);
    // tickets.value.sort((a, b) => {
    //     return new Date(a.serviceStartTime).getTime() - new Date(b.serviceStartTime).getTime();
    // });


    incomingTickets.value = await fetchQueueTickets(queueInfo.value.branchId);
    if (incomingTickets.value.length > 0) {
        let finished = false;
        incomingTickets.value.map(e => {
            const latestTicket = e;
            if (!allTickets.value.some(ticket => ticket && ticket === latestTicket.ticketNumber)) {
                finished = true;
                allTickets.value.unshift(latestTicket.ticketNumber);
                tickets.value.unshift(latestTicket);

                // const lang = latestTicket.language === "KAZ" ? "KZ" : latestTicket.language === "RUS" ? "RU" : "EN";
                // createVoicePlayList(latestTicket, lang);
                // playAudio();
                // tickets.value.pop(); // Remove the last ticket to keep the array size fixed
            }
        });

        if (tickets.value.length > 10) {
            tickets.value.splice(10);
        }
        if (allTickets.value.length > 20) {
            allTickets.value.splice(20);
        }
        tickets.value.sort((a, b) => {
            return new Date(b.serviceStartTime).getTime() - new Date(a.serviceStartTime).getTime();
        });
        if (finished) {
            const last = tickets.value[0];
            // const lang = last.language === "KAZ" ? "KZ" : last.language === "RUS" ? "RU" : "EN";
            createVoicePlayList(last, "RU");
            playAudio();
            //         if (tickets.value.length > 12) {
            //     tickets.value.splice(12); // Removes all elements after the 10th one
            // }
        }


    }
    console.log(tickets.value)
}

const handleTaps = () => {
    router.push("/admin");
}

const getBranchIdFromLocalStorage = () => {
    const infoObject = localStorage.getItem("branch");
    if (infoObject) {
        queueInfo.value = JSON.parse(infoObject) as InfoStorage;
    } else {
        branchSelected.value = false;
    }
}

const createVoicePlayList = (ticket: Ticket, lang: string) => {
    let baseDir = '/src/assets/Voice/';
    VoicePlayList.push(`${baseDir}01_NUM_${lang}.wav`);
    Say(ticket.ticketNumber, lang, baseDir);
    VoicePlayList.push(`${baseDir}02_NUM_${lang}.wav`);
    if (['KZ', 'KG'].includes(lang)) {
        SayTurkic(ticket.windowNum, lang, baseDir);
    } else {
        Say(ticket.windowNum, lang, baseDir);
    }
    VoicePlayList.push('stop');
}

const playAudio = async () => {
    if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    }

    while (VoicePlayList.length > 0) {
        const audioSrc = VoicePlayList.shift();
        if (audioSrc === 'stop') break;
        await playSound(audioSrc);
    }
}

const playSound = (audioSrc: string) => {
    return new Promise<void>((resolve, reject) => {
        fetch(audioSrc)
            .then(response => response.arrayBuffer())
            .then(buffer => audioContext.value?.decodeAudioData(buffer))
            .then(decodedData => {
                const source = audioContext.value?.createBufferSource();
                if (source) {
                    source.buffer = decodedData;
                    source.connect(audioContext.value.destination);
                    source.onended = resolve;
                    source.start(0);
                }
            })
            .catch(reject);
    });
}

const Say = (Number: number, Locale: string, baseDir: string) => {
    Locale = Locale.toUpperCase();
    let S = Number.toString();
    while (S.length !== 3) {
        S = '0' + S;
    }

    let F = S[0];
    if (F !== '0') {
        VoicePlayList.push(`${baseDir}${F}00_${Locale}.wav`);
    }

    S = S.slice(1);
    F = S[0];
    if (F !== '0') {
        if (parseInt(S) >= 10 && parseInt(S) <= 19 && ['RU', 'EN'].includes(Locale)) {
            VoicePlayList.push(`${baseDir}${S}_${Locale}.wav`);
            return;
        } else {
            VoicePlayList.push(`${baseDir}${F}0_${Locale}.wav`);
        }
    }

    S = S.slice(1);
    F = S[0];
    if (F !== '0') {
        VoicePlayList.push(`${baseDir}${F}_${Locale}.wav`);
    }
}

const SayTurkic = (Number: number, Loc_t: string, baseDir: string) => {
    let S = Number.toString();
    Loc_t = Loc_t.toUpperCase();
    while (S.length !== 3) {
        S = '0' + S;
    }

    let F = S[0];
    if (S.slice(1) === '00') {
        VoicePlayList.push(`${baseDir}${Loc_t}_${S}.wav`);
        return;
    } else if (F !== '0') {
        VoicePlayList.push(`${baseDir}${F}00_${Loc_t}.wav`);
    }

    S = S.slice(1);
    F = S[0];
    if (S[1] === '0') {
        VoicePlayList.push(`${baseDir}${Loc_t}_${S}.wav`);
    } else {
        if (F !== '0') {
            VoicePlayList.push(`${baseDir}${F}0_${Loc_t}.wav`);
        }
    }

    S = S.slice(1);
    F = S[0];
    if (F !== '0') {
        VoicePlayList.push(`${baseDir}${Loc_t}_${F}.wav`);
    }
    VoicePlayList.push(`${baseDir}03_NUM_KZ.wav`)
}

const initializeAudioContext = () => {
    if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.value.state === 'suspended') {
        audioContext.value.resume();
    }
    audioInitialized.value = true;
}

const getBranchQR = () => {
    
    switch (queueInfo.value.branchId) {
        case 1: return res;
        case 2: return bachelor;
        case 3: return master;
    }

}
const ticketColumns = computed(() => {
    const chunkSize = 5; // Number of rows per column
    const columns = 3; // Number of columns
    const result = [];
    for (let i = 0; i < columns; i++) {
        result.push(tickets.value.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
});



// watch(tickets.value,()=>{
//     if(tickets.value.length>12){
//         tickets.value.splice(12); 
//     }
// })

onMounted(() => {
    getBranchIdFromLocalStorage();
    getQueueTickets();
    setInterval(getQueueTickets, 5000);

//     document.addEventListener('DOMContentLoaded', () => {
//     const button = document.getElementById('audioButton');

//     if (button) {
//         button.click();
//         console.log("Audio initialization triggered programmatically!");
//     } else {
//         console.error("Audio button not found!");
//     }
// });

    // initializeAudioContext(); // Refresh tickets every 3 seconds
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
                class="tickets w-1/3 h-full flex flex-wrap bg-purple-800 overflow-hidden"
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
                <div class="qr w-full flex justify-around">
                    <div class="img flex justify-center items-center">
                        <img v-if="queueInfo.show_qr" :src="getBranchQR()" alt="" width="250">
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
        color: rgb(82, 19, 141);
    }
}
.tickets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px; // Add spacing between rows
    overflow: hidden;

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
        color: yellow;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
