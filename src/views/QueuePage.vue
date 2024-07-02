<script setup lang="ts">
import type { Ticket } from '../models/ticket.interface';
import { fetchQueueTickets } from '../utils/tickets.utils';
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';


const router = useRouter()

const tickets = ref([] as Ticket[])

const taps = ref(0 as number)

const getQueueTickets = async () => {
    tickets.value = await fetchQueueTickets();
    // tickets.value.push(newTickets.value[newTickets.value.length - 1]);
}

const handleTaps = () => {
    console.log(taps.value)
    taps.value++;
    if (taps.value === 3) {
        router.push("/admin")
    }
}
onMounted(() => {
    getQueueTickets();
    setInterval(() => {
        getQueueTickets();
    }, 5000)
})
</script>
<template>
    <div class="queue-container h-full w-full p-4" @click="handleTaps()">

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
            <div class="tickets w-1/4 h-full  flex flex-wrap bg-purple-800">
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">Номер</div>
                    <div class="window w-full text-center">Окно</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>
                <div class="ticket w-full flex justify-around text-2xl">
                    <div class="number w-full text-center">1</div>
                    <div class="window w-full text-center">2</div>
                </div>


            </div>
        </div>
        <footer class="flex w-full ">
            <div class="logo flex w-full">
                <div class="img">
                    <img src="/public/logo.svg" alt="" width="300">
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
                    <img src="/public/bach.gif" alt="" width="300">
                </div>

                <div class="text text-center flex justify-center items-center">
                    <div>
                    <div>Сканируйте QR</div><br>
                
                </div>
                </div>
            </div>
        </footer>
        <!-- <div v-if="tickets.length > 0" class="tickets">

            <div v-for="ticket in tickets" :key="ticket.id" class="ticket">
                <div class="ticketNum">
                    {{ ticket.ticketNumber }}
                </div>
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                </div>
                <div class="windowNum">
                    {{ ticket.windowNum }}
                </div>
            </div>
        </div>
        <div class="text-3xl text-center" v-else> 
            Пусто
        </div> -->

    </div>
</template>
<style lang="scss" scoped>
.queue-container {
    width: 100%;
    height: 100%;
}
.text{
    
    div{
        font-size: 30px;
        padding: auto;
        font-weight: bold;
        color: rgb(82, 19, 141)

        
    }
}

.ticket {
    div {
        color: yellow;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center
    }
}
</style>
