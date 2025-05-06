import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { ToastProps } from "../../Interfaces/toast";
import React, { useEffect } from "react";

const icons = {
  success: <CheckCircle className="text-green-500 w-5 h-5" />,
  error: <XCircle className="text-red-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
};

const bgColors = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 p-4 mb-2 rounded-lg shadow-lg ${bgColors[type]} animate-slide-in`}
    >
      {icons[type]}
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Toast;
