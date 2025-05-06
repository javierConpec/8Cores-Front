import { fetchData } from "../Helpers/PeticionApi";
import { Ispecs, IspecsSubCategory } from "../Interfaces/Specs";

export const getSpecsByProduct = (productId:string)=>fetchData<Ispecs[]>
(`/api/v1/specifications/product/${productId}`,"GET")

export const getSpecsBySubCategory = (subCategoryId:string)=>fetchData<IspecsSubCategory[]>
(`/api/v1/specifications/subcategory/${subCategoryId}`,"GET")

