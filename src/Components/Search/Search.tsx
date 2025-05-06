import React from "react";
import { LucideIcon } from "lucide-react";

interface SearchProps {
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  icon?: LucideIcon;
}

const Search: React.FC<SearchProps> = ({
  type = "text",
  value,
  placeholder,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 text-sm md:text-dm md:px-4 md:py-2 border rounded-md shadow-sm focus:outline-none bg-secondary-100"
        onKeyDown={(e) => e.key === "Enter"} // Buscar con Enter
      />
      {Icon && (
        <button className="absolute right-2 top-2 bg-transparent text-accent-900 border-none cursor-pointer">
          <Icon className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      )}
    </div>
  );
};

export default Search;
