// backend/src/controllers/servicio.controller.ts
import { Request, Response } from 'express';
import pool from '../config/database';
import { ServicioModel } from '../models/Servicio.model';

export class ServicioController {
  // GET /api/servicios
  static async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM servicios WHERE activo = true ORDER BY nombre'
      );

      res.json({
        success: true,
        data: rows,
        message: 'Servicios obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener servicios:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los servicios',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  }

  // GET /api/servicios/:id
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [rows] = await pool.execute(
        'SELECT * FROM servicios WHERE id = ? AND activo = true',
        [id]
      );

      const servicio = (rows as ServicioModel[])[0];

      if (!servicio) {
        return res.status(404).json({
          success: false,
          message: 'Servicio no encontrado'
        });
      }

      res.json({
        success: true,
        data: servicio
      });
    } catch (error) {
      console.error('Error al obtener servicio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el servicio'
      });
    }
  }
}
