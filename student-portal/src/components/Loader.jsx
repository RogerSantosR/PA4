// ============================================================
// Loader (Usuario 2)
// Indicador de carga (spinner) con texto opcional.
// ============================================================

import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Cargando...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12 text-neutral-500"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-neutral-900" aria-hidden="true" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
