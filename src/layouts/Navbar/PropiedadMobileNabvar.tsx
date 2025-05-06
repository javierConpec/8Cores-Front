import SpecsSubCatDropdown from "../../Components/Dropdown/DropDownSpecs";
import { useState, useCallback } from "react";

interface NavbarPropiedadProps {
  subCategoryId: string | undefined;
  onFilterChange: (filters: { [key: string]: string[] }) => void;
}

const NavbarPropiedad: React.FC<NavbarPropiedadProps> = ({
  subCategoryId,
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const handleFilterChange = useCallback(
    (newFilters: { [key: string]: string[] }) => {
      setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        console.log(selectedFilters);

        Object.entries(newFilters).forEach(([key, values]) => {
          if (values.length) {
            updatedFilters[key] = values;
          } else {
            delete updatedFilters[key];
          }
        });

        return updatedFilters;
      });

      onFilterChange(newFilters);
    },
    [onFilterChange]
  );

  return (
    <div className="bg-background-0 dark:bg-background-100 w-full shadow-sm mt-2 py-2 px-4">
      <p className="text-center font-bold text-text-300 text-dm mb-3">
        Filtros:
      </p>

      {subCategoryId ? (
        <div>
        <SpecsSubCatDropdown
          subCategoryId={subCategoryId}
          onSelect={handleFilterChange}
        />
      </div>
      ) : (
        <p className="text-center text-black">
          No hay subcategoría seleccionada
        </p>
      )}
    </div>
  );
};

export default NavbarPropiedad;
