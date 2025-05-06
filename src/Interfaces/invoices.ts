
export interface IInvoice {
      person_name: string;
      person_email: string;
      order_data: {
        created: string;
        order_id: string;
      };
      invoice_data: {
        created: string;
        invoice_id: string;
        total_amount: number;
      };
      items_data: {
        name: string;
        quantity: number;
        product_id: string;
        unit_price: number;
        description: string;
        total_price: number;
      }[];
      qr_data: string;
      is_valid: boolean;
}
  
  
export interface IPayData{
  amount:string;
  email:string;
  source_id:string;
  metadata:{
    documentNumber:string;
  }
}

export interface IGenerateInvoice{
  personid:string;
  origin:string;
  payment:IPayData;
}