export const getsettings =(amount: number)=>({
  title: "8 Cores",
  currency: "PEN",
  amount: Math.round(amount * 100),
  //order:''
  //xculqirsaid: "Inserta aquí el id de tu llave pública RSA",
  //rsapublickey: "Inserta aquí tu llave pública RSA",
});
export const client = {
  ///email: "javierconpec@gmail.com.", 
};

export const paymentMethods = {
  // las opciones se ordenan según se configuren
  tarjeta: true,
  yape: true,
};
export const options = {
  lang: "es",
  installments: false, // Habilitar o deshabilitar el campo de cuotas
  modal: true,
  
  paymentMethods: paymentMethods,
  paymentMethodsSort: Object.keys(paymentMethods), // las opciones se ordenan según se configuren en paymentMethods
};
