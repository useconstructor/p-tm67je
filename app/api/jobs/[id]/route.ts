import {handle,jobs} from '@/lib/api';
type Context={params:Promise<{id:string}>};
export const GET=(req:Request,c:Context)=>handle(async()=>jobs(req,(await c.params).id));
export const PATCH=(req:Request,c:Context)=>handle(async()=>jobs(req,(await c.params).id));
