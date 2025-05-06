import { fetchData } from "../Helpers/PeticionApi";
import { IDocuments } from "../Interfaces/documents";

export const getDocuments=()=>fetchData<IDocuments[]>("/api/v1/documents","GET")

