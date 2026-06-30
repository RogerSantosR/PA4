// ============================================================
// Navbar (Usuario 2)
// Barra de navegacion: marca, enlaces y, si hay sesion, el nombre del
// usuario con su boton de cierre de sesion (logica de Usuario 1).
// ============================================================

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Home,
  BookOpen,
  LayoutDashboard,
  Users,
  LogIn,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import Button from './Button.jsx';

// URL del sitio publico (Next.js). Es un enlace externo.
const PUBLIC_SITE_URL = 'http://localhost:3000/';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Estado presentacional: controla la apertura del menu en movil.
  const [menuOpen, setMenuOpen] = useState(false);

  // Rol del usuario (por defecto 'student' si no viene en el perfil).
  const role = user?.role || 'student';
  const isAdmin = isAuthenticated && role === 'admin';

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/login', { replace: true });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  // Clase para resaltar el enlace activo (escritorio).
  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-neutral-100 text-neutral-900'
        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
    }`;

  // Clase para los enlaces dentro del panel movil.
  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition ${
      isActive
        ? 'bg-neutral-100 text-neutral-900'
        : 'text-neutral-700 hover:bg-neutral-100'
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Marca */}
          <NavLink
            to="/cursos"
            className="flex items-center gap-2.5"
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white shadow-sm">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Portal Estudiante
            </span>
          </NavLink>

          {/* Navegacion de escritorio */}
          <div className="hidden items-center gap-1 md:flex">
            <a
              href={PUBLIC_SITE_URL}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Inicio
            </a>

            <NavLink to="/cursos" className={linkClass}>
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Cursos
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/dashboard" className={linkClass}>
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Mi panel
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin/cursos" className={linkClass}>
                <Users className="h-4 w-4" aria-hidden="true" />
                Administracion
              </NavLink>
            )}

            <div className="ml-3 flex items-center gap-3 border-l border-neutral-200 pl-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-neutral-600">
                    Hola,{' '}
                    <span className="font-medium text-neutral-900">
                      {user?.name}
                    </span>
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Cerrar sesion
                  </Button>
                </>
              ) : (
                <NavLink to="/login">
                  <Button variant="primary">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Iniciar sesion
                  </Button>
                </NavLink>
              )}
            </div>
          </div>

          {/* Boton hamburguesa (movil) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 md:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Panel desplegable (movil) */}
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            <a
              href={PUBLIC_SITE_URL}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition hover:bg-neutral-100"
              onClick={closeMenu}
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Inicio
            </a>

            <NavLink to="/cursos" className={mobileLinkClass} onClick={closeMenu}>
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Cursos
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                Mi panel
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/admin/cursos"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                <Users className="h-5 w-5" aria-hidden="true" />
                Administracion
              </NavLink>
            )}

            <div className="mt-3 border-t border-neutral-200 pt-3">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-600">
                    Hola,{' '}
                    <span className="font-medium text-neutral-900">
                      {user?.name}
                    </span>
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Cerrar sesion
                  </Button>
                </div>
              ) : (
                <NavLink to="/login" onClick={closeMenu}>
                  <Button variant="primary" block>
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Iniciar sesion
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
