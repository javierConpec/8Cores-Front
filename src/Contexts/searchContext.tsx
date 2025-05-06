import { createContext, useContext, useState } from "react";
import { searchProducts } from "../Services/SearchService";

interface SearchContextProps {
  results: any[];
  search: (term: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState<any[]>([]); 

  const search = async (term: string) => {
    const products = await searchProducts(term);
    setResults(products);
  };

  return (
    <SearchContext.Provider value={{ results, search }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe usarse dentro de un SearchProvider");
  }
  return context;
};
