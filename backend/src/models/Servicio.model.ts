// backend/src/models/Servicio.model.ts
export interface ServicioModel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  categoria: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}
