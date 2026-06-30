// Punto de entrada del servidor.
// Arranca la aplicacion Express y la deja escuchando en el puerto configurado.

import app from './app.js';
import { config } from './config/env.js';

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Mock API ejecutandose en http://localhost:${PORT}/api`);
});
