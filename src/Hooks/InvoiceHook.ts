import { useEffect, useState } from "react";
import { getInvoice, validateInvoiceService } from "../Services/InvoiceService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { IInvoice } from "../Interfaces/Invoices";

// Validar Invoice con retraso de 5 segundos
export const useValidateInvoice = () => {
  const { invoice } = useParams(); // Obtener el ID de la factura desde la URL
  const { user, loading: userLoading } = useAuth(); // Obtener el usuario logueado
  const person = user?.sid;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("idPerson:", person);
  console.log("idInvoice:", invoice);

  useEffect(() => {
    // Esperar a que el usuario esté cargado antes de proceder
    if (userLoading) return;

    const validateInvoice = async () => {
      if (!person || !invoice) {
        setLoading(false);
        setError("Datos faltantes");
        return;
      }

      try {
        await validateInvoiceService(person, invoice);
        setLoading(false);
      } catch (err) {
        setError("No tienes acceso a esta factura.");
        setLoading(false);
        navigate("/home"); // Redirige si falla la validación
      }
    };

    validateInvoice();
  }, [person, invoice, navigate, userLoading]); // Dependencias para reejecutar cuando cambien

  return { loading, error };
};
// Obtener Invoice
export const useInvoice = (invoiceId: string) => {
  const [invoice, setInvoice] = useState<IInvoice | null>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!invoiceId) return;
      try {
        const InvoiceData = await getInvoice(invoiceId);
        if (Array.isArray(InvoiceData) && InvoiceData.length > 0) {
          setInvoice(InvoiceData[0]);
        } else {
          setInvoice(InvoiceData);
        }
      } catch (error) {
        console.error("❌ Error al obtener invoice:", error);
        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  return { invoice, Loading };
};
