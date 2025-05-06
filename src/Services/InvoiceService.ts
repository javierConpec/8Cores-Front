import { fetchData } from "../Helpers/PeticionApi";
import { IInvoice } from "../Interfaces/invoices";
import { IGenerateInvoice } from "../Interfaces/invoices";

export const validateInvoiceService = async (
  person: string,
  invoice: string
) => {
  const response = await fetch("/api/v1/invoices/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ person, invoice }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(" Error API:", errorData);
    throw new Error("invalido");
  }

  return response.json();
};

export const getInvoice = async (
  invoiceId: string
): Promise<IInvoice | null> => {
  const invoice = await fetchData<IInvoice>(
    `/api/v1/invoices/${invoiceId}/details`,
    "GET"
  );
  return invoice ?? null;
};

export const generateInvoice = async (invoice: IGenerateInvoice) => {
  try {
    const response = await fetch("/api/v1/invoices/cms/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    const data = await response.json();
    console.log("qrGenerado:", data);

    return data; 
  } catch (error) {
    console.error("Error al generar la factura:", error);
    return { success: false, message: "Error en el servidor" };
  }
};
