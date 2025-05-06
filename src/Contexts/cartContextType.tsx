import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useAuth } from "./AuthContext";
import {
  editCart,
  getCartByPerson,
  postCart,
  vaciarCart,
} from "../Services/CartService";
import { IAddCart, IEditCart, IListCart } from "../Interfaces/Cart";
import { getProductByID } from "../Services/ProductService";

export const CART = "cart_items";

interface CartContextType {
  cart: IListCart[];
  loading: boolean;
  error: string | null;
  clearCart: () => Promise<void>;
  addToCart: (product: IAddCart) => Promise<void>;
  editCartItem: (productid: string, operation: 1 | -1) => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const personId = user?.sid;
  const prevPersonId = useRef<string | null>(null);
  const [cart, setCart] = useState<IListCart[]>(() => {
    // Recuperar el carrito desde localStorage (si existe)
    const storedCart = localStorage.getItem(CART);
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      localStorage.setItem(CART, JSON.stringify(cart));
    }
  }, [cart, personId]);

  //Función para obtener el carrito (API o LocalStorage)
  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      if (personId) {
        const response = await getCartByPerson(personId);
        console.log("Carrito actualizado desde API:", response);
        setCart(response);
        return response; // Ahora devuelve los datos
      } else {
        const localCart = JSON.parse(localStorage.getItem(CART) || "[]");
        console.log("Carrito actualizado desde localStorage:", localCart);
        setCart(localCart);
        return localCart; // Ahora devuelve los datos
      }
    } catch (error: any) {
      console.error("Error al obtener el carrito:", error);
      return null; // Para evitar `undefined`
    } finally {
      setLoading(false);
    }
  };

  //Cargar carrito cada vez que cambie el usuario
  useEffect(() => {
    fetchCart();
  }, [personId]);

  useEffect(() => {
    if (prevPersonId.current && !personId) {
      // Solo se ejecuta si había un usuario y ahora ya no hay (logout)
      setCart([]);
      localStorage.removeItem(CART);
    }

    prevPersonId.current = personId || null;
  }, [personId]);

  // Función para agregar productos al carrito y actualizarlo automáticamente
  const addToCartAPI = async (product: IAddCart) => {
    try {
      const response = await postCart(
        product.personid,
        product.productid,
        product.quantity
      );
      if (!response) {
        throw new Error("No se pudo añadir el producto al carrito.");
      }
      await fetchCart(); // Actualizar carrito desde la API
    } catch (error: any) {
      throw new Error(error.message || "Error al añadir producto al carrito.");
    }
  };

  const addToCartLocal = (product: IListCart) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                existences: {
                  ...item.existences,
                  quantity:
                    item.existences.quantity + product.existences.quantity, // 🔹 Corrección aquí
                },
              }
            : item
        );
      } else {
        updatedCart = [...prev, product];
      }

      // Guardar en localStorage
      localStorage.setItem(CART, JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const addToCart = async (product: IAddCart) => {
    setLoading(true);
    setError(null);

    try {
      if (personId) {
        await addToCartAPI(product);
      } else {
        const productData = await getProductByID(product.productid);

        if (!productData) {
          throw new Error("No se encontró el producto en la base de datos.");
        }

        //  Convertir `IAddCart` `IListCart`
        const productForLocal: IListCart = {
          id: product.productid,
          sku: productData.sku,
          name: productData.name,
          prices: {
            basePrice: productData.prices.basePrice,
            currentPrice: productData.prices.currentPrice,
          },
          existences: {
            quantity: product.quantity,
            stockAvaliablre: 0,
          },
          images: productData.images.length > 0 ? productData.images[0] : "",
        };

        addToCartLocal(productForLocal);
      }
    } catch (error: any) {
      console.error("Error al añadir producto al carrito:", error);
      setError(error.message || "Error al añadir producto al carrito.");
    } finally {
      setLoading(false);
    }
  };

  //Funcion para editar cantidad del product
  const editCartItem = async (productid: string, operation: 1 | -1) => {
    setLoading(true);
    setError(null);

    try {
      if (personId) {
        const cartData: IEditCart = {
          personid: personId,
          productid,
          operation,
        };
        console.log("Enviando datos al backend:", cartData);

        const response = await editCart(cartData);
        console.log("Respuesta del backend:", response);

        // Solo una llamada a fetchCart()
        const updatedCart = await fetchCart();
        console.log("Nuevo carrito obtenido:", updatedCart);
        setCart(updatedCart);
      } else {
        //  Modo LocalStorage
        setCart((prev) => {
          const updatedCart = prev
            .map((item) =>
              item.id === productid && item.existences
                ? {
                    ...item,
                    existences: {
                      ...item.existences,
                      quantity: item.existences.quantity + operation,
                    },
                  }
                : item
            )
            .filter((item) => item.existences && item.existences.quantity > 0);

          localStorage.setItem(CART, JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
    } catch (error: any) {
      setError(error.message || "Error al actualizar la cantidad");
      console.error("Error al actualizar el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!personId) {
      setCart([]);
      return;
    }

    const success = await vaciarCart(personId);
    if (success) {
      setCart([]);
      localStorage.removeItem(CART);
    }
  };

  //Función pública para refrescar el carrito manualmente
  const refreshCart = async () => {
    await fetchCart();
  };
  useEffect(() => {
    console.log("Carrito actualizado en el contexto:", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        editCartItem,
        refreshCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
