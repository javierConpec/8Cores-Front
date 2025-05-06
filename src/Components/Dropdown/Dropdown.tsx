import { useState, useEffect, useRef } from "react";
import { ChevronDown, User } from "lucide-react";

interface Option {
  id: number;
  name: string;
  path?: string;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  onSelect: (selected: Option) => void;
  variant?: "default" | "Auth";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Seleccionar",
  onSelect,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  // Estilos según la variante seleccionada
  const buttonStyles = {
    default:
      "bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500",
    Auth: "bg-transparent ml-1 rounded-lg p-2 text-sm hover:bg-secondary-100 text-accent-900 lg:w-[160px] 2xl:w-[180px] hidden md:flex",
  };

  const icons = {
    default: (
      <ChevronDown
        className={`ml-2 w-5 h-5 transition-transform duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    ),
    Auth: <User className="w-7 h-7 mr-1   text-accent-900" />,
  };

  return (
    <div className="relative ml-2" ref={dropdownRef}>
      {/* Botón del Dropdown */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center transition ${buttonStyles[variant]}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Seleccionar opción"
      >
        {icons[variant]}
        <span className="text-sm">{selected?.name || placeholder}</span>
      </button>

      {/* Lista de Opciones */}
      {isOpen && (
        <ul
          className="absolute left-0 bg-background-50 lg:w-[160px] 2xl:w-[180px] shadow-lg z-50 overflow-auto max-h-48 transition-opacity duration-200 ease-in-out"
          role="listbox"
        >
          {options.length === 0 ? (
            <li className="px-4 py-2 text-text-500 text-sm">No hay opciones</li>
          ) : (
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className="text-sm px-4 py-2 text-text-900 hover:bg-text-100 cursor-pointer"
                role="option"
              >
                {option.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
