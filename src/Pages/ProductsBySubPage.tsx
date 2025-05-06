import { useState, useEffect, useCallback } from "react";
import ProductListByCat from "../layouts/Card/Product/ProductListByCat";
import SidebaPropiedad from "../layouts/Sidebar/PropiedadSid";
import { useParams } from "react-router-dom";
import { useProductBySub } from "../Hooks/ProductHook";
import { Iproduct } from "../Interfaces/product";
import NavbarPropiedad from "../layouts/Navbar/PropiedadMobileNabvar";

const ProductsBySub = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const { products } = subCategoryId
    ? useProductBySub(subCategoryId)
    : { products: [] };
  const [, setFilteredProducts] = useState<Iproduct[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const handleFilterChange = useCallback(
    (filters: { [key: string]: string[] }) => {
      console.log("Filtros actualizados en ProductsBySub:", filters);
      setSelectedFilters(filters);
    },
    []
  );

  useEffect(() => {
    if (!products || !Array.isArray(products)) return;

    console.log("Productos obtenidos:", products);

    const hasActiveFilters = Object.values(selectedFilters).some(
      (arr) => arr.length > 0
    );

    if (!hasActiveFilters) {
      console.log("Sin filtros activos, mostrando todos los productos.");
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      Object.entries(selectedFilters).every(([filterKey, filterValues]) => {
        if (!(filterKey in product)) return true;
        return filterValues.some((value) =>
          String(product[filterKey as keyof Iproduct])
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
    );

    console.log("Productos filtrados:", filtered);
    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  //  Convertir en el formato esperado
  const specsArray = Object.entries(selectedFilters).flatMap(([key, values]) =>
    values.map((value) => ({ spec_name: key, spec_value: value }))
  );

  return (
    <div>
      {/* Navbar solo visible en móvil */}
      <div className="md:hidden">
        <NavbarPropiedad
          subCategoryId={subCategoryId}
          onFilterChange={handleFilterChange}
        />
      </div>
  
      {/* Contenedor principal con sidebar y productos */}
      <div className="flex">
        <div className="hidden md:flex">
          <SidebaPropiedad
            subCategoryId={subCategoryId}
            onFilterChange={handleFilterChange}
          />
        </div>
  
        <div className="flex-1">
          <ProductListByCat
            subCategoryId={subCategoryId || ""}
            filter={{ subcategoryid: subCategoryId || "", specs: specsArray }}
          />
        </div>
      </div>
    </div>
  );
  
};

export default ProductsBySub;
