
// backend/src/models/Reserva.model.ts
export interface ReservaModel {
  id: number;
  cliente_id: number;
  servicio_id: number;
  profesional_id: number;
  fecha: Date;
  hora: string;
  estado: string;
  created_at: Date;
  updated_at: Date;
}

export interface ReservaConDetalles extends ReservaModel {
  cliente_nombre: string;
  servicio_nombre: string;
  profesional_nombre: string;
}