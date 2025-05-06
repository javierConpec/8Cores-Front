import { useProduct } from "../../../Hooks/ProductHook";
import { filterProducts } from "../../../Helpers/FilterProduct";
import ProductCard from "./ProductCard";
import { Iproduct } from "../../../Interfaces/Product";

interface ProductListProps {
  title?: string;
  filterType?: "discount" | "price" | "random";
  minDiscount?: number;
  maxPrice?: number;
  useProductHook?: () => { products: Iproduct[]; loading: boolean };
  mobileScroll?: boolean; // nuevo prop
}

const ProductList = ({
  title,
  filterType,
  minDiscount,
  maxPrice,
  useProductHook = useProduct,
  mobileScroll = false,
}: ProductListProps) => {
  const { products = [], loading } = useProductHook();

  const filteredProducts = filterProducts(
    products,
    filterType || "random",
    minDiscount,
    maxPrice
  );

  return (
    <div className="md:mx-4">
      {title && (
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold pl-5 mt-7 w-full text-left mb-3 text-text-900">
          {title}
        </h2>
      )}

      <div className="bg-background-0 dark:bg-background-100 mx-2 sm:mx-5 py-3 px-3 min-h-[250px]">
        {loading ? (
          <div className="flex justify-center items-center h-40 sm:h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary-500"></div>
          </div>
        ) : (
          <div
            className={`${
              mobileScroll
                ? "flex overflow-x-auto no-scrollbar gap-5 ml-3"
                : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            } md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 md:overflow-visible`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={mobileScroll ? "min-w-[50%] md:min-w-0" : ""}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-center text-text-500 col-span-full">
                No hay productos disponibles con estos filtros.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
