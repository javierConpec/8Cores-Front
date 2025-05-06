import { useEffect, useState } from "react";
import { IResponseOrder } from "../Interfaces/order";
import { getOrders } from "../Services/orderService";

export const useOrders = (personId: string | null) => {
  const [order, setOrder] = useState<IResponseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setOrder([]);
      return;
    }
    let isMounted = true;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getOrders(personId);
        if (isMounted) {
          setOrder(data);
        }
      } catch (error: any) {
        console.error("error al obtener los pedidos:", error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [personId]);
  return { order, loading, error };
};
