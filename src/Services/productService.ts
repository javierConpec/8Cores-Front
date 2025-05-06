import { Iproduct } from "../Interfaces/Product";
import { fetchData } from "../Helpers/PeticionApi";


export const getProduct = () => fetchData<Iproduct[]>("/api/v1/products","GET");

export const getProductTopCali=()=>fetchData<Iproduct[]>("/api/v1/products/top-rated","GET")

export const getProductByID = async (productID: string): Promise<Iproduct | null> => {
    const product = await fetchData<Iproduct>(`/api/v1/products/${productID}`,"GET",); 
    return product ?? null;};
    
export const getProductBySubCategory=(subCategoryId:string)=>fetchData<Iproduct[]>(`/api/v1/subCategories/${subCategoryId}/products`,"GET");


export const getProductsByFilter = async (
  subcategoryId: string, 
  specs: { spec_name: string; spec_value: string }[]
) => {
  try {
    const response = await fetch("/api/v1/products/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subcategoryid: subcategoryId,
        specs
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Productos filtrados:", data.data); 
    return data.data;
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
    return [];
  }
};
