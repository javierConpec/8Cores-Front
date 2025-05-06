import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSpecsBySubCategory } from "../../Hooks/SpecHook";
import { ChevronDown } from "lucide-react";

interface Props {
  subCategoryId: string | null;
  onSelect: (selected: { [key: string]: string[] }) => void;
}

const SpecsSubCatDropdown: React.FC<Props> = ({ subCategoryId, onSelect }) => {
  const { specsSubCategory, loading } = useSpecsBySubCategory(subCategoryId);
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSelect(selectedValues);
  }, [selectedValues, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback((name: string, value: string) => {
    setSelectedValues((prev) => {
      const updatedValues = prev[name]?.includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...(prev[name] || []), value];

      const newState = { ...prev, [name]: updatedValues };
      if (updatedValues.length === 0) delete newState[name];
      return newState;
    });
  }, []);

  const toggleDropdown = (name: string) => {
    setIsOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div
      className="flex flex-row overflow-x-auto no-scrollbar gap-4 ml-3 
    md:flex-col md:overflow-visible md:gap-2"
      ref={dropdownRef}
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-t-primary-500 border-b-transparent"></div>
        </div>
      ) : specsSubCategory.length === 0 ? (
        <p className="text-center text-text-500 text-sm">
          No contamos con propiedades
        </p>
      ) : (
        specsSubCategory.map((spec) => (
          <div key={spec.name} className="relative">
            <button
              onClick={() => toggleDropdown(spec.name)}
              className="flex items-center justify-between w-full bg-background-0 dark:bg-background-100 px-3 py-2"
              type="button"
            >
              <span className="text-[12px] md:text-sm uppercase font-bold m-1 text-text-900">
                {spec.name}
              </span>
              {/* selectedValues[spec.name]?.length > 0
                  ? selectedValues[spec.name].slice(0, 2).join(", ") +
                    (selectedValues[spec.name].length > 2 ? "..." : "")
                  : `$*/}

              <ChevronDown
                className={`w-4 h-4 text-accent-500 transition-transform duration-200 ${
                  isOpen[spec.name] ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpen[spec.name] && (
              <ul className="relative left-0 w-full bg-background-0 dark:bg-background-100  max-h-48 overflow-auto p-2 ">
                {spec.values.map((value: string, index: number) => (
                  <li
                    key={`${spec.name}-${index}`}
                    className="flex items-center gap-2 px-3 py-1 cursor-pointer text-text-900 hover:bg-primary-100 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedValues[spec.name]?.includes(value) || false
                      }
                      onChange={() => handleSelect(spec.name, value)}
                      className="w-4 h-4 text-primary-600  border-accent-500 rounded"
                    />
                    <label className="text-[10px] md:text-sm ">{value}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SpecsSubCatDropdown;
