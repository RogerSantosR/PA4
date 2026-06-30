// ============================================================
// AlertContext
// Proveedor de dialogos reutilizables (alert y confirm) basados en el
// componente Modal. Reemplaza window.alert / window.confirm por modales
// con estilo Tailwind monocromo e iconos de lucide-react.
//
// API expuesta por el contexto:
//   notify({ type, title, message })        -> muestra un modal informativo
//   confirm({ title, message, ... })          -> devuelve Promise<boolean>
// ============================================================

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import Modal from '../components/Modal.jsx';
import Button from '../components/Button.jsx';

export const AlertContext = createContext(null);

// Iconos por tipo de notificacion.
const ICONS = {
  success: { Icon: CheckCircle2, className: 'text-green-600' },
  error: { Icon: AlertCircle, className: 'text-red-600' },
  info: { Icon: Info, className: 'text-neutral-700' },
};

export function AlertProvider({ children }) {
  // Estado del dialogo actual. mode: 'alert' | 'confirm' | null.
  const [dialog, setDialog] = useState(null);
  // Guardamos la funcion resolve del confirm pendiente.
  const resolveRef = useRef(null);

  const close = useCallback(() => {
    setDialog(null);
  }, []);

  // Muestra un modal informativo (un solo boton "Aceptar").
  const notify = useCallback(({ type = 'info', title, message }) => {
    setDialog({ mode: 'alert', type, title, message });
  }, []);

  // Muestra un modal de confirmacion. Devuelve una promesa que se resuelve
  // a true (confirmar) o false (cancelar / cerrar).
  const confirm = useCallback((options = {}) => {
    const {
      title,
      message,
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      danger = false,
    } = options;
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setDialog({
        mode: 'confirm',
        title,
        message,
        confirmText,
        cancelText,
        danger,
      });
    });
  }, []);

  // Resuelve el confirm pendiente y cierra el modal.
  const settle = useCallback(
    (result) => {
      if (resolveRef.current) {
        resolveRef.current(result);
        resolveRef.current = null;
      }
      close();
    },
    [close]
  );

  // Al cerrar (backdrop / Escape / X): un confirm equivale a cancelar.
  const handleClose = useCallback(() => {
    if (dialog?.mode === 'confirm') {
      settle(false);
    } else {
      close();
    }
  }, [dialog, settle, close]);

  const value = { notify, confirm };

  const open = Boolean(dialog);
  const isConfirm = dialog?.mode === 'confirm';
  const { Icon, className: iconClass } =
    (dialog && dialog.mode === 'alert' && ICONS[dialog.type]) || ICONS.info;

  return (
    <AlertContext.Provider value={value}>
      {children}

      <Modal
        open={open}
        onClose={handleClose}
        title={dialog?.title}
        footer={
          isConfirm ? (
            <>
              <Button variant="outline" onClick={() => settle(false)}>
                {dialog?.cancelText}
              </Button>
              <Button
                variant={dialog?.danger ? 'danger' : 'primary'}
                onClick={() => settle(true)}
              >
                {dialog?.confirmText}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={close}>
              Aceptar
            </Button>
          )
        }
      >
        <div className="flex items-start gap-3">
          {!isConfirm && (
            <Icon
              className={`mt-0.5 h-6 w-6 shrink-0 ${iconClass}`}
              aria-hidden="true"
            />
          )}
          <p className="text-sm leading-relaxed text-neutral-700">
            {dialog?.message}
          </p>
        </div>
      </Modal>
    </AlertContext.Provider>
  );
}

// Hook de conveniencia exportado tambien desde aqui.
export function useAlert() {
  const context = useContext(AlertContext);
  if (context === null) {
    throw new Error('useAlert debe usarse dentro de un <AlertProvider>.');
  }
  return context;
}
