
export type imageType= 'Product'|'Banner';

export interface Iimage{
    uuid:string;
    type:imageType;
    pathfile:string;
}


export interface IproductImage{
    uuid:string;
    image:Iimage;
    isPrimary:boolean;
}