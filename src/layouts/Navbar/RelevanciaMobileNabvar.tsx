import { FC } from "react";
import Select from "react-select";

interface ProductFilterProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const FilterProductMobile: FC<ProductFilterProps> = ({
  sortOption,
  setSortOption,
}) => {
  const options = [
    { value: "", label: "Precio" },
    { value: "price-asc", label: "Menor a Mayor" },
    { value: "price-desc", label: "Mayor a Menor" },
  ];

  const nameOptions = [
    { value: "", label: "Nombre" },
    { value: "name-asc", label: "A-Z" },
    { value: "name-desc", label: "Z-A" },
  ];

  return (
    <div className="md:hidden bg-background-0 shadow-sm mt-5 ml-2 py-2 px-4 h-auto w-full">
         <h2 className="flex justify-center mb-1 font-semibold ">Relevancia:</h2>
      <div className="flex justify-between w-full gap-3">
       

        <Select
          className="mb-3 relative w-full" // Puedes usar clases de Tailwind aquí
          value={options.find((option) => option.value === sortOption)}
          onChange={(e) => setSortOption(e?.value || "")}
          options={options}
        />

        <Select
          className="mb-3 relative w-full"
          value={nameOptions.find((option) => option.value === sortOption)}
          onChange={(e) => setSortOption(e?.value || "")}
          options={nameOptions}
        />
      </div>
    </div>
  );
};

export default FilterProductMobile;
