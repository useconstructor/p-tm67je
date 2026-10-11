import {handle,jobs} from '@/lib/api';
export const GET=(req:Request)=>handle(()=>jobs(req));
export const POST=(req:Request)=>handle(()=>jobs(req));
