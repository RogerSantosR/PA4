// ============================================================
// Button (Usuario 2)
// Boton reutilizable con variantes (primary/outline/danger),
// estado de carga y opcion de ancho completo.
// ============================================================

import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  block = false,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  // Estilos base compartidos por todas las variantes.
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  // Estilos especificos por variante.
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 focus:ring-neutral-900',
    outline:
      'border border-neutral-300 text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const classes = [
    base,
    variants[variant] || variants.primary,
    block ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
