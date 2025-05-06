import { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../Services/CategoryService";
import { ICategory, ISubcategory } from "../Interfaces/Category";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((categories) => {
        if (isMounted) {
          setCategories(categories);
        }
      })
      .catch((error) => console.error("Error al obtener categorías:", error))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading };
};

export const useSubcategories = (categoryId: string | null) => {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    let isMounted = true;

    const fetchSubcategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getSubCategories(categoryId);
        if (isMounted) {
          setSubcategories(data);
        }
      } catch (err: any) {
        console.error("Error al obtener subcategorías:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchSubcategories();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return { subcategories, loading, error };
};
