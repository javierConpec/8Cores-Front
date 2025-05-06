import { useState, useRef, useEffect } from "react";
import { useSearch } from "../../Contexts/searchContext";
import { Search as SearchIcon } from "lucide-react";
import Search from "./Search";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const SearchComponent = () => {
  const { results, search } = useSearch();
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let timeoutId: ReturnType<typeof setTimeout>;

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!term.trim()) {
      setIsOpen(false);
      return;
    }

    // Debounce: Evita demasiadas peticiones
    timeoutId = setTimeout(async () => {
      await search(term);
      if (!isOpen) setIsOpen(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [term]);

  // Cierra el dropdown si el usuario hace clic afuera
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

  const handleResultClick = (item: any) => {
    const path =
      item.redirection === "subcategory"
        ? `/subcategories/${item.id}/products`
        : `/products/${item.id}`;

    navigate(path);
    setIsOpen(false); // Cierra el dropdown al hacer clic en un resultado
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Search
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar productos..."
        icon={SearchIcon}
      />

      {isOpen && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-md mt-1">
          {results.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(item)}
            >
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
