import { CircleUserRound } from "lucide-react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SidebarAuth = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSalir = async () => {
    logout();
    navigate("/home");
  };
  const handlePerfil = async () => {
    navigate("/profile");
  };
  const handleOrder = async () => {
    navigate("/Orders");
  };

  return (
    <>
      <div className="flex flex-col bg-background-0 dark:bg-background-100 w-[400px] shadow-2xl rounded-lg p-4 h-[400px]">
        <div>
          <CircleUserRound className="w-[100px] h-[100px] text-primary-500 m-auto mb-5 " />
          <p className="px-10 text-xl font-[600] text-text-600 text-center">
            Hola, {user?.ident}!
          </p>
        </div>
        <div className="flex flex-col my-5 text-text-700 gap-3">
          <button
            className="w-full hover:bg-background-50 dark:hover:bg-background-500 dark:hover:text-text-900 h-10"
            onClick={handlePerfil}
          >
            Perfil
          </button>
          <button
            className="w-full hover:bg-background-50 dark:hover:bg-background-500 dark:hover:text-text-900  h-10"
            onClick={handleOrder}
          >
            Pedidos
          </button>
          <button
            className="w-full hover:bg-background-50 dark:hover:bg-background-500 dark:hover:text-text-900  h-10"
            onClick={handleSalir}
          >
            Salir
          </button>
        </div>
      </div>
    </>
  );
};
export default SidebarAuth;
