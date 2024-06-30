import { Router } from 'express';
import { AdministratorController } from './administrator.controller';

const router = Router();
const administratorController = new AdministratorController();

router.post('/administrators', (req, res) => administratorController.createAdministrator(req, res));

router.get('/administrators', (req, res) => administratorController.getAdministrators(req, res));

router.delete('/administrators/:id', (req, res) => administratorController.deleteAdministrator(req, res));

export default router;
