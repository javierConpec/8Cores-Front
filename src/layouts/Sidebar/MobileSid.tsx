import { UserCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategories, useSubcategories } from "../../Hooks/CategoriesHook";
import { useState } from "react";

interface MobileSidebarProps {
  menuMobilOpen: boolean;
  setMenuMobilOpen: (open: boolean) => void;
  user: any;
  options: { id: number; name: string; path: string }[];
  logout: () => void | Promise<void>;
}

const MobileSidebar = ({ menuMobilOpen, setMenuMobilOpen, user, options, logout }: MobileSidebarProps) => {
  const navigate = useNavigate();
  const { categories, loading: loadingCategories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { subcategories, loading: loadingSubcategories } = useSubcategories(activeCategory);

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(prev => (prev === categoryId ? null : categoryId));
  };

  if (!menuMobilOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
      <div className="fixed top-0 left-0 w-full h-full bg-background-100 p-4 shadow-lg flex flex-col gap-4 overflow-y-auto">
        {/* Encabezado */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center space-x-2">
            <UserCircle className="w-10 h-10 text-text-900" />
            <p className="font-bold text-text-900">{user ? user.ident : "Mi Cuenta"}</p>
          </div>
          <button className="mb-4" onClick={() => setMenuMobilOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Opciones de usuario */}
        <div className="flex flex-col gap-2">
          {options.map((option) =>
            option.id === 3 ? (
              <button
                key={option.id}
                onClick={async () => {
                  await logout();
                  navigate("/home");
                  window.location.reload();
                }}
                className="text-accent-900 hover:underline text-left"
              >
                {option.name}
              </button>
            ) : (
              <a
                key={option.id}
                href={option.path}
                className="text-accent-900 hover:underline"
                onClick={() => setMenuMobilOpen(false)}
              >
                {option.name}
              </a>
            )
          )}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-secondary-300 my-4"></div>

        {/* Categorías y subcategorías */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-accent-900 mb-2">Categorías</p>
          {loadingCategories ? (
            <p className="text-gray-500">Cargando categorías...</p>
          ) : (
            categories.map((category: any) => (
              <div key={category.id} className="flex flex-col">
                <button
                  className="flex justify-between items-center text-left text-accent-900 hover:bg-background-200 rounded-lg p-2"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                  {activeCategory === category.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Subcategorías */}
                {activeCategory === category.id && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {loadingSubcategories ? (
                      <p className="text-gray-500 text-sm">Cargando subcategorías...</p>
                    ) : (
                      subcategories.map((sub: any) => (
                        <a
                          key={sub.id}
                          href={`/subCategories/${sub.id}/products`}
                          className="text-sm text-text-900 font-semibold hover:bg-background-200 rounded-lg p-1.5"
                          onClick={() => setMenuMobilOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
