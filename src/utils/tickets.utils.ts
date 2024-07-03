import axios, { type AxiosResponse } from "axios";


import {  QUEUE_URL, BASE_URL } from "./base.utils";
import type { Ticket } from "@/models/ticket.interface";


export const fetchQueueTickets = async (branch:number): Promise<Ticket[]> => {
    try {
        const url = `${QUEUE_URL}?branchId=${branch}`;
        // console.log(url)
        const response: AxiosResponse<Ticket[]> = await axios.get<Ticket[]>(url);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}


