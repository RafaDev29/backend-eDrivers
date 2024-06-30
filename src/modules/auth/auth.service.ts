import pool from '../../config/database';
import { decrypt } from '../../config/crypto';
import { User } from '../user/user.entity';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Reemplaza esto con tu clave secreta

export class AuthService {
  async login(username: string, password: string): Promise<{ token: string, user: User } | null> {
    try {
      const [rows] = await pool.query('SELECT * FROM tb_users WHERE username = ?', [username]);
      const user = (rows as User[])[0];

      if (!user) {
        return null;
      }

      const decryptedPassword = decrypt(user.password);
      if (password !== decryptedPassword) {
        return null;
      }

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

      // Incluir la contraseña descifrada en la respuesta
      return { token, user: { ...user, password: decryptedPassword } };
    } catch (error) {
      throw new Error(`Login error: ${(error as Error ) .message}`);
    }
  }
}
