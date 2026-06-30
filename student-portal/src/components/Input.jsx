// ============================================================
// Input (Usuario 2)
// Campo de formulario etiquetado y reutilizable con soporte de error.
// ============================================================

import { useId } from 'react';

export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  ...rest
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none ${className}`.trim()}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
