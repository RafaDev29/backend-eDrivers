import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error: (error as Error).message });
    }
  }
}
