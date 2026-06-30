# Guía de publicación en GitHub por integrante

Este documento explica **qué le toca a cada uno de los 4 integrantes** y **cómo subir el
proyecto a GitHub de forma que cada usuario tenga commits propios** (trazabilidad por
integrante, como sugiere el docente). Al final hay una **plantilla con los datos que debes
darme cuando te conectes a GitHub** para que yo ejecute los `git push` por ti.

> El proyecto es **un solo repositorio** con 3 carpetas (`mock-api`, `student-portal`,
> `public-site`) + documentación. La distribución no separa repos: separa **autoría de
> commits**, de modo que en el historial de GitHub se vea el aporte de cada integrante.

---

## 1. Reparto del trabajo (qué archivos son de cada usuario)

### Usuario 1 — Autenticación y manejo de sesión (React)
Login, sesión JWT, rol de usuario, rutas protegidas y cierre de sesión.
```
student-portal/src/utils/tokenStorage.js
student-portal/src/services/httpClient.js
student-portal/src/services/authService.js
student-portal/src/context/AuthContext.jsx
student-portal/src/hooks/useAuth.js
student-portal/src/components/ProtectedRoute.jsx
student-portal/src/pages/LoginPage.jsx
```

### Usuario 2 — Portal del estudiante, diseño y administración (React)
Catálogo, detalle, dashboard, módulo admin (CRUD de cursos, cupos, inscripciones por usuario),
modales de alerta/confirmación, componentes reutilizables y sistema de diseño.
También arma el "esqueleto" de la app React.
```
student-portal/index.html
student-portal/package.json
student-portal/vite.config.js
student-portal/tailwind.config.js
student-portal/postcss.config.js
student-portal/.env.example
student-portal/.gitignore
student-portal/src/main.jsx
student-portal/src/App.jsx
student-portal/src/index.css
student-portal/src/models/types.js
student-portal/src/services/courseService.js
student-portal/src/services/enrollmentService.js
student-portal/src/services/adminService.js
student-portal/src/hooks/useFetch.js
student-portal/src/hooks/useAlert.js
student-portal/src/context/AlertContext.jsx
student-portal/src/components/Navbar.jsx
student-portal/src/components/Button.jsx
student-portal/src/components/Loader.jsx
student-portal/src/components/ErrorMessage.jsx
student-portal/src/components/CourseCard.jsx
student-portal/src/components/Input.jsx
student-portal/src/components/SearchBar.jsx
student-portal/src/components/Modal.jsx
student-portal/src/components/CourseForm.jsx
student-portal/src/pages/CoursesPage.jsx
student-portal/src/pages/CourseDetailPage.jsx
student-portal/src/pages/DashboardPage.jsx
student-portal/src/pages/NotFoundPage.jsx
student-portal/src/pages/admin/AdminCoursesPage.jsx
student-portal/src/pages/admin/AdminEnrollmentsPage.jsx
```

> Nota: algunos archivos generados por los agentes pueden variar ligeramente de nombre
> (por ejemplo `useAlert.js` podría exportarse desde `AlertContext.jsx`). Antes de los
> commits, ejecuta `git status` y ajusta la lista con los archivos reales que aparezcan.

### Usuario 3 — Módulo público (Next.js)
Landing con imagen de fondo, catálogo y detalle dinámico, estrategias de renderizado y componentes públicos.
```
public-site/   (toda la carpeta)
```

### Usuario 4 — API REST, administración backend, producción y documentación
API mock con JWT y roles, endpoints de administración (CRUD de cursos, inscripciones por usuario),
variables de entorno, scripts y documentación.
```
mock-api/      (toda la carpeta)
README.md
GUIA_GIT_USUARIOS.md
.gitignore
```

> El reparto está equilibrado: los 4 integrantes tienen código propio y **ningún usuario se
> queda sin subir nada**. Si en tu equipo son 5, el Usuario 5 puede encargarse de **capturas,
> video de sustentación y pruebas** (y aparecer como co-autor en algún commit del README).

---

## 2. Estrategia recomendada de commits (trazabilidad por integrante)

La idea: hacer **un commit por integrante**, cada uno firmado con el nombre/correo de ese
integrante, agregando solo sus archivos. Así el historial de GitHub muestra el aporte de cada uno.

> El orden importa solo para que el repo quede ordenado; el estado final contiene todo.
> Orden sugerido: **Usuario 4 (base/API) -> Usuario 2 (esqueleto React) -> Usuario 1 (auth) ->
> Usuario 3 (Next.js)**.

### Opción A — Commits secuenciales en `main` (más simple, recomendada)

Desde la carpeta `tarea/` (una sola persona puede ejecutarlo cambiando la identidad de Git
en cada commit, o cada integrante lo hace desde su propia máquina ya logueado):

