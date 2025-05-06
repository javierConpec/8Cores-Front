import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidateToken from "../../Hooks/UserHook";
import { changePass } from "../../Services/AuthService";
import Input from "../../Components/Input/Input1";
import { Check, Lock } from "lucide-react";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";

const ResetPassword: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isValid } = useValidateToken();
  const navigate = useNavigate();
  const [pass, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (pass !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await changePass.resetPassword(token, pass);
      setIsModalOpen(true); //Abre el modal correctamente
    } catch (err) {
      console.error(" Error al cambiar la contraseña", err);
    }
  };

  if (isValid === null) return null;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-background-0 w-[400px] p-10 rounded-xl border border-background-100 shadow-xl">
        <h2 className="text-xl font-semibold text-primary-800 text-center mb-7">
          ¡Cambia tu Contraseña AQUI!
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            id="password"
            htmlFor="password"
            label="New Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />
          <Input
            id="password2"
            htmlFor="password2"
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
          />
        </div>

        <Button
          text="Cambiar contraseña"
          onClick={handleReset}
          variant="sesion"
          type="submit"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
        >
          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              ¡Contraseña cambiada exitosamente!
            </h2>
            <p className="text-gray-500">
              Ahora puedes iniciar sesión con tu nueva contraseña.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default ResetPassword;
