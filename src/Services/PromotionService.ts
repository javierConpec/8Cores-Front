import { fetchData } from "../Helpers/PeticionApi";
import { IBanner} from "../Interfaces/Banners";
import { Iproduct } from "../Interfaces/Product";



export const getPromotion = ()=>fetchData<IBanner[]>("/api/v1/promotions/active-promotions","GET")

export const getProductByPromotion=(promotionId:string)=>fetchData<Iproduct[]>(`/api/v1/promotions/${promotionId}/products`,"GET")