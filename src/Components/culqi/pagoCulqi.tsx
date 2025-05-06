import { useState, useEffect } from "react";
import { client, getsettings, options } from "./ConfigCulqi";
import { appearance } from "./ConfigUI";
import { closeCheckOut } from "../../Services/CartService";
import { useAuth } from "../../Contexts/AuthContext";
import { useToast } from "../../Contexts/ToastContext";
import { IGenerateInvoice } from "../../Interfaces/Invoices";
import { generateInvoice } from "../../Services/InvoiceService";

declare global {
  interface Window {
    CulqiCheckout: any;
  }
}

export const useCulqiCheckout = (amount:number) => {
  const [culqiLoaded, setCulqiLoaded] = useState(false);
  const [qrInfo, setQRInfo]=useState<{id:string; qr:string}|null>(null)
  const { user } = useAuth();
  const { showToast } = useToast();
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.culqi.com/checkout-js";
    script.async = true;

    script.onload = () => {
      // Ahora que el script ha cargado, podemos inicializar Culqi
      const config = {
        settings:getsettings(amount),
        client,
        options,
        appearance,
        events: {
          onclose: async () => {
            console.log("El popup de culqi se cerro uwu");
            if (user?.sid) {
              await closeCheckOut(user.sid);
            }
          },
        },
      };

      const publicKey = "pk_test_NqL58Uwpn6Qus7Qi"; // Reemplaza con tu llave pública
      const culqiInstance = new window.CulqiCheckout(publicKey, config);

      // Guardamos la instancia globalmente para usarla en cualquier parte
      window.Culqi = culqiInstance;

      // Actualizamos el estado a true cuando Culqi se haya cargado
      setCulqiLoaded(true);

      // Usamos la función correcta para manejar los eventos
      culqiInstance.culqi = async () => {
        try {
          event?.preventDefault?.();
      
          const token = culqiInstance?.token?.id;
          if (!token) throw new Error("Token no recibido desde Culqi");
      
          if (!user?.sid || !user?.email) throw new Error("Datos de usuario incompletos");
      
          const invoice: IGenerateInvoice = {
            personid: user.sid,
            origin: "Online",
            payment: {
              amount: (amount * 100).toString(),
              email: user.email,
              source_id: token,
              metadata: {
                documentNumber: user.iat?.toString() || "",
              },
            },
          };
      
          console.log("🔁 Enviando datos a generateInvoice:", invoice);
          const data = await generateInvoice(invoice);
          console.log("✅ Respuesta de generateInvoice:", data);
      
          if (data?.success) {
            showToast("success", "¡La compra fue exitosa!");
            const id=data?.data?.result;
            const qr =data?.data?.qrcode;

            if(id && qr){
              setQRInfo({id,qr});
            }

            window.Culqi.close();
            //navigate("/home");
            //location.reload();
          } else {
            console.error("❌ Error en respuesta de invoice:", data?.message || "Respuesta sin mensaje");
          }
        } catch (error: any) {
          console.error("❌ Excepción al generar la factura:", error?.message || error);
        }
      };
    };

    // Insertamos el script en el body para cargarlo
    document.body.appendChild(script);

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(script);
    };
  }, [amount]);

  const openCheckout = () => {
    if (window.Culqi && culqiLoaded) {
      window.Culqi.open();
    } else {
      console.error("❌ Culqi aún no ha sido cargado.");
    }
  };

  return { openCheckout, qrInfo, setQRInfo };
};