// Configuracion de la aplicacion Express.
// Aqui se registran los middlewares globales, las rutas y el manejo de errores.

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// CORS: permite que las aplicaciones React (5173) y Next.js (3000)
// puedan consumir la API durante el desarrollo.
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// Permite leer cuerpos de peticion en formato JSON.
app.use(express.json());

// Montaje de todas las rutas bajo el prefijo /api.
app.use('/api', routes);

// Manejo de rutas no encontradas y de errores (deben ir al final).
app.use(notFound);
app.use(errorHandler);

export default app;
