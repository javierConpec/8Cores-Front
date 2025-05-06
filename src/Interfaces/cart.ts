import { IPrices } from "./price"

export interface ICartProduct {
    personid: string;
    productid: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  

export interface IListCart {
    id: string;
    sku: string;
    name: string;
    prices: IPrices;
    existences:{
        quantity:number,
        stockAvaliablre:number
    },
    images:string
}


export interface ISyncCart {
    personid: string;
    items: {
        productid: string;
        quantity: number;
    }[];
}


export interface ISyncCartResponse{
    id:string,
    sku:string,
    name:string,
    price:IPrices,
    existences:{
        quantity:number,
        stockAvaliablre:number
    },
    images:string[]
}

export interface IAddCart {
    personid: string;
    productid: string;
    quantity: number;
}


export interface IAddCartResponse{
    id:string,
    sku:string,
    name:string,
    price:IPrices
    existences:{
        quantity:number,
        stockAvaliablre:number
    },
    images:string[]
}

export interface IEditCart {
    personid: string;
    productid: string;
    operation: 1 | -1; 
}


export interface IEditcartResponse{
    productid:string,
    currentStock:number,
    quantity:number
}


export interface CartContextType {
  cart: IListCart[];
  loading: boolean;
  error: string | null;
  addToCart: (product: IAddCart) => Promise<void>;
  addToCartLocal:(product: IListCart) => void;
  editCartItem: (productid: string, operation: 1 | -1) => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (id: string, newQuantity: number) => void;
}
