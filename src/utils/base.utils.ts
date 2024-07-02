const host = import.meta.env.VITE_SERVER_API_HOST;
const port = import.meta.env.VITE_SERVER_API_PORT;

export const BASE_URL = `http://${host}:${port}/api/v1`


export const TICKETS_URL = `${BASE_URL}/tickets/available-services`
export const REGISTER_TICKET_URL = `${BASE_URL}/tickets/register`
export const USER_TICKETS_URL = `${BASE_URL}/tickets/agent`
export const QUEUE_URL = `${BASE_URL}/tickets/queue`
export const BRANCHES_URL = `${BASE_URL}/branches`
