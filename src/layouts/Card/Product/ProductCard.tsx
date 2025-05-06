import { Iproduct } from "../../../Interfaces/product";
import { useNavigate } from "react-router-dom";
import { calculateDiscount } from "../../../Helpers/CalculateDiscount";
import Button from "../../../Components/Button/Button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../Contexts/cartContextType";
import { IAddCart } from "../../../Interfaces/cart";
import { useAuth } from "../../../Contexts/AuthContext";
import { useToast } from "../../../Contexts/toastContext";
import { useStatByProduct } from "../../../Hooks/ReseñaHook";

interface Props {
  product: Iproduct;
  showButton?: boolean;
}

const ProductCard = ({ product, showButton = false }: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { stats, loading, error } = useStatByProduct(product.id);

  const averageRating = Math.round(Number(stats?.averageRating));

  // Calcular el descuento solo si basePrice y currentPrice existen
  const discount =
    product.prices?.currentPrice && product.prices?.basePrice
      ? calculateDiscount(
          Number(product.prices.basePrice),
          Number(product.prices.currentPrice)
        )
      : 0;

  const handleCardClick = () => {
    if (product.id) {
      navigate(`/products/${product.id}`);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active handleCardClick al hacer clic en el botón

    const cartItem: IAddCart = {
      personid: user?.sid || "invitado",
      productid: product.id,
      quantity: 1,
    };

    try {
      await addToCart(cartItem);
      showToast("success", `${product.name} añadido con exito`);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  return (
    <div
      className={`p-4 bg-background-0 dark:bg-background-100  transition duration-300 cursor-pointer  group `}
      onClick={handleCardClick}
    >
      <div className="md:w-full md:h-[180px] flex justify-center items-center bg-gray-100 rounded-md">
        <img
          src={product.images.length > 0 ? product.images[0] : ""}
          alt={`Imagen de ${product.name}`}
          title={product.name}
          className="md:w-full md:h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h5 className="text-sm md:text-lg font-semibold mt-2 text-text-900">
        {product.name}
      </h5>

      <p className="text-[10px] md:text-sm text-text-600">
        {product.category?.name || "Sin categoría"}
      </p>

      <div className="md:flex text-black justify-between">
        {/* Precios */}
        <div className="mt-1 flex flex-col">
          {Number(product.prices.currentPrice) > 0 &&
          Number(product.prices.currentPrice) <
            Number(product.prices.basePrice) ? (
            <div>
              <p className="text-[10px] md:text-sm text-text-500 line-through">
                S/.{Number(product.prices.basePrice).toFixed(2)}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm md:text-xl font-bold text-primary-600">
                  S/.{Number(product.prices.currentPrice).toFixed(2)}
                </p>
                {discount > 0 && (
                  <span className="text-[10px] md:text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md">
                    -{Math.round(discount)}%
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm md:text-xl font-bold text-primary-600">
              S/.{Number(product.prices.basePrice).toFixed(2)}
            </p>
          )}
        </div>

        {/* Calificaciones */}
        <div className="mt-1">
          {loading ? (
            <p></p>
          ) : error ? (
            <p className="text-sm text-red-400">Error al cargar rating</p>
          ) : stats ? (
            <div className="flex justify-between mx-5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={` text-lg ${
                    i < averageRating
                      ? "text-accent-400"
                      : "text-background-200"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {/* Botón opcional (solo visible en hover) */}
      {showButton && (
        <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mt-2">
          <Button
            icon={<ShoppingBag />}
            text="Añadir al carrito"
            onClick={handleAddToCart}
            variant="addCart"
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
