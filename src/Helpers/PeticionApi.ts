import axios, { Method, AxiosRequestConfig } from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Interceptor para agregar el token de autorización
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchData<T>(
  endpoint: string,
  method: Method = "GET",
  data?: any,
  headers?: Record<string, string>
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        ...headers,
      },
    };

    // Si el método es GET y hay parámetros, los serializamos
    if (method === "GET" && data) {
      config.params = data;
      config.paramsSerializer = (params) =>
        qs.stringify(params, { arrayFormat: "brackets" });
    } else {
      config.data = data;
    }

    const response = await api(config);
    console.log("Respuesta de la API:", response.data);

    return response.data?.data ?? response.data;
  } catch (error: any) {
    console.error(" Error API:", error.response || error);

    // Manejar errores sin response (errores de red, timeouts, etc.)
    if (!error.response) {
      throw new Error("Error de conexión con el servidor");
    }

    throw (
      error.response?.data?.message || new Error("Error desconocido en la API")
    );
  }
}
