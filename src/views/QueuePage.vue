<script setup lang="ts">
import type { Ticket } from '../models/ticket.interface';
import { fetchQueueTickets } from '../utils/tickets.utils';
import { onMounted, ref } from 'vue';
import { useLangStore } from '@/stores/ticket';
import { useRouter } from 'vue-router';


const router = useRouter()
const langStore = useLangStore();
const tickets = ref([] as Ticket[])
const newTickets = ref([] as Ticket[])
const taps = ref(0 as number)

const getQueueTickets = async () => {
    tickets.value = await fetchQueueTickets();
    // tickets.value.push(newTickets.value[newTickets.value.length - 1]);
}
const getLang = () => {
    return langStore.getLang()
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
    <div class="queue-container" @click="handleTaps()">

        <div class="title text-center text-3xl">
            {{ getLang() === "RUS" ? "Очередь" : getLang() === "KAZ" ? "Кезек" : "Queue" }}
        </div>
        <div v-if="tickets.length > 0" class="tickets">

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
            {{ getLang() === "RUS" ? "Пусто" : getLang() === "KAZ" ? "Бос" : "Empty" }}
        </div>

    </div>
</template>
<style lang="scss" scoped>
.queue-container {
    width: 100%;
    height: 100%;
}

.tickets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.ticket {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 42px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 1rem;

    .icon {
        font-size: 50px;
    }

    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
