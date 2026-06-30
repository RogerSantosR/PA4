// Página 404 personalizada del módulo público.
import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
        <SearchX className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-7xl font-extrabold text-neutral-900">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-3 text-neutral-600">
        Lo sentimos, el recurso que buscas no existe o el curso no está
        disponible.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-neutral-800"
        >
          Volver al inicio
        </Link>
        <Link
          href="/cursos"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-neutral-900 transition hover:bg-neutral-50"
        >
          Ver catálogo de cursos
        </Link>
      </div>
    </div>
  );
}
