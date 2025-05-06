export interface IAuthLogin {
    email: string;
    pass: string;
  }
  
  export interface IAuthRegister {
    firstname: string;
    middlename?: string | null; 
    lastname: string;
    documentid:string;
    documentnumber:string;
    phonenumber:string;
    email: string;
    pass: string;
    address?:string;
  }
  
  export interface IAuthResponse {
    id: string;
    firstname: string;
    middlename?: string | null;
    lastname: string;
    email: string;
    token: string;
    lastLogin?: string | null; 
    comparation?: string | null; 
  }
  
  export interface IAuthLogueado {
    success: boolean;
    code: number;
    message: string;
    error: any;
    data: {
      ident: string;  
      email: string;
      exp: number;
      iat: number;
      origin: string;
      sid: string;
    };
  }

  export interface IChangePass{
    email:string;
  }

  export interface IUser{
    firstname?:string;
    middlename?:string;
    lastname?:string;
    documentId?:string,
    documentnumber?:string;
    phonenumber?:string;
    email?:string;
    address?:string
  }

  export interface IUpdateUser{
    firstname?:string;
    middlename?:string;
    lastname?:string;
    documentId?:string,
    documentnumber?:string;
    phonenumber?:string;
    email?:string;
    address?:string
  }