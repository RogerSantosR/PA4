// Configuracion centralizada de variables de entorno.
// Lee los valores desde process.env y provee valores por defecto (fallback)
// para que la API funcione incluso sin un archivo .env presente.

export const config = {
  // Puerto donde escucha el servidor. Por defecto 4000.
  PORT: process.env.PORT || 4000,

  // Secreto usado para firmar/verificar los tokens JWT.
  // IMPORTANTE: en produccion debe definirse mediante variable de entorno.
  JWT_SECRET: process.env.JWT_SECRET || 'cambia_este_secreto_en_produccion',

  // Tiempo de expiracion del token (formato aceptado por jsonwebtoken).
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '2h',
};

export default config;
