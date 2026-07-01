# Gestión de Cursos e Inscripciones — Experiencia Integrada

Solución integral del curso **Programación Web II (PA4)** del Instituto San Ignacio de Loyola.
El proyecto integra un **portal del estudiante en React** (con autenticación JWT y consumo de
API REST), un **módulo público en Next.js** (oferta académica para visitantes) y una **API REST
mock** que sirve los datos. Está preparado para un entorno de producción mediante variables de
entorno documentadas, scripts de ejecución y una estructura de carpetas ordenada.

---

## Integrantes

> Reemplazar con los nombres reales del equipo antes de la entrega.

| # | Integrante | Rol / Módulo principal |
|---|------------|------------------------|
| 1 | Roger Angel Santos Ramos | Autenticación y manejo de sesión (React) |
| 2 | Renato Marmanillo Santi | Portal del estudiante y diseño (React) |
| 3 | Esli Rodrigo Julca Luis | Módulo público (Next.js) |
| 4 | Alexis Sebastian Quispe Ramos | API REST, módulo de administración y documentación |

---

## Video de sustentación

**YouTube:** _Pegar aquí el enlace al video de sustentación (modo oculto o público)._

> El video debe mostrar a los integrantes con las cámaras prendidas explicando el trabajo realizado.

---

## Descripción del proyecto

La institución requiere una versión demostrable del sistema *"Gestión de Cursos e Inscripciones"*.
La solución se compone de tres aplicaciones que trabajan juntas:

- **Portal del estudiante (React + Vite):** permite iniciar sesión, consultar el catálogo de
  cursos, ver el detalle de cada curso, inscribirse y gestionar sus inscripciones desde una vista
  protegida. Usa autenticación basada en token (JWT) con rutas protegidas y cierre de sesión.
  Incluye un **módulo de administración** (rol admin) para crear, editar y eliminar cursos,
  modificar los cupos y consultar las inscripciones por usuario.
- **Módulo público (Next.js):** expone la oferta académica a visitantes no autenticados, con
  página de inicio, catálogo y detalle dinámico de cursos, evidenciando distintas estrategias de
  renderizado (SSG / ISR / rutas dinámicas).
- **API REST mock (Node + Express):** entrega los datos de cursos, autenticación, inscripciones
  y las operaciones de administración. Puede sustituirse por la API de PA2 respetando el contrato.

---

## Arquitectura y buenas prácticas

El código sigue una separación **MVC** y prioriza la **reutilización**:

```
tarea/
├── mock-api/         -> API REST (Express)        - MVC: routes -> controllers -> services -> data
├── student-portal/   -> Portal del estudiante (React + Vite)
│   └── src/
│       ├── services/ + models/   -> capa Modelo (acceso a datos / formas)
│       ├── pages/ + components/   -> capa Vista (vistas y componentes reutilizables)
│       └── context/ + hooks/      -> capa Controlador (sesión, alertas y lógica)
└── public-site/      -> Módulo público (Next.js App Router)
    └── src/{app, components, lib, styles}
```

- **Componentes reutilizables** (Button, Input, Loader, ErrorMessage, CourseCard, Navbar, Modal, CourseForm).
- **Servicios desacoplados** con una única instancia de cliente HTTP (axios) e interceptores.
- **Manejo de estados** de carga, error y vacío en cada consumo de API.
- **Alertas y confirmaciones con modales** de Tailwind (sin `alert()`/`confirm()` del navegador).
- **Variables de entorno** para desacoplar la URL de la API.
- **Diseño responsive con Tailwind CSS**, tema monocromo (fondo blanco, botones negros),
  tipografía Inter, iconografía con **lucide-react** y un sistema de diseño compartido entre apps.

---

## Tecnologías usadas

| Aplicación | Tecnologías |
|------------|-------------|
| Portal del estudiante | React 18, Vite 5, React Router v6, Axios, lucide-react |
| Módulo público | Next.js 14 (App Router), React 18, lucide-react |
| API REST mock | Node.js (>=18), Express 4, jsonwebtoken, CORS |
| Estilos | Tailwind CSS 3 (tema monocromo blanco/negro, responsive) |
| Control de versiones | Git + GitHub |

---

## Autenticación, roles y manejo de sesión

- Login contra `POST /auth/login`, que devuelve un **JWT** (expira en 2 h) y el usuario con su **rol**.
- Roles soportados: `student` (portal y sus inscripciones) y `admin` (gestión de cursos e inscripciones).
- El token se almacena en `localStorage` bajo una clave con espacio de nombres
  (`student_portal_token`). Esta decisión se documenta en `student-portal/src/utils/tokenStorage.js`,
  indicando el compromiso de seguridad frente a *cookies httpOnly*.
- Un **interceptor de axios** inyecta el `Authorization: Bearer <token>` en cada petición y limpia
  la sesión automáticamente ante una respuesta `401`.
