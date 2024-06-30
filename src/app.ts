import express from 'express';
import administratorRoutes from './modules/administrator/administrator.routes';
import authRoutes from './modules/auth/auth.routes'

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', administratorRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('GAAA ESTAMOS EN MANTENIMIENTO');
});

app.listen(port, () => {
});
