# NeonPulse Salon

Sistema de gestión de reservas para salón de belleza. Aplicación full-stack con frontend dinámico en TypeScript/Vite y backend Express/MySQL, diseñada bajo principios de tipado estricto, arquitectura desacoplada y consumo asíncrono de APIs.

## Características

- Catálogo de servicios del salón con carga dinámica desde backend
- Formulario de reservas con validación en tiempo real (blur)
- Validación de nombre compuesto (nombre y apellido), email y teléfono (+569 12345678)
- Select de horas con intervalos fijos de 30 minutos
- Validación de fecha: no permite fechas pasadas ni más de 30 días en el futuro
- Intervalo mínimo configurable entre citas (`MIN_INTERVAL_MINUTES` en `.env`)
- Backend busca o crea cliente por email automáticamente
- Errores inline en el campo con animación shake y glow rojo
- Notificaciones flotantes con iconos para acciones generales
- Estados visuales de carga, éxito y error en la interfaz
- Panel de reservas con actualización automática cada 30 segundos
- Refresh inmediato del listado de reservas tras crear una nueva
- Arquitectura limpia: servicios, vistas, controladores y modelos separados
- Cero uso de `any` — typing estricto con interfaces y enums

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | TypeScript 6, Vite 8, Fetch API, Vanilla JS |
| **Backend** | Node.js, Express 5, TypeScript, mysql2/promise |
| **Base de Datos** | MySQL 8.0 (alwaysdata) |
| **Seguridad** | helmet, cors, dotenv |
| **DevOps** | nodemon, ts-node |

## Estructura del Proyecto

```
neonpulse-salon/
├── frontend/
│   ├── src/
│   │   ├── enums/          # Enumeraciones tipadas
│   │   ├── interfaces/     # Contratos de datos
│   │   ├── services/       # Lógica de comunicación HTTP
│   │   ├── views/          # Renderizado del DOM
│   │   ├── utils/          # Validaciones y notificaciones (validaciones.ts, notificacion.ts, icon-categories.ts)
│   │   └── main.ts         # Punto de entrada
│   ├── index.html
│   └── .env
├── backend/
│   ├── src/
│   │   ├── config/         # Conexión a base de datos
│   │   ├── controllers/    # Lógica de negocio HTTP
│   │   ├── models/         # Acceso a datos
│   │   ├── routes/         # Definición de endpoints
│   │   └── index.ts        # Servidor Express
│   └── database/
│       └── schema.sql      # DDL de tablas
└── docs/                   # Diagramas y documentación técnica
```

## Instalación y Ejecución

### Prerrequisitos

- Node.js >= 18
- MySQL 8.0
- npm o yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:create
npm run dev
```

El servidor se levanta en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

El cliente se levanta en `http://localhost:5173`.

## Variables de Entorno

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

### Backend (`backend/.env`)

```env
DB_HOST=mysql-devfree.alwaysdata.net
DB_PORT=3306
DB_USER=devfree
DB_PASSWORD=Hw3Bk57baT!P_pc
DB_NAME=devfree_neonpulse_salon
PORT=3000
NODE_ENV=development
MIN_INTERVAL_MINUTES=30
```

> Todas las variables de entorno son obligatorias excepto `VITE_API_TIMEOUT`, `NODE_ENV` y `MIN_INTERVAL_MINUTES` que tienen valores por defecto.

## Documentación Técnica

El proyecto incluye diagramas actualizados en la carpeta [`docs/`](docs/):

- [Diagrama de Clases UML](docs/diagrama-clases.md) — Entidades frontend, backend, dominio y enums
- [Diagrama de Componentes](docs/diagrama-componentes.md) — Arquitectura general del sistema
- [Diagrama Entidad-Relación](docs/diagrama-er.md) — Modelo de base de datos MySQL
- [Diagrama de Estados](docs/diagrama-estados.md) — Ciclo de vida de una reserva
- [Diagrama de Flujo](docs/diagrama-flujo.md) — Flujo frontend de carga y reserva
- [Diagrama de Secuencia](docs/diagrama-secuencia.md) — Interacción completa API Frontend ↔ Backend ↔ MySQL

## Demo

¿Deseas visitar la demo del proyecto?

- [Ver demo en línea](https://neonpulse-salon.vercel.app)

> Si la demo no está disponible, sigue las instrucciones de instalación para ejecutar el proyecto localmente.

## Deployment en Vercel

El proyecto usa un `vercel.json` monorepo con dos servicios:

- **Frontend**: Vite framework, servido estáticamente
- **Backend**: Node.js/Express con `entrypoint: src/index.ts` (transpilación automática)
- **Rewrites**: `/api/*` → backend, resto → frontend

Las variables de entorno deben configurarse en el panel de Vercel (no usar `.env`).