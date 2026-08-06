// frontend/src/main.ts
import { ServicioService } from './services/servicio.service';
import { ReservaService } from './services/reserva.service';
import { ServiciosView } from './views/servicios.view';
import { EstadoCarga } from './enums/estados.enum';
import './style.css';

class App {
  private serviciosView: ServiciosView;

  constructor() {
    this.serviciosView = new ServiciosView();
    this.init();
  }

  private async init(): Promise<void> {
    document.addEventListener('reload-servicios', () => this.cargarServicios());
    document.addEventListener('reservar-servicio', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.mostrarFormularioReserva(customEvent.detail.servicioId);
    });

    await this.cargarServicios();
  }

  private async cargarServicios(): Promise<void> {
    try {
      this.serviciosView.renderState(EstadoCarga.CARGANDO);
      const servicios = await ServicioService.getAll();
      this.serviciosView.renderState(EstadoCarga.EXITO, servicios);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido';
      this.serviciosView.renderState(EstadoCarga.ERROR, mensaje);
      console.error('Error al cargar servicios:', error);
    }
  }

  private async mostrarFormularioReserva(servicioId: number): Promise<void> {
    const modal = document.getElementById('modal-reserva');
    if (!modal) return;

    const form = modal.querySelector('form');
    if (!form) return;

    const inputServicio = form.querySelector('input[name="servicio_id"]') as HTMLInputElement;
    if (inputServicio) {
      inputServicio.value = servicioId.toString();
    }

    modal.classList.remove('hidden');

    form.addEventListener('submit', async (event: Event) => {
      event.preventDefault();

      try {
        const formData = new FormData(form);
        const reservaData = {
          cliente_id: parseInt(formData.get('cliente_id') as string),
          servicio_id: parseInt(formData.get('servicio_id') as string),
          profesional_id: parseInt(formData.get('profesional_id') as string),
          fecha: formData.get('fecha') as string,
          hora: formData.get('hora') as string
        };

        if (!reservaData.cliente_id || !reservaData.servicio_id || 
            !reservaData.profesional_id || !reservaData.fecha || !reservaData.hora) {
          throw new Error('Todos los campos son obligatorios');
        }

        await ReservaService.create(reservaData);
        alert('✅ Reserva creada exitosamente');
        modal.classList.add('hidden');
        form.reset();
      } catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error al crear reserva';
        alert(`❌ ${mensaje}`);
        console.error('Error al crear reserva:', error);
      }
    });

    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        form.reset();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});