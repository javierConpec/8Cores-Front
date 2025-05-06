import { fetchData } from "../Helpers/PeticionApi";
import { IAuthLogin, IAuthLogueado, IAuthRegister, IAuthResponse, IUpdateUser, IUser } from "../Interfaces/auth";

// Función auxiliar para manejar el token en localStorage
const setToken = (token: string) => localStorage.setItem("token", token);
const getToken = (): string | null => localStorage.getItem("token");

// Función genérica para peticiones POST
const postRequest = async <T>(url: string, data: any): Promise<T> => {
  try {
    return await fetchData<T>(url, "POST", data);
  } catch (error) {
    throw new Error(`Error en la petición POST: ${(error as Error).message}`);
  }
};

// Servicio de registro
export const registerService = (userData: IAuthRegister): Promise<IAuthResponse> =>
  postRequest<IAuthResponse>("/api/v1/auth/register", userData);


// Servicio de inicio de sesión
export const loginService = async (credentials: IAuthLogin): Promise<IAuthResponse> => {
  const response = await postRequest<IAuthResponse>("/api/v1/auth/login", credentials);
  if (response.token) setToken(response.token);
  return response;
};

export const getLoggedInUser = async (): Promise<IAuthLogueado> => {
  const token = getToken();
  if (!token) throw new Error("Token no disponible");

  const response = await fetch("/api/v1/auth/test-ec", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  const data = await response.json();
  return data;
};


export const intoEmailValidate = {
  resetPassword: async (email: string): Promise<string> => {
    try {
      const response = await fetchData<{ message: string }>("/api/v1/auth/password-reset","POST",
        { email },{ message: "Error desconocido" } 
      );
      return response.message; 
    } catch (error: any) {
      throw new Error(error || "Error al solicitar el restablecimiento de contraseña");
    }
  },
};

export const changePass = {
  resetPassword: async (token: string, pass: string): Promise<string> => {
    try {
      const response = await fetchData<{ message: string }>(
        `/api/v1/auth/complete-password-reset`,
        "POST",
        { token, pass },
        { message: "Error desconocido" }
      );
      return response.message; 
    } catch (error: any) {
      throw new Error(error || "Error al restablecer la contraseña");
    }
  },
};


export const validateTokenService = async (token: string) => {
  const response = await fetch(`/api/v1/auth/validate-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(" Error API:", errorData);
    throw new Error("Token inválido o expirado");
  }

  return response.json();
};

export async function updateUserService(userId: string, userData: Partial<IUpdateUser>) {
  const response = await fetchData<{ data: IUpdateUser }>( 
    `/api/v1/users/person/${userId}`,
    "PATCH",
    userData
  );

  console.log("🔍 Respuesta completa de fetchData:", response); // 🔎 Verificar estructura

  return response?.data; 
}


export const UserByID = async (personId: string): Promise<IUser | null> => {
  try {
    const user = await fetchData<IUser>(`/api/v1/users/person/${personId}`, "GET");
    console.log("Usuario obtenido:", user);
    return user;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    return null;
  }
};

export const DeleteUser=async(personId:string)=> {
 

  const response = await fetch(`/api/v1/users/person/${personId}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    }
  
  });

  return response.json();
};