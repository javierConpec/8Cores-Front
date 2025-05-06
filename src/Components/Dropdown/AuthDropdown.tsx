import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import Dropdown from "./Dropdown";
import { IDropdownOption } from "../../Interfaces/OptionAccount";

const guestOptions = [
  { id: 1, name: "Iniciar sesión", path: "/login" },
  { id: 2, name: "Registrarse", path: "/signup" },
];

const AuthDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState<string>("Mi Cuenta");
  const [options, setOptions] = useState<IDropdownOption[]>(guestOptions);

  useEffect(() => {
    console.log("Usuario actual:", user);

    if (user) {
      const userFirstName = user.ident || "Usuario";
      setUserName(`Hola, ${userFirstName}`);

      setOptions([
        { id: 1, name: "Perfil", path: "/profile" },
        { id: 2, name: "Mis pedidos", path: "/orders" },
        { id: 3, name: "Cerrar sesión", path: "/home" },
      ]);
    } else {
      setUserName("Mi Cuenta");
      setOptions(guestOptions);
    }
  }, [user]);

  const handleAuthSelect = async (option: IDropdownOption) => {
    if (option.id === 3) {
      // Cerrar sesión
      await logout();
      window.location.reload(); // Recargar después de cerrar sesión
    } else if (option.path) {
      navigate(option.path);
      setTimeout(() => {
        window.location.reload(); // Recargar después de cambiar de ruta
      }, 100);
    }
  };

  return (
    <Dropdown
      options={options}
      placeholder={userName}
      onSelect={handleAuthSelect}
      variant="Auth"
    />
  );
};

export default AuthDropdown;
