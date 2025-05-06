import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../Interfaces/category";

interface Props {
  category: ICategory;
}

const CategoryCard = ({ category }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6">
      <div
        className="cursor-pointer border rounded-full w-44 h-44 mx-auto overflow-hidden 
                   transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-gray-400"
        onClick={() => navigate(`/category/${category.id}`)}
      ></div>
      <p
        className="text-black text-center uppercase mt-2 text-sm font-semibold 
                    opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        {category.name}
      </p>
    </div>
  );
};

export default CategoryCard;
