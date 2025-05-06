import { useEffect } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  autoClose?: boolean; // Nuevo
  duration?: number;   // Opcional: duración del cierre automático
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  autoClose = false,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background-0 rounded-3xl shadow-2xl p-6 w-[90%] max-w-md relative"
      >
        <div className="text-center">{children}</div>

        {autoClose && (
          <motion.div
            initial={{ width: "98%" }}
            animate={{ width: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="absolute bottom-0 left-4 h-1 bg-accent-500 rounded-bl-3xl rounded-br-3xl"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Modal;
