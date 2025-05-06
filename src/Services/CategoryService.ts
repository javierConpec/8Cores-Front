import { ICategory, ISubcategory } from "../Interfaces/category";
import { fetchData } from "../Helpers/PeticionApi";


export const getCategories = () => fetchData<ICategory[]>("https://store8cores.onrender.com/api/v1/categories", "GET");


export const getSubCategories = (categoryId: string) => 
  fetchData<ISubcategory[]>(`https://store8cores.onrender.com/api/v1/categories/${categoryId}/subcategories`, "GET");
