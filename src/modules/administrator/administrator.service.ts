import pool from '../../config/database';
import { encrypt } from '../../config/crypto';
import { User } from '../user/user.entity';

export class AdministratorService {
  // Servicio para crear un nuevo administrador
  async createAdministrator(name: string, username: string, password: string): Promise<void> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Crear el usuario con rol ADMIN_ROLE
      const encryptedPassword = encrypt(password);
      const [userResult] = await connection.query('INSERT INTO tb_users (username, password, role) VALUES (?, ?, ?)', [
        username,
        JSON.stringify(encryptedPassword),
        'ADMIN_ROLE'
      ]);
      const userId = (userResult as any).insertId;

      // Crear el administrador
      await connection.query('INSERT INTO tb_administrators (name, userId) VALUES (?, ?)', [name, userId]);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Servicio para listar todos los administradores
  async getAdministrators(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM tb_users WHERE role = ?', ['ADMIN_ROLE']);
    return rows as User[];
  }

  // Servicio para eliminar un administrador
  async deleteAdministrator(userId: number): Promise<void> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Eliminar el administrador
      await connection.query('DELETE FROM tb_administrators WHERE userId = ?', [userId]);

      // Eliminar el usuario
      await connection.query('DELETE FROM tb_users WHERE id = ?', [userId]);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
