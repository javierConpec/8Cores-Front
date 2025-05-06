import { fetchData } from "../Helpers/PeticionApi";
import { IBanner} from "../Interfaces/banners";
import { Iproduct } from "../Interfaces/product";



export const getPromotion = ()=>fetchData<IBanner[]>("/api/v1/promotions/active-promotions","GET")

export const getProductByPromotion=(promotionId:string)=>fetchData<Iproduct[]>(`/api/v1/promotions/${promotionId}/products`,"GET")