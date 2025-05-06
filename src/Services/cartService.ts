import { IAddCartResponse, IEditCart, IEditcartResponse, IListCart } from "../Interfaces/Cart";
import { fetchData } from "../Helpers/PeticionApi";

export const getCartByPerson = async (personId: string): Promise<IListCart[]> => {
  try {
      const cart = await fetchData<IListCart[]>(`/api/v1/carts/person/${personId}`, "GET");
      console.log("Carrito actualizado:", cart);
      return cart;
  } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return [];
  }
};

export const postCart = async (personid: string, productid: string, quantity: number): 
Promise<IAddCartResponse | null> => {
    try {
        const response = await fetchData<IAddCartResponse>(
            "/api/v1/carts/single",
            "POST",
            { personid, productid, quantity }
        );

        console.log(" Producto añadido:", response);

       
        const updatedCart = await getCartByPerson(personid);
        console.log(" Nuevo carrito después de añadir producto:", updatedCart);

        return response;
    } catch (error) {
        console.error(" Error al añadir al carrito:", error);
        return null; 
    }
};


export const editCart = async (cartData: IEditCart): Promise<IEditcartResponse | null> => {
  console.log(" Enviando solicitud PATCH con:", cartData);

  try {
      const response = await fetchData<IEditcartResponse>(
          "/api/v1/carts/single",
          "PATCH",
          cartData
      );

      console.log("Producto editado:", response);
      return response;
  } catch (error: any) {
      console.error("Error al editar carrito:", error);

      if (error.response?.status === 404) {
          console.warn("El producto ya no está en el carrito, recargando...");

          
          const updatedCart = await getCartByPerson(cartData.personid);
          console.log("Nuevo carrito después del error 404:", updatedCart);
          
          return null;
      }

      throw error;
  }
};

export const syncCart = async (personid: string, items: { productid: string; quantity: number }[]) => {
  if (!items || items.length === 0) {
    console.warn(" No hay productos en el carrito local. No se sincroniza.");
    return;
  }
  const payload = { personid, items }; 
  console.log("Enviando carrito a la API:", payload);
  try {
    const response = await fetch("/api/v1/carts/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al sincronizar: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Carrito sincronizado con éxito:", result);
    return result;
  } catch (error) {
    console.error("Error al sincronizar carrito:", error);
    throw error;
  }
};

export const vaciarCart = async (personId:string): Promise<boolean>=>{
  try{
    const response = await fetchData(`/api/v1/carts/single/${personId}`,"DELETE");
    console.log("Se vacio el carrito: ",response)
    return true;
  }catch(error){
    console.error("Error al  vaciar carrito", error);
    return false;
  } 
}

export const startCheckOut = async(personId:string)=>{
  const checkOut = await fetchData<IListCart[]>(`/api/v1/carts/person/${personId}/checkout`, "POST");
  console.log("se inicio con el proceso de checkOut", checkOut)
}

export const closeCheckOut = async(personId:string)=>{
  const closeCheckOut=await fetchData<IListCart[]>(`/api/v1/carts/person/${personId}/checkout/close`,"POST");
  console.log("se termino proceso de checkOut",closeCheckOut)
}