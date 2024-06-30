import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

// Ruta para iniciar sesión
router.post('/login', (req, res) => authController.login(req, res));

export default router;
