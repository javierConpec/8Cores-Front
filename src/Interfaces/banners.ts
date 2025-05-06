import { Iimage } from "./image";

export interface IPromotion{
    uuid:number;
    image:Iimage;
    title:string;
}

export interface IBanner{
    id:string;
    bannerId:string;
    bannerPath:string;
    phrasetitle:string;
    phrase:string;
    startdate:string;
    enddate:string;
}