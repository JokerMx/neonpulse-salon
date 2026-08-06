# Diagrama de Estados (Reserva)

```mermaid
stateDiagram-v2
    [*] --> PENDIENTE: Crear reserva POST /api/reservas

    PENDIENTE --> CONFIRMADA: Confirmar cita
    PENDIENTE --> CANCELADA: Cancelar cita

    CONFIRMADA --> EN_PROGRESO: Iniciar servicio
    CONFIRMADA --> CANCELADA: Cancelar cita

    EN_PROGRESO --> COMPLETADA: Finalizar servicio
    EN_PROGRESO --> CANCELADA: Cancelar cita

    COMPLETADA --> [*]: Reserva finalizada
    CANCELADA --> [*]: Reserva anulada

    note right of PENDIENTE
        Estado inicial al crear
        la reserva. El profesional
        debe validar disponibilidad.
    end note

    note right of CONFIRMADA
        Cita confirmada por el
        cliente o administrador.
    end note

    note right of EN_PROGRESO
        El profesional esta
        atendiendo el servicio.
    end note

    note right of COMPLETADA
        Servicio finalizado. La
        reserva no puede modificarse.
    end note

    note right of CANCELADA
        Reserva cancelada. No
        afecta disponibilidad.
    end note

    style PENDIENTE fill:#f39c12,stroke:#e67e22,color:#fff,stroke-width:3px
    style CONFIRMADA fill:#9b59b6,stroke:#8e44ad,color:#fff,stroke-width:3px
    style EN_PROGRESO fill:#3498db,stroke:#2980b9,color:#fff,stroke-width:3px
    style COMPLETADA fill:#2ecc71,stroke:#27ae60,color:#fff,stroke-width:3px
    style CANCELADA fill:#e74c3c,stroke:#c0392b,color:#fff,stroke-width:3px
```

## Valores del Enum EstadoReserva

| Estado | Color UI | Descripción |
|---|---|---|
| `PENDIENTE` | Naranja | Reserva creada pero no confirmada |
| `CONFIRMADA` | Púrpura | Cita confirmada |
| `EN_PROGRESO` | Azul | Servicio en ejecución |
| `COMPLETADA` | Verde | Servicio finalizado |
| `CANCELADA` | Rojo | Reserva anulada |