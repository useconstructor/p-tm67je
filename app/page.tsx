import Agenda from '@/components/agenda';
import {zone} from '@/lib/api';
import {today} from '@/lib/time';
export const dynamic='force-dynamic';
export default function Page(){return <Agenda zone={zone} initialDate={today(zone)}/>;}
