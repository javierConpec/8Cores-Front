import { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const PasswordReset = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-sm text-gray-600 mt-3">
          Ingresa tu email para restablecer tu contraseña.
        </p>

        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-between mt-5 gap-3">
          <button
            className="bg-accent-600 w-full text-white rounded-lg px-5 py-2 hover:bg-accent-700 transition"
            onClick={() => {
              if (email.trim() !== "") {
                resetPassword(email);
                setEmail("");
                onClose();
              }
            }}
          >
            Enviar
          </button>
          <button
            className="w-full border border-accent-400 text-accent-700 rounded-lg px-5 py-2 hover:bg-accent-100 transition"
            onClick={() => {
              setEmail("");
              onClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
