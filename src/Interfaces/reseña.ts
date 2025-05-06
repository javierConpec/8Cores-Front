export interface IStatsByProduct{
    productId:string,
    averageRating:string,
    totalReviews:string,
    countByRating:{
        1:number,
        2:number,
        3:number,
        4:number,
        5:number
    }
}

export interface ICommentByProduct{
    id:string,
    authorId:string,
    authorName:string,
    calification:number,
    title:string,
    description:string,
}

export interface IValidate{
    personid:string,
    productid:string,
}

export interface IValidateResponse{
    hasPurchased:boolean,
    isCommentAproved:boolean,
    isCommentPending:boolean
}

export interface IPostComment{
    personid:string,
    productid:string,
    calification:number,
    title:string,
    description:string,
}

export interface IResponseComment{
    id:string,
    authorId:string,
    productId:string,
    status:string,
    calification:number,
    title:string,
    description:string
}