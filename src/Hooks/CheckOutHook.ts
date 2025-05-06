import { useAuth } from "../Contexts/AuthContext";
import { startCheckOut } from "../Services/CartService";

export const useCheckout = () => {
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      console.error("No hay usuario logueado.");
      return;
    }

    try {
      await startCheckOut(user.sid);
      console.log("Checkout exitoso");
    } catch (error) {
      console.error("Error al iniciar checkout", error);
    }
  };

  return { handleCheckout };
};
