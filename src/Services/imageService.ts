import { IproductImage } from "../Interfaces/Image";
import { fetchData } from "../Helpers/PeticionApi";

export const getProductImage = (productId: string) => fetchData<IproductImage[]>(`/api/v1/image/${productId}/productImage`,"GET");
