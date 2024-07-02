export interface Service {
    id: number;
    name: string;
    description: string;
    parentName: string;
    priority: number;
    parentId: number;
    maxServTime:number,
    maxWaitTIme:number
}