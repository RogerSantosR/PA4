// Pie de página del módulo público.
import Link from 'next/link';
import { GraduationCap, ExternalLink, BookOpen } from 'lucide-react';

// URL del portal del estudiante (aplicación autenticada).
const PORTAL_ESTUDIANTE_URL = 'http://localhost:5173';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-neutral-900">
                Oferta Académica
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-600">
              Módulo público de consulta de cursos. No requiere inicio de
              sesión.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del pie de página">
            <p className="text-sm font-semibold text-neutral-900">Navegación</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/cursos"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900"
                >
                  Cursos
                </Link>
              </li>
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos">
            <p className="text-sm font-semibold text-neutral-900">Recursos</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={PORTAL_ESTUDIANTE_URL}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-600 transition hover:text-neutral-900"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Portal del estudiante
                </a>
              </li>
              <li>
                <Link
                  href="/cursos"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-600 transition hover:text-neutral-900"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Catálogo de cursos
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-center text-sm text-neutral-500">
            © {year} Universidad. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
