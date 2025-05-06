import { FC } from "react";
import {
  useProductByPromotion,
  usePromotion,
} from "../../../Hooks/PromotionHook";
import ProductCard from "./ProductCard";
import InfinityLoader from "../../../Helpers/Loader";
import { useParams } from "react-router-dom";

interface ProductListOnSaleProps {
  sortOption: string;
}

const ProductListOnSale: FC<ProductListOnSaleProps> = ({ sortOption }) => {
  const { promotionId } = useParams();
  const validPromotionId: string | null = promotionId ?? null;
  console.log("promotionId:", promotionId);
  console.log("validPromotionId:", validPromotionId);
  const { loading: loadingPromotions } = usePromotion();
  const { productPromotion, loading, error } =
    useProductByPromotion(validPromotionId);
  if (loading || loadingPromotions) return <InfinityLoader />;

  const sortedProducts = [...productPromotion].sort((a, b) => {
    if (sortOption === "price-desc")
      return Number(b.prices.currentPrice) - Number(a.prices.currentPrice);
    if (sortOption === "price-asc")
      return Number(a.prices.currentPrice) - Number(b.prices.currentPrice);
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div>
      <div className="bg-background-0 dark:bg-background-100 shadow-sm mt-5 mx-2 py-2 px-4 flex justify-between items-center">
        <h2 className="text-md md:text-lg font-semibold text-text-700">
          Promociones Especiales
        </h2>
        <p className="text-sm text-text-200">
          {sortedProducts.length} productos en oferta
        </p>
      </div>

      <div className="bg-transparent mx-2 min-h-[250px] py-2">
        {loading ? (
          <InfinityLoader />
        ) : error ? (
          <p className="text-center text-red-500">
            Error al cargar los productos
          </p>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {sortedProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  showButton={true}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hay productos en promoción.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListOnSale;
