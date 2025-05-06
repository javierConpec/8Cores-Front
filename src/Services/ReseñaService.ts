import { fetchData } from "../Helpers/PeticionApi";
import { ICommentByProduct, IPostComment, IResponseComment, IStatsByProduct, IValidate, IValidateResponse } from "../Interfaces/Reseña";

export const getStats = (productId:string)=>fetchData<IStatsByProduct>
(`/api/v1/comments/product/${productId}/stats`,"GET")

export const getComments = (productId: string) => 
    fetchData<ICommentByProduct[]>(`/api/v1/comments/product/${productId}/`, "GET");

export const validate = (data: IValidate): Promise<IValidateResponse> => 
    fetchData<IValidateResponse>("/api/v1/comments/validate", "POST", data);
  
export const postComment = (data:IPostComment):Promise<IResponseComment>=>
    fetchData<IResponseComment>("/api/v1/comments/cms","POST",data)