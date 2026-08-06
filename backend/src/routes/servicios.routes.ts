// backend/src/routes/servicios.routes.ts
import { Router } from 'express';
import { ServicioController } from '../controllers/servicio.controller';

const router = Router();

router.get('/', ServicioController.getAll);
router.get('/:id', ServicioController.getById);

export default router;

