<script setup lang="ts">
import type { Ticket } from '../models/ticket.interface';
import { fetchQueueTickets } from '../utils/tickets.utils';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();

const incomingTickets = ref<Ticket[]>([]);
const tickets = ref<(Ticket | null)[]>(Array(6).fill(null));
const branchId = ref<number>(0);
const branchSelected = ref<boolean>(true);

const audioPlayer = ref(null);
const audioSources = ref([
    '/src/assets/Voice/01_NUM_EN.wav',
    '/src/assets/Voice/2_EN.wav',
    '/src/assets/Voice/02_NUM_EN_FOLLOW.wav',
    '/src/assets/Voice/4_EN.wav',
]);

const getQueueTickets = async () => {
    incomingTickets.value = await fetchQueueTickets(branchId.value);
    if (incomingTickets.value.length > 0) {
        const latestTicket = incomingTickets.value[incomingTickets.value.length - 1];
        if (!tickets.value.some(ticket => ticket && ticket.id === latestTicket.id)) {
            console.log(latestTicket);
            tickets.value.unshift(latestTicket);
            const lang = latestTicket.language === "KAZ" ? "KZ" : latestTicket.language === "RUS" ? "RU" : "EN";
            audioSources.value = [
                `/src/assets/Voice/01_NUM_${lang}.wav`,
                `/src/assets/Voice/2_${lang}.wav`,
                `/src/assets/Voice/02_NUM_${lang}.wav`,
                `/src/assets/Voice/4_${lang}.wav`
            ]
            playAudio();
            tickets.value.pop(); // Remove the last ticket to keep the array size fixed
        }
    }
}

const handleTaps = () => {
    router.push("/admin");
}

const getBranchIdFromLocalStorage = () => {
    const branch = localStorage.getItem("branch");
    if (branch) {
        branchId.value = parseInt(branch);
    } else {
        branchSelected.value = false;
    }
}

const playAudio = async () => {
    for (let i = 0; i < audioSources.value.length; i++) {
        audioPlayer.value.src = audioSources.value[i];
        await new Promise((resolve) => {
            audioPlayer.value.onended = resolve;
            audioPlayer.value.play();
        });
    }
};


onMounted(() => {
    getBranchIdFromLocalStorage();
    getQueueTickets();
    setInterval(getQueueTickets, 3000); // Refresh tickets every 3 seconds
});
</script>

<template>
    <div class="queue-container h-full w-full p-4">
        <audio class="hidden" ref="audioPlayer" controls />
        <h1 v-if="!branchSelected" class="text-3xl text-red-600 text-center">Выберите отделение в настройках</h1>
        <div class="mainBlock w-full h-3/5 flex">
            <div class="leftBlock w-3/4 h-full">
                <iframe class="w-full h-full"
                    src="https://www.youtube.com/embed/5VPE2sA6hXw?playlist=5VPE2sA6hXw&loop=1&autoplay=1&mute=1"
                    title="Alan Walker, Dua Lipa, Coldplay, Martin Garrix &amp; Kygo, The Chainsmokers Style 🔥 Summer Vibes #5"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
            </div>
            <div class="tickets w-1/4 h-full flex flex-wrap bg-purple-800">
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">Номер</div>
                    <div class="window w-full text-center">Окно</div>
                </div>
                <div v-for="ticket in tickets" :key="ticket?.id ?? 'placeholder'"
                    class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">{{ ticket?.ticketNumber ?? '-' }}</div>
                    <div class="window w-full text-center">{{ ticket?.windowNum ?? '-' }}</div>
                </div>

            </div>
        </div>
        <footer class="flex w-full">
            <div class="logo flex w-full">
                <div class="img">
                    <img src="../assets/logo.svg" alt="" width="300">
                </div>
                <div class="text text-center flex justify-center items-center">
                    <div>
                        <div>Астана Медицина Университеті</div><br>
                        <div>Медицинский Университет Астана</div><br>
                        <div>Astana Medical University</div><br>
                    </div>
                </div>
            </div>
            <div class="qr w-full flex justify-around">
                <div class="img">
                    <img src="../assets/bach.gif" alt="" width="300">
                </div>
                <div class="text text-center flex justify-center items-center">
                    <div>
                        <div>Сканируйте QR</div><br>
                    </div>
                </div>
                <v-btn @click="handleTaps()" class="absolute bottom-0 right-0"><i class="fas fa-tools"></i></v-btn>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.queue-container {
    width: 100%;
    height: 100%;
}

.text {
    div {
        font-size: 30px;
        padding: auto;
        font-weight: bold;
        color: rgb(82, 19, 141);
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
