import {handle,clients} from '@/lib/api';
export const GET=(req:Request)=>handle(()=>clients(req));
export const POST=(req:Request)=>handle(()=>clients(req));
