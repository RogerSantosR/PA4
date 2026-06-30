import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminCoursesPage from './pages/admin/AdminCoursesPage.jsx';
import AdminEnrollmentsPage from './pages/admin/AdminEnrollmentsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/**
 * Componente raiz: define la estructura de rutas de la SPA.
 * - /login                 : pagina de inicio de sesion (publica)
 * - /cursos                : catalogo de cursos (publica)
 * - /cursos/:id            : detalle de un curso (publica)
 * - /dashboard             : panel del estudiante (protegida)
 * - /admin                 : redirige a la gestion de cursos
 * - /admin/cursos          : gestion de cursos (protegida, rol admin)
 * - /admin/inscripciones   : inscripciones por usuario (protegida, rol admin)
 * - /                      : redirige al catalogo de cursos
 * - *                      : pagina 404
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:id" element={<CourseDetailPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/cursos" replace />} />
        <Route
          path="/admin/cursos"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inscripciones"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminEnrollmentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
    </div>
  );
}
