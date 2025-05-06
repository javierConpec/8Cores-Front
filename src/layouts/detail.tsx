import { useNavigate, useParams } from "react-router-dom";
import { useProductByID } from "../Hooks/ProductHook";
import ProductImageGallery from "./Carrusel/ProductCarrusel";
import { Store, ShoppingBag, HandCoins } from "lucide-react";
import Counter from "../Components/Cart/counter";
import InfinityLoader from "../Helpers/loader";
import Button from "../Components/Button/Button";
import { useState } from "react";
import ProductSpecs from "./Table/ProductSpecs";
import { useSpecsByProduct } from "../Hooks/SpecHook";
import ProductList from "./Card/Product/ProductList";
import { useCart } from "../Contexts/cartContextType";
import { useAuth } from "../Contexts/AuthContext";
import { IAddCart } from "../Interfaces/cart";
import ProductStats from "./reseseña/state";
import ProductComments from "./reseseña/comments";
import IntoReseña from "./reseseña/reseña";
import { useToast } from "../Contexts/toastContext";

const DetailP = () => {
  const { id } = useParams();
  const { product, loading } = useProductByID(id!);
  const navigate = useNavigate();
  const { specsProduct, loading: specsLoading, error } = useSpecsByProduct(id!);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();

  if (loading) return <InfinityLoader />;
  if (!product)
    return <p className="text-center text-red-500">Producto no encontrado</p>;

  const handleAddToCart = async (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (quantity > 5) {
      showToast("error", "La cantidad máxima es 5 unidades.");
      return; // No añade al carrito si la cantidad es mayor que 5
    }

    const cartItem: IAddCart = {
      personid: user?.sid || "invitado",
      productid: product.id,
      quantity: quantity,
    };

    try {
      await addToCart(cartItem);
      console.log("Producto añadido al carrito:", cartItem);
      showToast("success", `${product.name} añadido al carrito`);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  return (
    <div className="p-2  md:mx-0 md:p-0 ">
      <div className="md:flex shadow-2xl container w-auto bg-background-0 dark:bg-background-100 mt-5mx-3 md:ml-10 p-2  md:p-5 ">
        <div className="flex flex-col md:flex-row gap-3 md:mt-5 mr-3">
          <div className="w-[150px]   md:w-[550px]">
            <ProductImageGallery images={product.images} />
          </div>
          <div className="flex-1 md:p-0 px-3">
            <div className="flex  md:block">
            <div>
            <strong className="text-text-300 text-[10px] md:text-sm uppercase">
              {product.category?.name || "No disponible"}
            </strong>
            <h2 className="text-text-800 font-bold text-md md:text-xl uppercase">
              {product.name}
            </h2>
            <p className="text-sm md:text-md text-background-200">
              SKU: {product.sku}
            </p>
            </div>
            <div className="hidden md:flex w-[270px] h-[1px] bg-background-100 my-5"></div>
            <strong className="flex flex-col justify-center ml-10 md:ml-0 text-lg md:text-[35px] text-text-800">
              {Number(product.prices.currentPrice) > 0 ? (
                <>
                  {Number(product.prices.basePrice) >
                    Number(product.prices.currentPrice) && (
                    <p className="text-[10px] md:text-[15px] text-gray-500 line-through">
                      S/.{Number(product.prices.basePrice).toFixed(2)}
                    </p>
                  )}
                  <p className="text-md font-bold ">
                    S/.{Number(product.prices.currentPrice).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-md font-bold ">
                  S/.{Number(product.prices.basePrice).toFixed(2)}
                </p>
              )}
            </strong>
            </div>
            <div className="w-auto md:w-[270px] h-[1px] bg-background-100 my-5"></div>
            <h2 className="text-text-300 font-bold text-lg md:text-xl uppercase">
              Descripcion
            </h2>
            <div className="w-auto h-[1px] bg-background-100  mt-3 mb-2"></div>
            <p className="p-1 text-text-700 text-left text-sm md:text-md font-semibold">
              {product.description}
            </p>
          </div>
        </div>

        <div className="md:m-3 my-5 rounded-lg shadow-lg bg-secondary-50 w-full p-2 overflow-hidden">
          <strong className="text-text-600 m-3 text-md">Entrega</strong>
          <p className="text-text-300 font-semibold  mt-3 p-2 text-sm flex items-center">
            <Store size={15} className="mr-2 md:mr-1" /> Retíralo en Tienda
          </p>
          <div>
          <p className="text-text-300 text-[12px] md:text-sm px-7">
            Av. Fray A. Alcalde 10 <br />
            44160, Jir. Bolht, Jal., Perú
          </p>
          </div>
          
          <div className="w-auto h-[1px] bg-background-100 m-5"></div>

          <div className="grid gap-4 top-5  p-3">
            <div className="flex justify-center ml-4">
              <Counter
                productId={product.id}
                quantity={quantity}
                onChange={(newQuantity) => setQuantity(newQuantity)}
              />
            </div>
            <Button
              icon={<ShoppingBag />}
              text="Añadir al carrito"
              onClick={handleAddToCart}
              variant="addCart"
            />
            <Button
              icon={<HandCoins />}
              text="Comprar ahora"
              onClick={async () => {
                await handleAddToCart();
                navigate("/resumen");
              }}
              variant="buy"
            />
          </div>

          <div className="w-auto h-[1px] bg-background-100 mx-5 mt-5 mb-2"></div>
          <p className="text-center text-[12px] md:text-sm text-text-200">
            Vendido y entregado por 8Cores
          </p>
        </div>
      </div>

      {/* Características del Producto */}
      <div className="container mt-3 md:mt-0  bg-background-0 dark:bg-background-100 md:mx-3 md:ml-10 p-5">
        <p className="text-left text-md md:text-[30px] font-bold text-text-900">
          Características del Producto
        </p>
        <div className="w-full h-[1px] bg-background-100 mt-3 mb-5"></div>
        {specsLoading ? (
          <InfinityLoader />
        ) : error ? (
          <p className="text-accent-500">
            Error al cargar las especificaciones
          </p>
        ) : specsProduct.length > 0 ? (
          <ProductSpecs specs={specsProduct} />
        ) : (
          <p className="text-[12px] md:text-md text-text-500">
            Por el momento no contamos con las especificaciones.
          </p>
        )}
      </div>
      <div className="bg-background-0 dark:bg-background-100 my-3 md:mx-10 p-3 md:p-5">
        <h3 className="text-md md:text-lg font-bold text-text-900">
          Comentarios de este Producto
        </h3>
        <div className="w-full h-[1px] bg-text-300 mt-3 mb-5"></div>
        <div className="flex flex-col md:flex-row justify-between">
        <div className="md:m-5">
          <ProductStats productId={product.id} />
        </div>
        <div>
        <IntoReseña productId={product.id} personId={user?.sid || ""} />
        </div>
        </div>
        
        
        <div>
          <ProductComments productId={product.id} />
        </div>
      </div>

      <ProductList title="Mira estos" filterType="random" mobileScroll={true} />
    </div>
  );
};

export default DetailP;
