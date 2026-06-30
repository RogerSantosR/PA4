// Manejadores de errores y de rutas no encontradas.

// Middleware 404: se ejecuta cuando ninguna ruta coincide.
export function notFound(req, res, next) {
  res.status(404).json({ message: 'Recurso no encontrado.' });
}

// Manejador de errores centralizado.
// Usa err.status si existe (errores controlados de los servicios),
// de lo contrario responde con 500.
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message =
    status === 500 ? 'Error interno del servidor.' : err.message;

  // Log basico en consola para depuracion.
  if (status === 500) {
    console.error('[ERROR]', err);
  }

  res.status(status).json({ message });
}

export default { notFound, errorHandler };
