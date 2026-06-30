// ============================================================
// models/types.js (Usuario 2) - capa de modelo
// Definiciones de formas de datos (JSDoc typedefs) y helpers de shape.
// No generan codigo en tiempo de ejecucion: documentan los objetos que
// la app intercambia con la API y dan autocompletado en el editor.
// ============================================================

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {number} credits
 * @property {string} instructor
 * @property {string} schedule
 * @property {number} capacity
 * @property {number} enrolled
 * @property {string} imageUrl
 */

/**
 * @typedef {Object} Enrollment
 * @property {string} id
 * @property {string} courseId
 * @property {string} userId
 * @property {'PREINSCRITO'|'INSCRITO'} status
 * @property {string} date
 */

// Imagen de respaldo cuando un curso no trae imageUrl.
export const FALLBACK_COURSE_IMAGE =
  'https://placehold.co/600x400?text=Curso';

/**
 * Normaliza un curso recibido de la API garantizando valores por defecto
 * seguros para la UI (evita errores al renderizar campos ausentes).
 * @param {Partial<Course>} raw
 * @returns {Course}
 */
export function normalizeCourse(raw = {}) {
  return {
    id: raw.id,
    title: raw.title ?? 'Sin titulo',
    description: raw.description ?? '',
    category: raw.category ?? 'General',
    credits: raw.credits ?? 0,
    instructor: raw.instructor ?? 'Por asignar',
    schedule: raw.schedule ?? 'Por definir',
    capacity: raw.capacity ?? 0,
    enrolled: raw.enrolled ?? 0,
    imageUrl: raw.imageUrl || FALLBACK_COURSE_IMAGE,
  };
}

/** Indica si un curso aun tiene cupos disponibles. */
export function hasAvailableSeats(course) {
  return (course?.capacity ?? 0) > (course?.enrolled ?? 0);
}
