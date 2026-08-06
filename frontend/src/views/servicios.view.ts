// frontend/src/views/servicios.view.ts
import type { Servicio } from '../interfaces/servicio.interface';
import { EstadoCarga } from '../enums/estados.enum';

export class ServiciosView {
  private container: HTMLElement;

  constructor() {
    const container = document.getElementById('servicios-container');
    if (!container) {
      throw new Error('Contenedor de servicios no encontrado');
    }
    this.container = container;
  }

  renderState(state: EstadoCarga, data?: Servicio[] | string): void {
    this.clearContainer();

    switch (state) {
      case EstadoCarga.CARGANDO:
        this.renderLoading();
        break;
      case EstadoCarga.EXITO:
        if (Array.isArray(data) && data.length > 0) {
          this.renderServicios(data);
        } else {
          this.renderEmpty();
        }
        break;
      case EstadoCarga.ERROR:
        this.renderError(data as string || 'Error al cargar los servicios');
        break;
      case EstadoCarga.VACIO:
        this.renderEmpty();
        break;
      default:
        this.renderInitial();
        break;
    }
  }

  private clearContainer(): void {
    this.container.innerHTML = '';
  }

  private renderLoading(): void {
    this.container.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Cargando servicios...</p>
      </div>
    `;
  }

  private renderServicios(servicios: Servicio[]): void {
    this.container.innerHTML = `
      <div class="servicios-grid">
        ${servicios.map(servicio => `
          <div class="servicio-card" data-id="${servicio.id}">
            <h3>${servicio.nombre}</h3>
            <p class="descripcion">${servicio.descripcion}</p>
            <div class="info">
              <span class="categoria">${servicio.categoria}</span>
              <span class="duracion">${servicio.duracion} min</span>
              <span class="precio">$${servicio.precio.toLocaleString()}</span>
            </div>
            <button class="btn-reservar" data-id="${servicio.id}">Reservar</button>
          </div>
        `).join('')}
      </div>
    `;
    this.addEventListeners();
  }

  private renderError(message: string): void {
    this.container.innerHTML = `
      <div class="error-container">
        <span class="error-icon">⚠️</span>
        <p class="error-message">${message}</p>
        <button class="btn-reintentar">Reintentar</button>
      </div>
    `;
    const retryButton = this.container.querySelector('.btn-reintentar');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        const reloadEvent = new CustomEvent('reload-servicios');
        document.dispatchEvent(reloadEvent);
      });
    }
  }

  private renderEmpty(): void {
    this.container.innerHTML = `
      <div class="empty-container">
        <p>No hay servicios disponibles</p>
      </div>
    `;
  }

  private renderInitial(): void {
    this.container.innerHTML = `
      <div class="initial-container">
        <p>Cargando servicios disponibles...</p>
      </div>
    `;
  }

  private addEventListeners(): void {
    const buttons = this.container.querySelectorAll('.btn-reservar');
    buttons.forEach(button => {
      button.addEventListener('click', (event: Event) => {
        const target = event.currentTarget as HTMLButtonElement;
        const servicioId = target.dataset.id;
        if (servicioId) {
          const customEvent = new CustomEvent('reservar-servicio', {
            detail: { servicioId: parseInt(servicioId) }
          });
          document.dispatchEvent(customEvent);
        }
      });
    });
  }
}