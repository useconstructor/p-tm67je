import { Temporal } from '@js-temporal/polyfill';
export const statuses = { pending: 'Pendiente', active: 'En curso', done: 'Finalizado', cancelled: 'Cancelado' } as const;
export type Status = keyof typeof statuses;
export type Client = {id:string; name:string; phone:string; email:string; notes:string; created_at:string; updated_at:string};
export type Job = {id:string; client_id:string; client_name:string; title:string; start:string; end:string; status:Status; notes:string; created_at:string; updated_at:string};
export function today(zone:string) { return Temporal.Now.zonedDateTimeISO(zone).toPlainDate().toString(); }
export function addDays(date:string, days:number) { return Temporal.PlainDate.from(date).add({days}).toString(); }
export function weekStart(date:string) { const d=Temporal.PlainDate.from(date); return d.subtract({days:d.dayOfWeek-1}).toString(); }
export function interval(date:string, week:boolean, zone:string) {
 const first=week?weekStart(date):date;
 return {start: Temporal.PlainDate.from(first).toZonedDateTime(zone).toInstant().toString(),end:Temporal.PlainDate.from(addDays(first,week?7:1)).toZonedDateTime(zone).toInstant().toString()};
}
export function localToUTC(date:string,time:string,zone:string) { return Temporal.ZonedDateTime.from(`${date}T${time}[${zone}]`,{disambiguation:'reject'}).toInstant().toString({smallestUnit:'millisecond'}); }
export function localParts(utc:string,zone:string) { const d=Temporal.Instant.from(utc).toZonedDateTimeISO(zone);return {date:d.toPlainDate().toString(),time:d.toPlainTime().toString().slice(0,5)}; }
export function dateLabel(date:string,options:Intl.DateTimeFormatOptions={weekday:'long',day:'numeric',month:'long'}) {return new Intl.DateTimeFormat('es', {...options,timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`));}
