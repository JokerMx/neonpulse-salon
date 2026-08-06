# Diagrama Entidad-Relación (MySQL)

```mermaid
erDiagram
    SERVICIOS {
        int id PK
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
        int id PK
        varchar nombre
        enum especialidad
        json horario
        boolean activo
        timestamp created_at
        timestamp updated_at
    }

    CLIENTES {
        int id PK
        varchar nombre
        varchar telefono
        varchar email UNIQUE
        enum tipo
        timestamp created_at
        timestamp updated_at
    }

    RESERVAS {
        int id PK
        int cliente_id FK
        int servicio_id FK
        int profesional_id FK
        date fecha
        time hora
        enum estado
        timestamp created_at
        timestamp updated_at
    }

    CLIENTES ||--o{ RESERVAS : "cliente_id"
    SERVICIOS ||--o{ RESERVAS : "servicio_id"
    PROFESIONALES ||--o{ RESERVAS : "profesional_id"
```

## Descripción

| Tabla | Descripción |
|---|---|
| **servicios** | Catálogo de servicios |
| **profesionales** | Personal y especialidad |
| **clientes** | Clientes registrados |
| **reservas** | Reservas de citas |

## Restricciones
- `email` en clientes es UNIQUE
- `cliente_id`, `servicio_id`, `profesional_id` en reservas son FK RESTRICT
- `unique_reserva (profesional_id, fecha, hora)` previene dobles reservas