```bash
# 0) Inicializar el repo (una sola vez)
cd tarea
git init
git branch -M main

# --- Commit del Usuario 4 (base, API, documentacion) ---
git config user.name  "NOMBRE_USUARIO_4"
git config user.email "correo_4@github.com"
git add mock-api/ README.md GUIA_GIT_USUARIOS.md .gitignore
git commit -m "feat(api): API REST mock con JWT, roles, administracion y documentacion"

# --- Commit del Usuario 2 (esqueleto React + diseno + cursos + admin) ---
git config user.name  "NOMBRE_USUARIO_2"
git config user.email "correo_2@github.com"
git add student-portal/index.html student-portal/package.json student-portal/vite.config.js \
        student-portal/tailwind.config.js student-portal/postcss.config.js \
        student-portal/.env.example student-portal/.gitignore \
        student-portal/src/main.jsx student-portal/src/App.jsx \
        student-portal/src/index.css student-portal/src/models/ \
        student-portal/src/hooks/useFetch.js student-portal/src/hooks/useAlert.js \
        student-portal/src/context/AlertContext.jsx \
        student-portal/src/services/courseService.js student-portal/src/services/enrollmentService.js \
        student-portal/src/services/adminService.js \
        student-portal/src/components/Navbar.jsx student-portal/src/components/Button.jsx \
        student-portal/src/components/Loader.jsx student-portal/src/components/ErrorMessage.jsx \
        student-portal/src/components/CourseCard.jsx student-portal/src/components/Input.jsx \
        student-portal/src/components/SearchBar.jsx student-portal/src/components/Modal.jsx \
        student-portal/src/components/CourseForm.jsx \
        student-portal/src/pages/CoursesPage.jsx student-portal/src/pages/CourseDetailPage.jsx \
        student-portal/src/pages/DashboardPage.jsx student-portal/src/pages/NotFoundPage.jsx \
        student-portal/src/pages/admin/
git commit -m "feat(portal): catalogo, detalle, dashboard, admin, modales y diseno monocromo"

# --- Commit del Usuario 1 (autenticacion, rol y sesion) ---
git config user.name  "NOMBRE_USUARIO_1"
git config user.email "correo_1@github.com"
git add student-portal/src/utils/tokenStorage.js \
        student-portal/src/services/httpClient.js student-portal/src/services/authService.js \
        student-portal/src/context/AuthContext.jsx student-portal/src/hooks/useAuth.js \
        student-portal/src/components/ProtectedRoute.jsx student-portal/src/pages/LoginPage.jsx
git commit -m "feat(auth): login, JWT, rol, contexto de sesion, rutas protegidas y logout"

# --- Commit del Usuario 3 (modulo publico Next.js) ---
git config user.name  "NOMBRE_USUARIO_3"
git config user.email "correo_3@github.com"
git add public-site/
git commit -m "feat(publico): landing con imagen, Next.js con SSG/ISR y detalle dinamico"

# 1) Conectar con GitHub y subir
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

> El correo de `git config user.email` debe coincidir con un correo verificado en la cuenta
> de GitHub de cada integrante para que GitHub atribuya el commit a su perfil (foto/usuario).
> Si `git add` se queja de una ruta inexistente, revisa con `git status` el nombre real del
> archivo (puede haberse usado un nombre ligeramente distinto) y ajústalo.

### Opción B — Una rama y un Pull Request por integrante (más profesional)

Cada integrante crea su rama, sube sus archivos y abre un PR hacia `main`:

```bash
git checkout -b feat/usuario1-auth
# ... git add <archivos del usuario> ...
git commit -m "feat(auth): ..."
git push -u origin feat/usuario1-auth
# Luego abrir el Pull Request en GitHub y hacer merge a main.
```

Repetir con `feat/usuario2-portal`, `feat/usuario3-publico`, `feat/usuario4-api`.
Esta opción deja evidencia de revisión de código entre el equipo.

---

## 3. Antes de subir: checklist

- [ ] `git status` no muestra archivos `.env` ni `node_modules/` (deben estar ignorados).
- [ ] Reemplazar los nombres reales de los integrantes en `README.md`.
- [ ] Agregar el enlace del video de YouTube en `README.md`.
- [ ] Agregar las capturas en `README.md` (sección Evidencias).
- [ ] Probar localmente: API -> portal React -> módulo Next.js (ver README).

---

## 4. Datos que debes darme cuando te conectes a GitHub

Cuando quieras que **yo (la IA) haga los `git push` por ti**, pégame esta plantilla rellenada
en el chat. Con eso ejecuto la creación de commits por integrante y el push al repositorio.

```
REPOSITORIO GITHUB: https://github.com/____/____.git
RAMA: main
ESTRATEGIA: A (commits por integrante)   o   B (una rama/PR por integrante)

USUARIO 1 (Auth):
  - git user.name:  ____
  - git email:      ____

USUARIO 2 (Portal/Diseno/Admin):
  - git user.name:  ____
  - git email:      ____

USUARIO 3 (Next.js):
  - git user.name:  ____
  - git email:      ____

USUARIO 4 (API/Docs):
  - git user.name:  ____
  - git email:      ____

CREDENCIAL PARA HACER PUSH (elige una):
  - Personal Access Token (PAT) de GitHub: ____   (recomendado)
    (GitHub ya NO acepta la contrasena de la cuenta para git push; necesitas un PAT.
     Crear en: GitHub -> Settings -> Developer settings -> Personal access tokens ->
     Tokens (classic) -> marcar el scope "repo").
  - O bien: ya tengo configurado SSH / GitHub CLI (`gh auth login`) en esta maquina.
```

> Seguridad: un PAT es como una contrasena. Si me lo pegas, usalo de un solo uso y
> **revocalo despues** desde GitHub. Lo ideal es que en tu maquina ya este `gh auth login`
> hecho o una llave SSH configurada; asi no necesitas pegar ningun secreto.

### Qué haré yo con esos datos
1. `git init` (si aún no es repo) y configurar la rama `main`.
2. Crear los commits por integrante según el reparto de la sección 1, firmando cada uno con su
   `user.name` / `email`.
3. `git remote add origin <repo>` y `git push` (o crear ramas y PRs si eliges la Opción B).
4. Confirmarte que cada integrante aparece con commits propios en el historial.
