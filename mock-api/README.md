# Mock API - Sistema de Inscripcion de Cursos

API REST mock (simulada) construida con **Node.js + Express** para un sistema de inscripcion de cursos universitarios. Forma parte del proyecto grupal de la universidad y corresponde a la entrega de **Usuario 4** (backend mock).

Los datos son en memoria (no hay base de datos): al reiniciar el servidor, las inscripciones vuelven a su estado inicial. El proyecto sigue una estructura **MVC** limpia: `routes` / `controllers` / `services` / `data` / `middleware`.

## Caracteristicas

- Autenticacion mediante **JWT** (paquete `jsonwebtoken`), token con expiracion de 2 horas.
- **Sistema de roles** (`student` / `admin`) con endpoints de administracion protegidos.
- **CORS** habilitado para React (`http://localhost:5173`) y Next.js (`http://localhost:3000`).
- Datos semilla: 3 usuarios (2 estudiantes y 1 administrador), 8 cursos e inscripciones de ejemplo.
- Manejo de errores centralizado y consistente.

## Sistema de roles

Cada usuario tiene un campo `role`:

- `student`: usuario estandar. Puede consultar cursos y gestionar sus propias inscripciones.
- `admin`: ademas puede crear, editar y eliminar cursos y ver todas las inscripciones agrupadas por usuario.

El `role` se incluye en el payload del JWT y en las respuestas de `login` y `GET /auth/me`.
Los endpoints de administracion estan protegidos por dos middlewares encadenados:
`requireAuth` (token valido) y `requireAdmin` (rol `admin`, de lo contrario responde `403`).

## Estructura del proyecto

```
mock-api/
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── server.js              # Arranque del servidor
    ├── app.js                 # App Express: CORS, JSON, rutas, errores
    ├── config/
    │   └── env.js             # Variables de entorno centralizadas
    ├── data/
    │   ├── users.js           # Usuarios semilla
    │   ├── courses.js         # Cursos semilla (8+)
    │   └── enrollments.js     # Inscripciones en memoria (mutable)
    ├── services/
    │   ├── authService.js     # Credenciales y tokens JWT
    │   ├── courseService.js   # Filtros y busqueda de cursos
    │   └── enrollmentService.js # Inscripciones (alta/baja/duplicados)
    ├── controllers/
    │   ├── authController.js
    │   ├── courseController.js
    │   └── enrollmentController.js
    ├── routes/
    │   ├── index.js           # Combina los routers bajo /api
    │   ├── authRoutes.js
    │   ├── courseRoutes.js    # GET publico + POST/PUT/DELETE admin
    │   ├── enrollmentRoutes.js
    │   └── adminRoutes.js     # Endpoints de administracion (/api/admin)
    └── middleware/
        ├── auth.js            # requireAuth (Bearer token) + requireAdmin
        └── errorHandler.js    # 404 + manejador de errores
```

## Requisitos

- Node.js **>= 18** (se utiliza ESM y la bandera `--watch`).

## Instalacion

```bash
npm install
```

## Ejecucion

Modo desarrollo (recarga automatica con `--watch`):

```bash
npm run dev
```

Modo produccion:

```bash
npm start
```

El servidor quedara disponible en: **http://localhost:4000/api**

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores segun necesites:

| Variable           | Descripcion                                  | Valor por defecto                      |
| ------------------ | -------------------------------------------- | -------------------------------------- |
| `PORT`             | Puerto del servidor                          | `4000`                                 |
| `JWT_SECRET`       | Secreto para firmar/verificar los tokens JWT | `cambia_este_secreto_en_produccion`    |
| `TOKEN_EXPIRES_IN` | Tiempo de expiracion del token               | `2h`                                   |

## Credenciales demo

```
Estudiante:
  email:    student@isil.edu
  password: 123456

Administrador:
  email:    admin@isil.edu
  password: admin123
```

> La contrasena solo existe en el archivo de datos y **nunca** se devuelve en las respuestas de la API.

## Endpoints

Base URL: `http://localhost:4000/api`

### Autenticacion

#### POST /api/auth/login
Inicia sesion y devuelve un token JWT.

- Body: `{ "email", "password" }`
- Respuestas: `200 { token, user: { id, name, email, role } }` | `401 { message }`

```bash
# Estudiante
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"student@isil.edu\",\"password\":\"123456\"}"

# Administrador
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@isil.edu\",\"password\":\"admin123\"}"
```

#### GET /api/auth/me
Devuelve los datos del usuario autenticado.

- Header: `Authorization: Bearer <token>`
- Respuestas: `200 { id, name, email, role }` | `401`

