import axios, { type AxiosResponse } from "axios";


import {  QUEUE_URL, BASE_URL } from "./base.utils";
import type { Ticket } from "@/models/ticket.interface";
import type { Service } from "@/models/services.interface"
import type { TicketInfo } from "@/models/ticketInfo";

const branch = localStorage.getItem("branch");
export const fetchQueueTickets = async (): Promise<Ticket[]> => {
    try {
        // const object = {
        //     serviceId: 1,
        //     branchId: 1,
        //     agent: null
        // }
        const branch = localStorage.getItem("branch");
        const response: AxiosResponse<Ticket[]> = await axios.get<Ticket[]>(`${QUEUE_URL}?branchId=${branch}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}


