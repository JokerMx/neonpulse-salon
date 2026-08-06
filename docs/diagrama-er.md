# Diagrama Entidad-Relación (MySQL)

```mermaid
erDiagram
    SERVICIOS {
        int id PK "Auto-increment"
        varchar nombre
        text descripcion
        decimal precio
        int duracion_min
        enum categoria
        boolean activo
        timestamp created_at
        timestamp updated_at
    }

    PROFESIONALES {
        int id PK "Auto-increment"
        varchar nombre
        enum especialidad
        json horario
        boolean activo
        timestamp created_at
        timestamp updated_at
    }

    CLIENTES {
        int id PK "Auto-increment"
        varchar nombre
        varchar telefono
        varchar email "UNIQUE"
        enum tipo
        timestamp created_at
        timestamp updated_at
    }

    RESERVAS {
        int id PK "Auto-increment"
        int cliente_id FK
        int servicio_id FK
        int profesional_id FK
        date fecha
        time hora
        enum estado
        timestamp created_at
        timestamp updated_at
        unique "profesional_id + fecha + hora"
    }

    CLIENTES ||--o{ RESERVAS : "cliente_id to id (RESTRICT)"
    SERVICIOS ||--o{ RESERVAS : "servicio_id to id (RESTRICT)"
    PROFESIONALES ||--o{ RESERVAS : "profesional_id to id (RESTRICT)"
```

## Descripción

| Tabla | Descripción |
|---|---|
| **servicios** | Catálogo de servicios ofrecidos por el salón |
| **profesionales** | Personal del salón con su especialidad y horario |
| **clientes** | Clientes registrados con tipo (NUEVO/REGULAR/VIP) |
| **reservas** | Reservas de citas con estado (PENDIENTE/CONFIRMADA/EN_PROGRESO/COMPLETADA/CANCELADA) |

## Restricciones
- `email` en clientes es UNIQUE
- `cliente_id`, `servicio_id`, `profesional_id` en reservas son FK con ON DELETE RESTRICT
- `unique_reserva (profesional_id, fecha, hora)` impide dobles reservas del mismo profesional en el mismo horario