```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

### Cursos (publico)

#### GET /api/courses
Lista todos los cursos. Admite filtros opcionales `?search=` y `?category=`.

- Respuesta: `200 [Course]`

```bash
curl "http://localhost:4000/api/courses"
curl "http://localhost:4000/api/courses?search=web"
curl "http://localhost:4000/api/courses?category=Datos"
```

#### GET /api/courses/:id
Devuelve un curso por su id.

- Respuestas: `200 Course` | `404 { message }`

```bash
curl http://localhost:4000/api/courses/1
```

### Cursos (administracion)

Todas estas rutas requieren `requireAuth` + `requireAdmin`. Sin token devuelven `401`;
con un token de estudiante devuelven `403 { message: "Acceso restringido a administradores." }`.

#### POST /api/courses
Crea un curso. El `id` se genera como `max(ids) + 1`, `enrolled` inicia en `0` y, si no se envia
`imageUrl`, se usa `https://picsum.photos/seed/<id>/600/400`.

- Body: `{ title, description, category, credits, instructor, schedule, capacity, imageUrl }`
- Campos obligatorios: `title`, `category`, `credits`, `instructor`, `capacity`.
- Respuestas: `201 Course` | `400 { message }` si faltan campos | `401` | `403`

```bash
curl -X POST http://localhost:4000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_ADMIN>" \
  -d "{\"title\":\"DevOps\",\"description\":\"CI/CD y contenedores\",\"category\":\"Infraestructura\",\"credits\":3,\"instructor\":\"Ing. Ruiz\",\"schedule\":\"Sabado 10:00 - 13:00\",\"capacity\":25}"
```

#### PUT /api/courses/:id
Edita parcialmente un curso. Fusiona los campos enviados sobre el curso existente
(incluida `capacity` para modificar los cupos).

- Body parcial: cualquiera de los campos de `Course`.
- Respuestas: `200 Course` | `404 { message }` | `401` | `403`

```bash
curl -X PUT http://localhost:4000/api/courses/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_ADMIN>" \
  -d "{\"capacity\":50,\"title\":\"Desarrollo Web Frontend Avanzado\"}"
```

#### DELETE /api/courses/:id
Elimina un curso y, como limpieza, todas sus inscripciones asociadas (sin dejar huerfanos).

- Respuestas: `200 { message }` | `404 { message }` | `401` | `403`

```bash
curl -X DELETE http://localhost:4000/api/courses/8 \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

### Administracion (requieren token de admin)

#### GET /api/admin/enrollments
Devuelve todas las inscripciones agrupadas por usuario, con la informacion del usuario y el
titulo de cada curso. Incluye unicamente a los usuarios con al menos una inscripcion.

- Header: `Authorization: Bearer <token_admin>`
- Respuestas: `200 [ { user: { id, name, email }, enrollments: [ { id, courseId, courseTitle, status, date } ] } ]` | `401` | `403`

```bash
curl http://localhost:4000/api/admin/enrollments \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

### Inscripciones (requieren token)

#### GET /api/enrollments
Lista las inscripciones del usuario actual.

- Header: `Authorization: Bearer <token>`
- Respuesta: `200 [Enrollment]`

```bash
curl http://localhost:4000/api/enrollments \
  -H "Authorization: Bearer <TOKEN>"
```

#### POST /api/enrollments
Crea una inscripcion para el usuario actual.

- Body: `{ "courseId" }`
- Respuestas: `201 Enrollment` | `409 { message }` si ya esta inscrito | `404` si el curso no existe

```bash
curl -X POST http://localhost:4000/api/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d "{\"courseId\":1}"
```

#### DELETE /api/enrollments/:id
Elimina una inscripcion del usuario actual.

- Header: `Authorization: Bearer <token>`
- Respuestas: `200 { message }` | `404`

```bash
curl -X DELETE http://localhost:4000/api/enrollments/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Salud

#### GET /api/health
Verifica que la API esta activa: `200 { status: "ok", service: "mock-api" }`

## Modelos de datos

### User (sin password en las respuestas)
```json
{
  "id": 1,
  "name": "Estudiante Demo",
  "email": "student@isil.edu",
  "role": "student"
}
```

El campo `role` puede ser `"student"` o `"admin"`.

### Course
```json
{
  "id": 1,
  "title": "Desarrollo Web Frontend",
  "description": "...",
  "category": "Tecnologia",
  "credits": 4,
  "instructor": "Ing. Maria Fernandez",
  "schedule": "Lunes y Miercoles 18:00 - 20:00",
  "capacity": 30,
  "enrolled": 18,
  "imageUrl": "https://picsum.photos/seed/1/600/400"
}
```

### Enrollment
```json
{
  "id": 1,
  "courseId": 1,
  "userId": 1,
  "status": "PREINSCRITO",
  "date": "2026-06-29T12:00:00.000Z"
}
```

El campo `status` puede ser `"PREINSCRITO"` o `"INSCRITO"`.
