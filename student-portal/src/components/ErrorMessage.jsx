// ============================================================
// ErrorMessage (Usuario 2)
// Muestra un mensaje de error y, opcionalmente, un boton de reintento.
// ============================================================

import { AlertCircle } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="rounded-2xl bg-red-50 px-5 py-4 text-center text-red-700 ring-1 ring-red-200"
      role="alert"
    >
      <div className="flex items-center justify-center gap-2">
        <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="font-medium">
          {message || 'Ocurrio un error inesperado.'}
        </p>
      </div>
      {onRetry && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={onRetry}>
            Reintentar
          </Button>
        </div>
      )}
    </div>
  );
}
