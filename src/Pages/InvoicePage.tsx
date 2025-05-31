import { useParams } from "react-router-dom";
import { useValidateInvoice } from "../Hooks/InvoiceHook";
import { useInvoice } from "../Hooks/InvoiceHook";
import InfinityLoader from "../Helpers/loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../Components/Button/Button";
import { File } from "lucide-react";

const InvoicePage = () => {
  const { invoice } = useParams();
  console.log("invoice desde useParams:", invoice);
  if (!invoice) return <p>Factura no encontrada.</p>;

  const { loading: validationLoading, error } = useValidateInvoice();
  const { invoice: invoiceDetails, Loading: invoiceLoading } =
    useInvoice(invoice);

  if (invoiceLoading) return <InfinityLoader />;
  if (!invoiceDetails) return <p>No se encontró la factura.</p>;

  if (validationLoading) return <p>Validando factura...</p>;
  
  if (error) return <p>{error}</p>;

  // Función para generar el PDF
  const downloadPDF = () => {
    const invoiceElement = document.getElementById("invoiceContent");

    if (invoiceElement) {
      html2canvas(invoiceElement, {
        scale: 3, // Aumenta la resolución
        useCORS: true, // Habilita CORS
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();

        // Añadir la imagen del contenido HTML al PDF
        pdf.addImage(imgData, "PNG", 10, 10, 180, 0); // Puedes ajustar los valores de ancho y alto aquí
        pdf.save("factura.pdf");
      });
    }
  };

  return (
    <div className="bg-background-0 w-full md:w-[60%] min-h-[800px] h-full m-auto md:my-10 relative">
      {/* Botón para exportar PDF */}

      {/* Contenido de la factura que se exportará */}
      <div id="invoiceContent" className="w-full">
        <div className="flex justify-between bg-primary-100 px-10 py-5">
          <div>
            <img src="/LogoText.png" className="w-[150px] h-[50px] md:w-[250px] md:h-[100px]" />
            <h4 className="border border-background-900 p-1 pb-2 md:p-2 text-xs m-auto  md:text-lg font-semibold uppercase ">
              ORDEN: {invoiceDetails.invoice_data.invoice_id.slice(0, 18)}
            </h4>
          </div>
          <div className="w-[75px] md:w-[150px]">
            <img src={invoiceDetails.qr_data} />
          </div>
        </div>
        <div className="flex justify-between p-5 md:px-20 md:py-5">
          <div>
            <h3 className="text-sm md:text-2xl font-[900]">Datos del Cliente:</h3>
            <p className="text-xs md:text-lg text-background-400 font-[600]">
              {invoiceDetails.person_name}
            </p>
            <p className="text-xs md:text-lg text-background-400 font-[600]">
              {invoiceDetails.person_email}
            </p>
          </div>
          <div className="w-[1px] h-auto bg-background-900"></div>
          <div>
            <h3 className="text-sm md:text-2xl font-[900]">Datos de la empresa:</h3>
            <p className="text-xs md:text-lg text-background-400 font-[600] text-end">
              Atauchi Paul
            </p>
            <p className="text-xs md:text-lg text-background-400 font-[600] text-end">
              info@8cores.com
            </p>
            <p className="text-xs md:text-lg text-background-400 font-[600] text-end">
              934-234-321
            </p>
            <p className="text-xs md:text-lg text-background-400 font-[600] text-end">
              Av.Fray A. Alcalde 10 <br />
              44160, Jir. Bolht, Jal., Perú
            </p>
          </div>
        </div>
        <div className="w-[95%] m-auto my-10">
          <div className="flex font-bold border border-text-900 h-[30px] pb-2 md:p-0 md:h-[40px] text-xs md:text-xl">
            <div className="w-[30%] m-auto text-center">ID</div>
            <div className="w-[30%] m-auto text-center">Producto</div>

            <div className="w-[10%] m-auto text-center hidden md:flex ">Cantidad</div>
            <div className="w-[15%] m-auto text-center md:hidden">Cant.</div>
            <div className="w-[15%] m-auto text-center">Precio</div>
            <div className="w-[15%] m-auto text-center">Total</div>
          </div>

          {invoiceDetails.items_data.map((item, index) => (
            <div
              key={index}
              className={`flex h-[50px] text-xs md:text-lg p-2 relative ${
                index % 2 === 0 ? "bg-background-50" : "bg-background-0"
              }`}
            >
              <div className="w-[30%] m-auto  text-center">
                {item.product_id.slice(0, 20)}
              </div>
              <div className="w-[30%] text-center">{item.name}</div>

              <div className="w-[10%] m-auto text-center">{item.quantity}</div>
              <div className="w-[15%] m-auto text-center">S/ {item.unit_price}</div>
              <div className="w-[15%] m-auto text-center">S/ {item.total_price}</div>
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <p className="border border-text-900 text-end mx-10 px-10 py-2 text-xs md:text-xl font-[700]">
              Total: S/ {invoiceDetails.invoice_data.total_amount}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <p className="text-sm md:text-lg text-text-400 font-[600] mx-3 my-2">
              {invoiceDetails.invoice_data.created.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <div className="m-auto w-[150px]">
        <Button
          onClick={downloadPDF}
          text="Descargar"
          type="button"
          variant="buy"
          icon={<File />}
        />
      </div>
    </div>
  );
};

export default InvoicePage;
