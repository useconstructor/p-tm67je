# Agenda Taller

Agenda operativa en español con clientes, horarios, estados y persistencia en Turso. La ruta raíz abre Agenda; no se crean semillas ni se envían mensajes externos.

## Configuración

Configura en el servidor:

- `TURSO_DATABASE_URL`: URL de la base de datos provisionada.
- `TURSO_AUTH_TOKEN`: credencial de Turso.
- `WORKSHOP_TIMEZONE`: zona IANA del taller, por ejemplo la zona real elegida por su responsable. Si no está configurada se usa UTC, visible en la agenda.

Las credenciales solo se utilizan en `lib/db.ts`, marcado `server-only`. No existe una base local predeterminada ni persistencia en el navegador. Sin configuración, la interfaz presenta un error recuperable.

`migrations/001_agenda.sql` documenta el esquema. La inicialización idempotente aplica las tablas, restricciones e índices antes de acceder a los datos. No contiene datos de ejemplo.

## Ejecutar

```sh
npm install
npm run dev
npm run build
npm run start
npm run lint
```

La agenda comienza en la zona configurada o en UTC, etiquetado como tiempo universal. El control Filtros permite seleccionar una zona IANA; cambiarla modifica la presentación y el intervalo consultado, sin escribir sobre trabajos existentes. Al crear o cambiar horarios, el servidor valida la zona seleccionada y convierte a UTC. Editar otros campos conserva los instantes guardados. Se rechazan horas inexistentes o ambiguas por cambios de horario. Los conflictos se comprueban en una transacción; una confirmación identifica los registros y versiones específicos que el usuario ha visto.

## Verificación

La compilación de producción, TypeScript y ESLint pasan; la auditoría de dependencias de producción no detecta vulnerabilidades. El flujo completo se verificó en Chromium contra el servidor de producción y una base aislada mediante el mismo cliente libSQL: cliente contextual, trabajo, validación, edición, estados, coincidencias rechazadas y confirmadas por versión, búsqueda, filtros, recarga y persistencia. También se comprobaron cambios de zona sin modificación de los instantes, edición de texto en otra zona, horas inexistentes, cancelación que conserva el registro, foco inicial y movimiento reducido.

Las capturas vacías y pobladas a 1440, 768 y 390 px, los resultados y los registros se guardan fuera del proyecto en `/tmp/agenda-qa/`. Los registros QA pertenecen únicamente a la base aislada; no se incluyen semillas ni datos ficticios en la aplicación. Este entorno no proporciona credenciales remotas de Turso, por lo que no fue posible verificar la conexión hospedada. La aplicación conserva la configuración Turso existente y requiere las credenciales del servidor.
