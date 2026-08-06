# Diagrama de Componentes (Arquitectura)

```mermaid
graph TD
    subgraph "FRONTEND Vite Vanilla TS"
        direction TB
        FE_VITE[Vite Dev Server puerto 5173]
        FE_HTML[index.html Hero Servicios Reservas Modal]
        FE_MAIN[main.ts App]
        FE_VIEW[servicios.view.ts]
        FE_SERVICE[services Api Servicio Reserva]
        FE_INTERFACE[interfaces DTOs]
        FE_ENUMS[enums Categoria Estado Tipo]
        FE_UTILS[utils Iconos Notificaciones]
        FE_CSS[style.css Glassmorphism]

        FE_VITE --> FE_HTML
        FE_HTML -->|"carga"| FE_MAIN
        FE_MAIN --> FE_VIEW
        FE_MAIN --> FE_SERVICE
        FE_SERVICE --> FE_INTERFACE
        FE_VIEW --> FE_ENUMS
        FE_VIEW --> FE_UTILS
        FE_UTILS --> FE_ENUMS
        FE_MAIN --> FE_CSS
    end

    subgraph "BACKEND Express Node"
        direction TB
        BE_APP[Express App helmet cors morgan]
        BE_ROUTE_SERV[servicios.routes]
        BE_ROUTE_RES[reservas.routes]
        BE_CTRL_SERV[servicio.controller]
        BE_CTRL_RES[reserva.controller]
        BE_DB[database.ts MySQL Pool]

        BE_APP --> BE_ROUTE_SERV
        BE_APP --> BE_ROUTE_RES
        BE_ROUTE_SERV --> BE_CTRL_SERV
        BE_ROUTE_RES --> BE_CTRL_RES
        BE_CTRL_SERV --> BE_DB
        BE_CTRL_RES --> BE_DB
    end

    subgraph "DATABASE"
        direction TB
        DB[neonpulse_salon]
    end

    subgraph "EXTERNALES"
        EXT_API[REST API HTTP JSON]
        EXT_DB[(MySQL Server)]
    end

    FE_SERVICE -.->|fetch HTTPS| EXT_API
    EXT_API -->|JSON Response| FE_SERVICE
    BE_DB -.->|SQL Queries| EXT_DB
    EXT_DB -->|Rows OkPacket| BE_DB

    classDef frontendBg fill:#6a0dad,color:#fff
    classDef backendBg fill:#4b0082,color:#fff
    classDef databaseBg fill:#800080,color:#fff
    classDef external fill:#2ecc71,color:#fff

    class FE_VITE,FE_HTML,FE_MAIN,FE_VIEW,FE_SERVICE,FE_INTERFACE,FE_ENUMS,FE_UTILS,FE_CSS frontendBg
    class BE_APP,BE_ROUTE_SERV,BE_ROUTE_RES,BE_CTRL_SERV,BE_CTRL_RES,BE_DB backendBg
    class DB databaseBg
    class EXT_API,EXT_DB external
```

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | TypeScript 6.0, Vite 8, Vanilla JS, Fetch API, DOM API |
| **Backend** | Node.js, Express 5, TypeScript 4.9, mysql2/promise |
| **Database** | MySQL 8.0 (alwaysdata) |
| **DevOps** | nodemon, ts-node, dotenv |
| **Seguridad** | helmet, cors, dotenv |
| **Logging** | morgan |
