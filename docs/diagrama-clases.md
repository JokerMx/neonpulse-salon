# Diagrama de Clases UML

```mermaid
classDiagram
    %% ==================== FRONTEND ====================
    class ApiService {
        -baseUrl string
        -timeout number
        +fetch endpoint options
    }

    class ServicioService {
        +getAll()
        +getById id
    }

    class ReservaService {
        +getAll()
        +create data
        +updateEstado id estado
    }

    class ServiciosView {
        -container HTMLElement
        -reservasContainer HTMLElement
        +renderState state data
        -renderLoading()
        -renderServicios servicios
        -renderError message
        -renderEmpty()
        -renderReservas reservas
        -addEventListeners()
    }

    class App {
        -serviciosView ServiciosView
        +init()
        +cargarServicios()
        +mostrarFormularioReserva servicioId
    }

    class IconoCategoria {
        +obtenerIconoCategoria categoria
    }

    class Notificacion {
        +mostrarNotificacion mensaje tipo
    }

    class Servicio {
        +id number
        +nombre string
        +descripcion string
        +precio number
        +duracion number
        +categoria CategoriaServicio
        +activo boolean
        +created_at Date
        +updated_at Date
    }

    class Reserva {
        +id number
        +cliente_id number
        +servicio_id number
        +profesional_id number
        +fecha Date
        +hora string
        +estado EstadoReserva
        +created_at Date
        +updated_at Date
        +cliente_nombre string
        +servicio_nombre string
        +profesional_nombre string
    }

    class CrearReservaDTO {
        +cliente_id number
        +servicio_id number
        +profesional_id number
        +fecha string
        +hora string
    }

    class ApiResponse {
        +success boolean
        +data T
        +message string
        +errors string[]
    }

    class PaginatedResponse {
        +items T[]
        +total number
        +page number
        +totalPages number
    }

    class CategoriaServicio {
        <<enumeration>>
        CORTE
        TINTE
        TRATAMIENTO
        PEINADO
        MAQUILLAJE
        BARBA
        DEPILACION
    }

    class EstadoReserva {
        <<enumeration>>
        PENDIENTE
        CONFIRMADA
        EN_PROGRESO
        COMPLETADA
        CANCELADA
    }

    class TipoCliente {
        <<enumeration>>
        NUEVO
        REGULAR
        VIP
    }

    class Especialidad {
        <<enumeration>>
        ESTILISTA
        COLORISTA
        MAQUILLADORA
        BARBERO
        DEPILADORA
    }

    class EstadoCarga {
        <<enumeration>>
        INICIAL
        CARGANDO
        EXITO
        ERROR
        VACIO
    }

    %% ==================== BACKEND ====================
    class ServicioController {
        +getAll req res
        +getById req res
    }

    class ReservaController {
        +getAll req res
        +create req res
        +updateEstado req res
    }

    class ServicioModel {
        +id number
        +nombre string
        +descripcion string
        +precio number
        +duracion number
        +categoria string
        +activo boolean
        +created_at Date
        +updated_at Date
    }

    class ReservaModel {
        +id number
        +cliente_id number
        +servicio_id number
        +profesional_id number
        +fecha Date
        +hora string
        +estado string
        +created_at Date
        +updated_at Date
    }

    class ReservaConDetalles {
        +id number
        +cliente_id number
        +servicio_id number
        +profesional_id number
        +fecha Date
        +hora string
        +estado string
        +created_at Date
        +updated_at Date
        +cliente_nombre string
        +servicio_nombre string
        +profesional_nombre string
    }

    class DatabasePool {
        +pool mysqlPool
    }

    class ExpressApp {
        +app expressApp
        +listen port
    }

    class MysqlError {
        +code string
        +errno number
    }

    class OkResult {
        +insertId number
        +affectedRows number
    }

    %% ==================== RELACIONES ====================
    App --> ServiciosView
    App ..> ServicioService
    App ..> ReservaService
    App ..> Notificacion
    ServiciosView ..> ServicioService
    ServiciosView ..> ReservaService
    ServiciosView ..> IconoCategoria
    ServiciosView ..> ApiResponse
    ServicioService ..> ApiService
    ReservaService ..> ApiService
    ServiciosView ..> EstadoCarga
    ServiciosView ..> Servicio
    ServiciosView ..> Reserva
    Servicio --> CategoriaServicio
    Reserva --> EstadoReserva
    IconoCategoria ..> CategoriaServicio
    ExpressApp --> ServicioController
    ExpressApp --> ReservaController
    ServicioController ..> ServicioModel
    ReservaController ..> ReservaModel
    ReservaController ..> ReservaConDetalles
    ReservaController ..> MysqlError
    ReservaController ..> OkResult
    ExpressApp ..> DatabasePool
    DatabasePool ..> mysql2

    %% Styling
    classDef frontend fill:#5a189a,color:#fff,stroke:#d4af37
    classDef backend fill:#2e003e,color:#fff,stroke:#d4af37
    classDef modelo fill:#7b2cbf,color:#fff,stroke:#e8b4b8
    classDef enum fill:#e8b4b8,color:#2e003e,stroke:#d4af37
    classDef service fill:#d4af37,color:#2e003e,stroke:#7b2cbf

    class ApiService,ServicioService,ReservaService,ServiciosView,App,IconoCategoria,Notificacion frontend
    class ExpressApp,ServicioController,ReservaController,DatabasePool backend
    class Servicio,Reserva,CrearReservaDTO,ApiResponse,PaginatedResponse,ServicioModel,ReservaModel,ReservaConDetalles,MysqlError,OkResult modelo
    class CategoriaServicio,EstadoReserva,TipoCliente,Especialidad,EstadoCarga enum
```
