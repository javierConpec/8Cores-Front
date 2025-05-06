import SpecsSubCatDropdown from "../../Components/Dropdown/DropDownSpecs";
import {  useState, useCallback } from "react";

interface SidebaPropiedadProps {
    subCategoryId: string | undefined;
    onFilterChange: (filters: { [key: string]: string[] }) => void; // Pasar los filtros al padre
}

const SidebaPropiedad: React.FC<SidebaPropiedadProps> = ({ subCategoryId, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

    
    const handleFilterChange = useCallback((newFilters: { [key: string]: string[] }) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            console.log(selectedFilters)
    
            // Actualizar los filtros con los nuevos valores
            Object.entries(newFilters).forEach(([key, values]) => {
                if (values.length) {
                    updatedFilters[key] = values;
                } else {
                    delete updatedFilters[key]; 
                }
            });
    
            return updatedFilters;
        });
    
        // Asegurar que siempre se envíe un objeto con todas las claves, aunque estén vacías
        onFilterChange(newFilters);
    }, [onFilterChange]);
    
    

    return (
        <div className="ml-5 my-5 bg-background-0 dark:bg-background-100 min-w-[250px]">
            <p className="mt-4 text-center font-bold text-text-300 text-lg">Filtrar por propiedad:</p>
            <div className="w-auto h-[1px] bg-background-100 m-3"></div>

            {subCategoryId ? (
                <SpecsSubCatDropdown subCategoryId={subCategoryId} onSelect={handleFilterChange} />
            ) : (
                <p className="text-center text-black">No hay subcategoría seleccionada</p>
            )}
        </div>
    );
};

export default SidebaPropiedad;
