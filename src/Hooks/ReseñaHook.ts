import { useEffect, useState } from "react";
import {
  ICommentByProduct,
  IPostComment,
  IResponseComment,
  IStatsByProduct,
  IValidateResponse,
} from "../Interfaces/Reseña";
import {
  getComments,
  getStats,
  postComment,
  validate,
} from "../Services/ReseñaService";

export const useStatByProduct = (productId: string | null) => {
  const [stats, setStats] = useState<IStatsByProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setStats(null);
      return;
    }
    let isMounted = true;

    const fetchStatProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getStats(productId);
        if (isMounted && response) {
          setStats(response);
        }
      } catch (error: any) {
        console.log("Error al obtener las estadísticas del producto", error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStatProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { stats, loading, error };
};

export const useCommentByProduct = (productId: string | null) => {
  const [comments, setComments] = useState<ICommentByProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setComments([]);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    setError(null);

    const fetchCommentProduct = async () => {
      try {
        const data = await getComments(productId);
        if (!signal.aborted) {
          setComments(data);
        }
      } catch (error: any) {
        if (!signal.aborted) {
          console.error(
            "Error al obtener los comentarios del producto:",
            error
          );
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCommentProduct();

    return () => {
      controller.abort(); // Cancela la solicitud si el componente se desmonta
    };
  }, [productId]);

  return { comments, loading, error, setComments }; // Retorna setComments por si necesitas actualizar manualmente
};

export const useValidateComment = (personId: string, productId: string) => {
  const [validation, setValidation] = useState<IValidateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId || !productId) return; // Evita llamadas innecesarias si los IDs no están definidos

    const fetchValidation = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await validate({
          personid: personId,
          productid: productId,
        });
        console.log("API response:", response); // Debug para verificar la respuesta
        setValidation(response);
      } catch (err: any) {
        console.error("Error fetching validation:", err);
        setError(err.message || "Error de validación");
      } finally {
        setLoading(false);
      }
    };

    fetchValidation();
  }, [personId, productId]);

  return { validation, loading, error };
};
export const usePostComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<IResponseComment | null>(null);

  const sendComment = async (data: IPostComment) => {
    setLoading(true);
    setError(null);

    try {
      const result = await postComment(data);
      setResponse(result);
      return result;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { sendComment, loading, error, response };
};
