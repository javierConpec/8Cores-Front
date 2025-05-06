import { ICategory, ISubcategory } from "./Category";
import { IPrices } from "./Price";

export interface Iproduct {
    id: string;
    sku: string;
    name: string;
    stock:number;
    category:ICategory;
    description:string;
    subcategory:ISubcategory;
    prices:IPrices;
    images: string[];
  }

  export interface IProductFilter {
    subcategoryid: string;
    specs: 
    { spec_name: string; spec_value: string }[];
  }
  
  
export type SpecType = 'number' | 'string' | 'boolean' | 'double';

export interface IproductSpec{
    uuid:string;
    producto:Iproduct;
    specName:string;
    specValue:string;
    specType:SpecType;
}

export interface IInventory{
    uuid:string;
    totalstock:number;
    minstock:number;
    reserved:number;
}
