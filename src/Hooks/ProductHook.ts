import { useEffect, useState } from "react";
import { Iproduct, IProductFilter } from "../Interfaces/product";
import {
  getProduct,
  getProductByID,
  getProductBySubCategory,
  getProductsByFilter,
  getProductTopCali,
} from "../Services/productService";

export const useProduct = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProduct();

        if (Array.isArray(productList)) {
          setProducts(productList);
        } else {
          console.error("La API no devolvió un array:", productList);
          setProducts([]);
        }
      } catch (error) {
        console.warn("Error al obtener productos", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export const useProductTop = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductsTop = async () => {
      try {
        const productList = await getProductTopCali();
        if (Array.isArray(productList)) {
          setProducts(productList);
        } else {
          console.error("La api no devolvio: ", productList);
          setProducts([]);
        }
      } catch (error) {
        console.warn("Error al obtener productoss", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsTop();
  }, []);
  return { products, loading };
};

// Hook para obtener un producto por su ID
export const useProductByID = (id: string) => {
  const [product, setProduct] = useState<Iproduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productData = await getProductByID(id);

        if (Array.isArray(productData) && productData.length > 0) {
          setProduct(productData[0]);
        } else if (productData) {
          setProduct(productData);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error al obtener el producto", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading };
};

//hook para products por subCatgory
export const useProductBySub = (subCategoryId?: string) => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsBySubCategory = async () => {
      if (!subCategoryId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const productsData = await getProductBySubCategory(subCategoryId);

        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("Error al obtener productos por subcategoría", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsBySubCategory();
  }, [subCategoryId]);

  return { products, loading };
};

export const useProductsByFilter = (filter: IProductFilter) => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Asignamos un array vacío en caso de que specs esté vacío o undefined
        const specsToSend =
          filter.specs && filter.specs.length > 0 ? filter.specs : [];

        const data = await getProductsByFilter(
          filter.subcategoryid,
          specsToSend
        );
        setProducts(data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  return { products, loading, error };
};
