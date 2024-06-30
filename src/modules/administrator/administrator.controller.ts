import { Request, Response } from 'express';
import { AdministratorService } from './administrator.service';

const administratorService = new AdministratorService();

export class AdministratorController {
  async createAdministrator(req: Request, res: Response): Promise<void> {
    const { name, username, password } = req.body;
    try {
      await administratorService.createAdministrator(name, username, password);
      res.status(201).json({ message: 'Administrator created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating administrator', error: (error as Error).message });
    }
  }

  async getAdministrators(req: Request, res: Response): Promise<void> {
    try {
      const administrators = await administratorService.getAdministrators();
      res.json(administrators);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching administrators', error: (error as Error).message });
    }
  }

  async deleteAdministrator(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await administratorService.deleteAdministrator(parseInt(id, 10));
      res.json({ message: 'Administrator deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting administrator', error: (error as Error).message });
    }
  }
}
