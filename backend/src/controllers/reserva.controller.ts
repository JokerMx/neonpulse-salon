// backend/src/controllers/reserva.controller.ts
import { Request, Response } from 'express';
import pool from '../config/database';
import { ReservaConDetalles } from '../models/Reserva.model';

interface MysqlError extends Error {
  code?: string;
  errno?: number;
}

interface OkResult {
  insertId: number;
  affectedRows: number;
}

export class ReservaController {
  // GET /api/reservas
  static async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(`
        SELECT 
          r.*,
          c.nombre as cliente_nombre,
          s.nombre as servicio_nombre,
          p.nombre as profesional_nombre
        FROM reservas r
        JOIN clientes c ON r.cliente_id = c.id
        JOIN servicios s ON r.servicio_id = s.id
        JOIN profesionales p ON r.profesional_id = p.id
        ORDER BY r.fecha DESC, r.hora DESC
      `);

      res.json({
        success: true,
        data: rows,
        message: 'Reservas obtenidas correctamente'
      });
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas'
      });
    }
  }

  // POST /api/reservas
  static async create(req: Request, res: Response) {
    try {
      const { cliente_id, servicio_id, profesional_id, fecha, hora } = req.body;

      // Validar disponibilidad
      const [check] = await pool.execute(
        'SELECT id FROM reservas WHERE profesional_id = ? AND fecha = ? AND hora = ? AND estado != "CANCELADA"',
        [profesional_id, fecha, hora]
      );

      if ((check as { id: number }[]).length > 0) {
        return res.status(409).json({
          success: false,
          message: 'El profesional ya tiene una reserva en ese horario'
        });
      }

      const [result] = await pool.execute(
        `INSERT INTO reservas 
         (cliente_id, servicio_id, profesional_id, fecha, hora, estado) 
         VALUES (?, ?, ?, ?, ?, 'PENDIENTE')`,
        [cliente_id, servicio_id, profesional_id, fecha, hora]
      );

      const insertId = (result as OkResult[])[0].insertId;

      const [newReserva] = await pool.execute(`
        SELECT 
          r.*,
          c.nombre as cliente_nombre,
          s.nombre as servicio_nombre,
          p.nombre as profesional_nombre
        FROM reservas r
        JOIN clientes c ON r.cliente_id = c.id
        JOIN servicios s ON r.servicio_id = s.id
        JOIN profesionales p ON r.profesional_id = p.id
        WHERE r.id = ?
      `, [insertId]);

      res.status(201).json({
        success: true,
        data: (newReserva as ReservaConDetalles[])[0],
        message: 'Reserva creada exitosamente'
      });
    } catch (error) {
      console.error('Error al crear reserva:', error);

      const mysqlError = error as MysqlError;
      if (mysqlError.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Ya existe una reserva en este horario'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al crear la reserva'
      });
    }
  }

  // PATCH /api/reservas/:id/estado
  static async updateEstado(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const validEstados = ['PENDIENTE', 'CONFIRMADA', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA'];

      if (!validEstados.includes(estado)) {
        return res.status(400).json({
          success: false,
          message: 'Estado no válido'
        });
      }

      await pool.execute(
        'UPDATE reservas SET estado = ? WHERE id = ?',
        [estado, id]
      );

      res.json({
        success: true,
        message: 'Estado actualizado correctamente'
      });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el estado'
      });
    }
  }
}
