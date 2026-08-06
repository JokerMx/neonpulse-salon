# Diagrama Entidad-Relación (MySQL)

```mermaid
erDiagram
    SERVICIOS {
        int id PK
        string nombre
        text descripcion
        float precio
        int duracion_min
        string categoria
        boolean activo
        datetime created_at
        datetime updated_at
    }

    PROFESIONALES {
        int id PK
        string nombre
        string especialidad
        text horario
        boolean activo
        datetime created_at
        datetime updated_at
    }

    CLIENTES {
        int id PK
        string nombre
        string telefono
        string email
        string tipo
        datetime created_at
        datetime updated_at
    }

    RESERVAS {
        int id PK
        int cliente_id FK
        int servicio_id FK
        int profesional_id FK
        date fecha
        time hora
        string estado
        datetime created_at
        datetime updated_at
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