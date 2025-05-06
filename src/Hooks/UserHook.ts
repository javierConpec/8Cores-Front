import { useState, useEffect, useCallback } from "react";
import {
  registerService,
  loginService,
  getLoggedInUser,
  validateTokenService,
  updateUserService,
  DeleteUser,
} from "../Services/AuthService";
import {
  IAuthLogin,
  IAuthLogueado,
  IAuthRegister,
  IUpdateUser,
} from "../Interfaces/Auth";
import { syncCart } from "../Services/CartService";
import { CART } from "../Contexts/CartContextType";
import { IListCart } from "../Interfaces/Cart";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState<IAuthLogueado["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<IListCart[]>([]);

  // Función para iniciar sesión
  const login = useCallback(async (credentials: IAuthLogin) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginService(credentials);
      if (response.token) {
        localStorage.setItem("token", response.token);

        // Obtener datos del usuario después del login
        const userResponse: IAuthLogueado = await getLoggedInUser();
        const user = userResponse.success ? userResponse.data : null;
        setUser(user);

        // Obtener carrito desde localStorage
        const storedCart = localStorage.getItem(CART);
        const items: IListCart[] = storedCart ? JSON.parse(storedCart) : [];

        // Formatear datos para la API
        const formattedItems = items.map((item) => ({
          productid: item.id,
          quantity: item.existences.quantity,
        }));

        console.log("Enviando carrito a la API:", cart, {
          personid: user?.sid,
          items: formattedItems,
        });

        if (user && formattedItems.length > 0) {
          await syncCart(user.sid, formattedItems);
          localStorage.removeItem(CART); // 🗑️ Borra carrito tras sincronizar
          setCart([]); // 🛒 Limpia el carrito en memoria
        } else {
          console.warn("No hay productos válidos para sincronizar.");
        }
      }
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener usuario al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: IAuthLogueado = await getLoggedInUser();
        console.log("Usuario obtenido:", response);

        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const register = useCallback(async (userData: IAuthRegister) => {
    console.log("Datos enviados al registro:", userData); // 👀 Verifica qué datos estás enviando

    setLoading(true);
    setError(null);
    try {
      const response = await registerService(userData);
      if (response.token) {
        localStorage.setItem("token", response.token);

        // Obtener datos del usuario después del registro
        const userResponse: IAuthLogueado = await getLoggedInUser();
        setUser(userResponse.success ? userResponse.data : null);
      }
    } catch (error: any) {
      setError(error.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(CART); // 🗑️ Borra el carrito del localStorage
    setUser(null); // ❌ Elimina los datos del usuario
    setCart([]); // 🛒 Limpia el carrito en memoria
  };

  // Limpiar el error después de un tiempo
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return { user, setUser, loading, error, register, login, logout, setError };
};
//validarToken
const useValidateToken = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = new URLSearchParams(window.location.search).get("token");

  console.log(" Token extraído de la URL:", token);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.warn("❌ No hay token en la URL, redirigiendo...");
        navigate("/login");
        console.log("🔍 Token enviado:", token);
        return;
      }

      try {
        await validateTokenService(token);
        setIsValid(true);
        console.log("✅ Token válido");
      } catch (error) {
        console.error("❌ Error validando token:", error);
        setIsValid(false);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    validateToken();
  }, [token, navigate]);

  return { isValid };
};

export default useValidateToken;

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<IUpdateUser | null>(null);

  const updateUser = async (userId: string, userData: Partial<IUpdateUser>) => {
    setLoading(true);
    setError(null);

    try {
      const user = await updateUserService(userId, userData);
      console.log(" Usuario actualizado correctamente:", user);
      setUpdatedUser(user);
    } catch (err: any) {
      console.error("Error al actualizar usuario:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, updatedUser, loading, error };
}

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const deleteUser = useCallback(async (personId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await DeleteUser(personId);
      setData(result);

      if (!result || result.error)
        throw new Error(result.message || "Error deleting user");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteUser, loading, error, data };
};
