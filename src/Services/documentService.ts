import { fetchData } from "../Helpers/PeticionApi";
import { IDocuments } from "../Interfaces/Documents";

export const getDocuments=()=>fetchData<IDocuments[]>("/api/v1/documents","GET")

