import { useNavigate } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCategories, useSubcategories } from "../../Hooks/CategoriesHook";

const SidebarCat = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) => {
  const { categories, loading: loadingCategories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cachedSubcategories, setCachedSubcategories] = useState<
    Record<string, any[]>
  >({});
  const { subcategories, loading } = useSubcategories(activeCategory);
  const navigate = useNavigate();

  const activeCategoryName =
    categories.find((cat) => cat.id === activeCategory)?.name || "";

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!loading && activeCategory && subcategories.length > 0) {
      setCachedSubcategories((prev) => ({
        ...prev,
        [activeCategory]: subcategories,
      }));
    }
  }, [loading, activeCategory, JSON.stringify(subcategories)]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[2] backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setActiveCategory(null); // Cierra el mini-sidebar
          }}
        ></div>
      )}

      {/* Sidebar principal */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-secondary-950 opacity-95 text-text-50 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out z-10 overflow-y-auto`}
      >
        {/* Botón de Cerrar */}
        <button
          onClick={() => {
            setIsOpen(false);
            setActiveCategory(null); // Cierra el mini-sidebar
          }}
          className="absolute top-3 right-3 p-2 text-accent-800 hover:text-accent-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Lista de Categorías */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-text">Categorías</h2>
          <div className="w-full h-[1px] bg-accent-800 my-4"></div>

          {loadingCategories ? (
            <p className="text-center text-text-50">Cargando categorías...</p>
          ) : categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="relative">
                  {/* Categoría */}
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )
                    }
                    className="w-full text-left text-[15px] py-3 px-4 rounded-md bg-transparent hover:bg-secondary-300 flex justify-between items-center transition-all dark:hover:text-text-900"
                  >
                    {category.name}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeCategory === category.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-text-100">
              No hay categorías disponibles.
            </p>
          )}
        </div>
      </div>

      {/* Mini-sidebar de subcategorías */}
      {activeCategory && isOpen && (
        <div className="fixed top-0 left-[300px] h-full w-[250px] bg-background-0 opacity-80 text-backgroundSid shadow-lg z-10 overflow-y-auto transition-all">
          <div className="p-4">
            <h3 className="bg-secondary-200 text-center text-text-950 font-bold text-lg py-2 px-4 rounded-br-[30px] rounded-l-[18px] ">
              {activeCategoryName}
            </h3>
            <div className="w-full h-[1px] bg-accent-950 my-3"></div>

            {loading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 m-auto border-accent-500 "></div>
            ) : (cachedSubcategories[activeCategory] ?? subcategories).length >
              0 ? (
              <ul className="space-y-3">
                {(cachedSubcategories[activeCategory] ?? subcategories).map(
                  (sub) => (
                    <li
                      key={sub.id}
                      onClick={() => {
                        navigate(`/subCategories/${sub.id}/products`);
                        setIsOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-blanco cursor-pointer transition-all"
                    >
                      {sub.name}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No hay subcategorías.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarCat;
