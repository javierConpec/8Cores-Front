import { useEffect, useState } from "react";
import { IBanner } from "../Interfaces/Banners";
import {
  getProductByPromotion,
  getPromotion,
} from "../Services/PromotionService";
import { Iproduct } from "../Interfaces/Product";

export const usePromotion = () => {
  const [promotions, setPromotions] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getPromotion()
      .then((promotions) => {
        if (isMounted) {
          setPromotions(promotions);
        }
      })
      .catch((error) => console.error("Error al obtener los banners: ", error))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { promotions, loading };
};

export const useProductByPromotion = (promotionId: string | null) => {
  const [productPromotion, setProductPromotion] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!promotionId) {
      setProductPromotion([]);
      return;
    }
    let isMounted = true;

    const fetchProductPromotion = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductByPromotion(promotionId);
        console.log(data); // Verifica los datos de la respuesta
        if (isMounted) {
          setProductPromotion(data);
        }
      } catch (error: any) {
        console.error("Error al obtener productos por promocion", error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };
    fetchProductPromotion();
    return () => {
      isMounted = false;
    };
  }, [promotionId]);
  return { productPromotion, loading, error };
};
