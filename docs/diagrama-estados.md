# Diagrama de Estados (Reserva)

```mermaid
stateDiagram-v2
    [*] --> PENDIENTE: Crear reserva

    PENDIENTE --> CONFIRMADA: Confirmar
    PENDIENTE --> CANCELADA: Cancelar

    CONFIRMADA --> EN_PROGRESO: Iniciar
    CONFIRMADA --> CANCELADA: Cancelar

    EN_PROGRESO --> COMPLETADA: Finalizar
    EN_PROGRESO --> CANCELADA: Cancelar

    COMPLETADA --> [*]: Fin
    CANCELADA --> [*]: Anulada

    note right of PENDIENTE
        Estado inicial
    end note

    note right of CONFIRMADA
        Cita confirmada
    end note

    note right of EN_PROGRESO
        En ejecución
    end note

    note right of COMPLETADA
        Servicio finalizado
    end note

    note right of CANCELADA
        Reserva anulada
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
| `PENDIENTE` | Naranja | Reserva creada, no confirmada |
| `CONFIRMADA` | Púrpura | Cita confirmada |
| `EN_PROGRESO` | Azul | Servicio en ejecución |
| `COMPLETADA` | Verde | Servicio finalizado |
| `CANCELADA` | Rojo | Reserva anulada |