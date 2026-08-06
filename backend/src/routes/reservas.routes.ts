// backend/src/routes/reservas.routes.ts
import { Router } from 'express';
import { ReservaController } from '../controllers/reserva.controller';

const router = Router();

router.get('/', ReservaController.getAll);
router.post('/', ReservaController.create);
router.patch('/:id/estado', ReservaController.updateEstado);

export default router;