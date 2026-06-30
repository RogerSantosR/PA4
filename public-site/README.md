# Módulo Público - Oferta Académica (Usuario 3)

Sitio web público construido con **Next.js 14 (App Router)** y **JavaScript**.
Forma parte de un sistema universitario de inscripción de cursos y corresponde
al módulo **para visitantes NO autenticados**: muestra la oferta académica
pública (catálogo de cursos y detalle de cada curso).

No usa librería de UI: el estilizado se hace con **CSS plano** (hoja global con
variables CSS + CSS Modules por componente/página). Tema visual azul moderno
(color primario `#2563eb`).

---

## Descripción

- **Inicio (`/`)**: landing con hero, sección de destacados y un llamado a la
  acción (CTA) hacia el catálogo.
- **Catálogo (`/cursos`)**: lista todos los cursos obtenidos desde la API.
- **Detalle (`/cursos/[id]`)**: ficha completa de un curso (descripción,
  créditos, horario, instructor, capacidad, cupos y ocupación).
- **404 (`not-found`)**: página personalizada para rutas/cursos inexistentes.
- **Header/Footer** comunes, con enlace al **Portal del estudiante**
  (`http://localhost:5173`, módulo autenticado de otro integrante del grupo).

---

## Estrategias de renderizado utilizadas (y dónde)

Este proyecto evidencia distintas estrategias de renderizado de Next.js:

| Ruta              | Archivo                              | Estrategia                                                                 |
| ----------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `/`               | `src/app/page.js`                    | **Estática (SSG)** — `export const dynamic = 'force-static'`.              |
| `/cursos`         | `src/app/cursos/page.js`             | **SSG con revalidación (ISR)** — `export const revalidate = 60`.           |
| `/cursos/[id]`    | `src/app/cursos/[id]/page.js`        | **Ruta dinámica + SSG dinámico** — `generateStaticParams()` para pre-generar cada curso, `dynamicParams = true` como fallback a renderizado dinámico para ids nuevos, `generateMetadata()` para SEO por curso, y `revalidate = 60` (ISR). |

### Tolerancia a fallos (fallback)

La API mock (`http://localhost:4000/api`) puede estar **apagada** durante
`next build` o en producción. Para que la construcción y el renderizado
**nunca fallen**, la capa de datos (`src/lib/api.js`) envuelve cada `fetch` en
`try/catch` y, ante cualquier error, devuelve los **datos semilla locales**
definidos en `src/lib/fallbackCourses.js` (8 cursos). Así, `npm run build` y
`npm start` funcionan aunque la API esté caída.

---

## Contrato de la API

URL base configurable por entorno (`NEXT_PUBLIC_API_URL` o `API_URL`),
con valor por defecto `http://localhost:4000/api`.

- `GET /courses` → `[Course]`
- `GET /courses/:id` → `Course`

Forma de `Course`:

```json
{
  "id": "1",
  "title": "Introducción a la Programación",
  "description": "...",
  "category": "Tecnología",
  "credits": 4,
  "instructor": "Dra. Ana Morales",
  "schedule": "Lun y Mié 08:00 - 10:00",
  "capacity": 40,
  "enrolled": 32,
  "imageUrl": "https://picsum.photos/seed/1/600/400"
}
```

---

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta si es necesario:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## Instalación

```bash
npm install
```

## Ejecución

Modo desarrollo (con recarga en caliente):

```bash
npm run dev
```

Construcción para producción:

```bash
npm run build
```

Servir la build de producción:

```bash
npm start
```

La aplicación queda disponible en `http://localhost:3000`.

> Nota: gracias al mecanismo de fallback, el flujo completo
> `npm install && npm run build && npm start` funciona **aunque la API esté
> caída**, usando los datos locales de respaldo.

---

## Estructura del proyecto

```
public-site/
├─ next.config.js          # Config de imágenes remotas (picsum.photos)
├─ jsconfig.json           # Alias "@/*" -> "./src/*"
├─ package.json
├─ .env.example
└─ src/
   ├─ app/
   │  ├─ layout.js          # Layout raíz (Header + Footer + metadata)
   │  ├─ page.js            # Inicio (SSG)
   │  ├─ not-found.js       # 404
   │  └─ cursos/
   │     ├─ page.js         # Catálogo (ISR / revalidate)
   │     └─ [id]/page.js    # Detalle dinámico (generateStaticParams)
   ├─ components/           # Header, Footer, Hero, CourseCard (+ CSS Modules)
   ├─ lib/
   │  ├─ api.js             # getCourses / getCourseById (fetch + fallback)
   │  └─ fallbackCourses.js # 8 cursos semilla
   └─ styles/
      └─ global.css         # Tokens de diseño + reset + grid responsivo
```
