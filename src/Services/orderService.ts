import { fetchData } from "../Helpers/PeticionApi";
import { IResponseOrder } from "../Interfaces/Order";

export const getOrders=(personId:string)=>fetchData<IResponseOrder[]>(`/api/v1/orders/person/${personId}`,"GET")