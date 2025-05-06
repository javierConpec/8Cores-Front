import { fetchData } from "../Helpers/PeticionApi";
import { Iproduct } from "../Interfaces/product";

export const searchProducts = async (term: string): Promise<Iproduct[]> => {
  try {
    const response = await fetchData(`/api/v1/products/search?term=${term}`);
    
    if (!response || !response) {
      return [];
    }

    return response as Iproduct[];
  } catch (error) {
    console.error("No se obtuvo nada: ", error);
    return [];
  }
};
