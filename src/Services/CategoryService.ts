import { ICategory, ISubcategory } from "../Interfaces/Category";
import { fetchData } from "../Helpers/PeticionApi";


export const getCategories = () => fetchData<ICategory[]>("/api/v1/categories", "GET");


export const getSubCategories = (categoryId: string) => 
  fetchData<ISubcategory[]>(`/api/v1/categories/${categoryId}/subcategories`, "GET");