- Las **rutas protegidas** usan `<ProtectedRoute>`; el módulo admin (`/admin/...`) además exige
  `requiredRole="admin"`.
- El **cierre de sesión** elimina el token y restablece el estado de autenticación.

### Credenciales de prueba

```
Estudiante -> email: student@isil.edu   password: 123456
Administrador -> email: admin@isil.edu   password: admin123
```

---

## Variables de entorno

Cada aplicación incluye un `.env.example`. Copiarlo a `.env` y ajustar según el entorno.

| Aplicación | Variable | Valor por defecto | Descripción |
|------------|----------|-------------------|-------------|
| `mock-api` | `PORT` | `4000` | Puerto del servidor de la API |
| `mock-api` | `JWT_SECRET` | `cambia_este_secreto_en_produccion` | Secreto para firmar los JWT |
| `mock-api` | `TOKEN_EXPIRES_IN` | `2h` | Tiempo de expiración del token |
| `student-portal` | `VITE_API_URL` | `http://localhost:4000/api` | URL base de la API REST |
| `public-site` | `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` | URL base de la API REST |

> Los archivos `.env` están en `.gitignore` y **no** se suben al repositorio. Solo se versiona `.env.example`.

---

## Instalación y ejecución (entorno local)

Requisitos: **Node.js >= 18** y **npm**. Abrir **tres terminales**, una por aplicación.

### 1) API REST mock

```bash
cd mock-api
cp .env.example .env        # en Windows PowerShell: Copy-Item .env.example .env
npm install
npm run dev                 # http://localhost:4000/api
```

### 2) Portal del estudiante (React)

```bash
cd student-portal
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

### 3) Módulo público (Next.js)

```bash
cd public-site
cp .env.example .env
npm install
npm run dev                 # http://localhost:3000
```

> Orden recomendado: levantar primero la **API**, luego el **portal** y el **módulo público**.

---

## Preparación para producción (build)

```bash
# Portal del estudiante
cd student-portal && npm run build && npm run preview

# Módulo público
cd public-site && npm run build && npm start
```

El módulo público está diseñado para que `next build` **nunca falle** aunque la API esté apagada:
`src/lib/api.js` cae a datos semilla locales (`fallbackCourses.js`) ante cualquier error de red.

### Estrategias de renderizado (Next.js)

| Ruta | Estrategia | Evidencia |
|------|-----------|-----------|
| `/` | Estático (SSG) | `export const dynamic = 'force-static'` |
| `/cursos` | SSG con revalidación (ISR) | `export const revalidate = 60` |
| `/cursos/[id]` | Ruta dinámica + SSG dinámico | `generateStaticParams()` + `generateMetadata()` |

---

## Contrato de la API REST

Base URL: `http://localhost:4000/api`

### Públicos / estudiante

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/auth/login` | — | Inicia sesión y devuelve `{ token, user }` (incluye `role`) |
| GET | `/auth/me` | Bearer | Perfil del usuario autenticado (incluye `role`) |
| GET | `/courses` | — | Lista de cursos (`?search=`, `?category=`) |
| GET | `/courses/:id` | — | Detalle de un curso |
| GET | `/enrollments` | Bearer | Inscripciones del usuario actual |
| POST | `/enrollments` | Bearer | Crear inscripción `{ courseId }` |
| DELETE | `/enrollments/:id` | Bearer | Cancelar inscripción |

### Administración (rol admin)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/courses` | Bearer (admin) | Crear curso |
| PUT | `/courses/:id` | Bearer (admin) | Editar curso y/o modificar cupos (`capacity`) |
| DELETE | `/courses/:id` | Bearer (admin) | Eliminar curso (y sus inscripciones) |
| GET | `/admin/enrollments` | Bearer (admin) | Inscripciones agrupadas por usuario |

---

## Evidencias / Capturas

> Agregar aquí las capturas de las vistas principales y, de ser posible, del build de producción.

- [ ] Login del portal
- [ ] Catálogo de cursos (React)
- [ ] Detalle de curso e inscripción
- [ ] Dashboard del estudiante (vista protegida)
- [ ] Panel de administración: gestión de cursos
- [ ] Panel de administración: inscripciones por usuario
- [ ] Landing pública (Next.js)
- [ ] Catálogo / detalle público (Next.js)
- [ ] Build de producción sin errores

---

## Matriz de distribución de aportes

| # | Integrante | Rol / Módulo principal |
|---|------------|------------------------|
| 1 | Roger Angel Santos Ramos | Autenticación y manejo de sesión (React) |
| 2 | Renato Marmanillo Santi | Portal del estudiante y diseño (React) |
| 3 | Esli Rodrigo Julca Luis | Módulo público (Next.js) |
| 4 | Alexis Sebastian Quispe Ramos | API REST, módulo de administración y documentación |

> El detalle de archivos por integrante y el procedimiento de publicación en GitHub está en
> [`GUIA_GIT_USUARIOS.md`](./GUIA_GIT_USUARIOS.md).
