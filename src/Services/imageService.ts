import { IproductImage } from "../Interfaces/image";
import { fetchData } from "../Helpers/PeticionApi";

export const getProductImage = (productId: string) => fetchData<IproductImage[]>(`/api/v1/image/${productId}/productImage`,"GET");
