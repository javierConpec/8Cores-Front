import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { IProductFilter } from "../../../Interfaces/product";
import { useProductsByFilter } from "../../../Hooks/ProductHook";
import InfinityLoader from "../../../Helpers/loader";
interface Props {
  subCategoryId: string;
  filter: IProductFilter;
}

const ProductListByCat: React.FC<Props> = ({ subCategoryId, filter }) => {
  const {
    products: filteredProducts = [],
    loading,
    error,
  } = useProductsByFilter(filter);

  useEffect(() => {
    console.log("Filtros aplicados:", filter);
    console.log("Productos obtenidos:", filteredProducts);
  }, [filteredProducts, filter]);

  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    setPage(1);
  }, [subCategoryId]);
  if (loading) return <InfinityLoader />;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / limit));

  return (
    <div>
      <div className="bg-background-0 dark:bg-background-100 shadow-sm mt-5 mx-2 py-2 px-4 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-text-700">
          {filteredProducts.length > 0 && filteredProducts[0]?.subcategory?.name
            ? filteredProducts[0].subcategory.name
            : "Productos"}
        </h2>
        <p className="text-sm text-text-200">
          {startIndex + paginatedProducts.length} de {filteredProducts.length}{" "}
          resultados
        </p>
      </div>

      <div className="bg-transparent mx-2 min-h-[250px] py-2">
        {loading ? (
          <InfinityLoader />
        ) : error ? (
          <p className="text-center text-red-500">
            Error al cargar los productos
          </p>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showButton={true}
                />
              ))}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-secondary-200 text-text-700 rounded-md disabled:opacity-50"
              >
                «
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 rounded-md ${
                    page === i + 1
                      ? "bg-primary-600 text-text-100"
                      : "bg-secondary-200 text-text-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-secondary-200 text-text-700 rounded-md disabled:opacity-50"
              >
                »
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListByCat;
