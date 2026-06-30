// ============================================================
// NotFoundPage (Usuario 2)
// Pagina 404 para rutas inexistentes.
// ============================================================

import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-7xl font-extrabold tracking-tight text-neutral-900">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-neutral-900">
        Pagina no encontrada
      </h2>
      <p className="mt-2 text-neutral-600">
        La ruta que buscas no existe o fue movida.
      </p>
      <div className="mt-8">
        <Link to="/cursos">
          <Button variant="primary">Ir al catalogo</Button>
        </Link>
      </div>
    </div>
  );
}
