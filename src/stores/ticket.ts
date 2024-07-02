import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ticket } from "../models/ticket.interface";
import type { TicketInfo } from "../models/ticketInfo";


export const useTicketStore = defineStore('ticket', () => {
    const ticket = ref({} as Ticket);

    const setTicket = (newTicket: Ticket) => {
        ticket.value = newTicket;
    }
    const getTicket = () => {
        return ticket.value;
    }

    return {  setTicket, getTicket }
})
export const useLangStore = defineStore('lang', () => {
    const lang = ref("KAZ");

    const setLang = (newTicket: string) => {
        lang.value = newTicket;
    }
    const getLang = () => {
        return lang.value;
    }

    return { setLang,  getLang }
})
export const useStore = defineStore('store', () => {
    const info = ref({} as TicketInfo);
    const isMobile = ref(false)

    const setInfo = (value: TicketInfo) => {
        info.value = value;
    }
    const getInfo = () => {
        return info.value;
    }
    const setMobile = (value: boolean): void => {
        isMobile.value = value;
    }
    const getMobile = (): boolean => {
        return isMobile.value;
    }

    return { setInfo, getInfo, setMobile, getMobile }
})

