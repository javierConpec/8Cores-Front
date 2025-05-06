import React, { useState } from "react";
import Toast from "./toast";

interface ToastItem {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

let toastId = 0;

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: ToastItem["type"], message: string) => {
    const newToast = { id: ++toastId, type, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Botones para ejemplo */}
      <div className="fixed bottom-5 left-5 flex flex-col gap-2">
        <button
          onClick={() => showToast("success", "¡Operación exitosa!")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Toast Éxito
        </button>
        <button
          onClick={() => showToast("error", "¡Ocurrió un error!")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Toast Error
        </button>
        <button
          onClick={() => showToast("info", "Este es un mensaje informativo")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toast Info
        </button>
        <button
          onClick={() => showToast("warning", "Advertencia")}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Toast Warning
        </button>
      </div>
    </>
  );
};

export default ToastContainer;
