import { useCategories } from "../../../Hooks/CategoriesHook";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const { categories, loading } = useCategories();

  if (loading) return <p className="text-center">Cargando categorías...</p>;

  return (
    <div className="flex justify-center p-2">
      <div className="relative w-full max-w-7xl px-2 sm:px-4">
        <p className="text-center font-bold text-[2rem]">CATEGORÍAS</p>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 py-4 min-w-max">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
