import { FC } from "react";
import Select from "react-select";

interface ProductFilterProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const FilterProduct: FC<ProductFilterProps> = ({
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
    <div className="hidden md:flex bg-background-0 shadow-sm mt-5 ml-2 py-2 px-4 h-full w-[250px]">
      <div className="flex flex-col w-full gap-3">
        <h2>Relevancia</h2>

        <Select
          className="mb-3 relative" // Puedes usar clases de Tailwind aquí
          value={options.find((option) => option.value === sortOption)}
          onChange={(e) => setSortOption(e?.value || "")}
          options={options}
        />

        <Select
          className="mb-3 relative"
          value={nameOptions.find((option) => option.value === sortOption)}
          onChange={(e) => setSortOption(e?.value || "")}
          options={nameOptions}
        />
      </div>
    </div>
  );
};

export default FilterProduct;
