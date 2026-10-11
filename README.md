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

Los horarios se convierten de la zona configurada a UTC en el servidor. Se rechazan horas inexistentes o ambiguas por cambios de horario. Los conflictos se comprueban en una transacción; una confirmación identifica los registros y versiones específicos que el usuario ha visto.

## Verificación

La compilación de producción, TypeScript, ESLint y la auditoría de dependencias de producción pasan. El flujo de creación contextual de cliente, creación de trabajo, edición de horario, cambio de estado, recarga y comprobación de persistencia se probó con `@libsql/client` contra una base SQLite aislada fuera del proyecto. También se probaron validación, conflictos rechazados y confirmados, búsqueda rápida, filtros, cancelación que conserva el registro, foco inicial, captura y retorno del foco con Escape, movimiento reducido y errores recuperables con reintento.

La evidencia de pruebas y capturas se guarda fuera del código entregado, en `/tmp/agenda-qa/`. Se revisaron pantallas vacías, pobladas y formularios a 1440, 768 y 390 px. No se pudo comprobar la conexión remota de Turso porque este entorno no proporciona sus credenciales. El taller debe configurar su zona real; Europe/Madrid se utilizó exclusivamente para comprobar conversiones y cambios de horario en pruebas aisladas.
