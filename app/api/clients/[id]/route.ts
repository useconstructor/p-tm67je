import {handle,clients} from '@/lib/api';
type Context={params:Promise<{id:string}>};
export const GET=(req:Request,c:Context)=>handle(async()=>clients(req,(await c.params).id));
export const PATCH=(req:Request,c:Context)=>handle(async()=>clients(req,(await c.params).id));
