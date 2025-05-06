import { useEffect, useState } from "react";
import { Ispecs, IspecsSubCategory } from "../Interfaces/Specs";
import {
  getSpecsByProduct,
  getSpecsBySubCategory,
} from "../Services/SpecsService";

export const useSpecsByProduct = (productId: string | null) => {
  const [specsProduct, setspecsProduct] = useState<Ispecs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setspecsProduct([]);
      return;
    }

    let isMounted = true;

    const fetchSpecsProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getSpecsByProduct(productId);
        if (isMounted) {
          setspecsProduct(data);
        }
      } catch (error: any) {
        console.log("Error al obtener los specs", error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };
    fetchSpecsProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);
  return { specsProduct, loading, error };
};

export const useSpecsBySubCategory = (subCategoryId: string | null) => {
  const [specsSubCategory, setSpecsSubCategory] = useState<IspecsSubCategory[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subCategoryId) {
      setSpecsSubCategory([]);
      return;
    }

    let isMounted = true;

    const fetchSpecSubCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getSpecsBySubCategory(subCategoryId);
        console.log("Datos recibidos:", response); // Verifica el formato de los datos recibidos

        if (isMounted) {
          setSpecsSubCategory(Array.isArray(response) ? response : []);
        }
      } catch (err: any) {
        console.error("Error al obtener Specs por subCategory:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchSpecSubCategory();

    return () => {
      isMounted = false;
    };
  }, [subCategoryId]);

  return { specsSubCategory, loading, error };
};
