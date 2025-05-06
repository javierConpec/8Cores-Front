import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  getLoggedInUser,
  intoEmailValidate,
  UserByID,
} from "../Services/AuthService";
import { IAuthLogueado, IUser } from "../Interfaces/Auth";

interface AuthContextType {
  user: IAuthLogueado["data"] | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
  fetchUserById: (personId: string) => Promise<IUser | null>;
  resetPassword: (email: string) => Promise<void>;
}

// Crear el contexto para la autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthLogueado["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await intoEmailValidate.resetPassword(email);
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (personId: string): Promise<IUser | null> => {
    try {
      const userData = await UserByID(personId);
      return userData;
    } catch (err) {
      console.error("Error al obtener usuario por ID:", err);
      return null;
    }
  };
  // Obtener el usuario logueado si hay token
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response: IAuthLogueado = await getLoggedInUser();
        console.log("Usuario actual:", response);

        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error("Error en autenticación:", response.message);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (err: any) {
        console.error("Error al obtener usuario:", err.message);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // Limpiar errores después de 5 segundos
  /* useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);*/

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        logout,
        token,
        setToken,
        fetchUserById,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
