// DocumentDropdown.tsx
import { useState, useEffect, useRef } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { useDocuments } from "../../Hooks/DocumentHook";
import { IDocuments } from "../../Interfaces/documents";

interface DocumentDropdownProps {
  onSelect: (selected: IDocuments) => void;
}

const DocumentDropdown: React.FC<DocumentDropdownProps> = ({ onSelect }) => {
  const { documents, loading } = useDocuments(); // Usamos el hook aquí
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<IDocuments | null>(null);
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

  const handleSelect = (document: IDocuments) => {
    setSelected(document);
    setIsOpen(false);
    onSelect(document);
  };

  const buttonStyles =
    "bg-background-0 dark:bg-background-200  border border-text-300 p-2 rounded-lg shadow-sm hover:bg-text-100 focus:ring-2 focus:ring-accent-500";
  const icon = <FileText className="md:ml-2 w-4 h-4  text-background-600" />;

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 w-[140px] md:w-[170px] transition ${buttonStyles}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Seleccionar"
        type="button"
      >
        {icon}
        <span className="text-xs md:text-md text-text-700">{selected?.name || "Seleccionar"}</span>
        <ChevronDown
          className={`my-1 w-4 h-4 text-text-900  transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 bg-background-0 dark:bg-background-200 w-full shadow-lg z-50 overflow-auto max-h-48 transition-opacity duration-200 ease-in-out"
          role="listbox"
        >
          {loading ? (
            <li className="px-4 py-2 text-text-500 text-sm">Cargando...</li>
          ) : documents.length === 0 ? (
            <li className="px-4 py-2 text-gray-500 text-sm">
              No hay documentos
            </li>
          ) : (
            documents.map((document) => (
              <li
                key={document.id}
                onClick={() => handleSelect(document)}
                className="text-sm text-text-900 text-left px-4 py-2 hover:bg-primary-100 cursor-pointer"
                role="option"
              >
                {document.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default DocumentDropdown;
