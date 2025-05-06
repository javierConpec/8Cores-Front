import { HandCoins, OctagonX } from "lucide-react";
import Button from "../../../Components/Button/Button";
import { useCart } from "../../../Contexts/CartContextType";
import { useCheckout } from "../../../Hooks/CheckOutHook";
import { useCulqiCheckout } from "../../../Components/culqi/PagoCulqi";
import { useAuth } from "../../../Contexts/AuthContext";
import Modal from "../../../Components/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart = [] } = useCart();
  const navigate = useNavigate();
  const { handleCheckout } = useCheckout();

  const { user } = useAuth();

  const total = cart.reduce((acc, item) => {
    const price =
      Number(item.prices?.currentPrice) > 0
        ? Number(item.prices.currentPrice)
        : Number(item.prices?.basePrice || 0);
    const quantity = Number(item.existences?.quantity || 0);
    return acc + price * quantity;
  }, 0);
  const { openCheckout, qrInfo, setQRInfo } = useCulqiCheckout(total);

  return (
    <div className=" bg-transparent my-4 mr-4 p-2 w-full md:w-[30%]">
      <h2 className="text-lg text-text-900 font-semibold mb-4">Resumen</h2>
      <div className="bg-background-0 dark:bg-background-100 p-4">
        <div className="flex justify-between text-text-700 text-sm mb-2">
          <span>Subtotal</span>
          <span className="font-semibold">S/ {total.toFixed(2)}</span>
        </div>

        <hr className="border-text-300 mb-2" />
        <div className="flex justify-between text-lg text-text-900 font-semibold mb-4">
          <span>Total</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        <Button
          id="btn_pagar"
          icon={<HandCoins />}
          text="Comprar ahora"
          onClick={async () => {
            if (!user) {
              setIsModalOpen(true);
              return;
            }

            await handleCheckout();
            openCheckout();
          }}
          variant="buy"
        />

        {qrInfo && (
          <Modal isOpen={true} onClose={() => setQRInfo(null)}>
            <div className="p-3 md:p-6 text-center ">
              <h2 className="text-xl font-bold text-green-600">
                ¡Compra exitosa!
              </h2>
              <p className="mb-4 text-text-700">Escanea tu factura:</p>
              <img
                src={qrInfo.qr}
                alt="QR de la factura"
                className="w-48 h-48 mx-auto border rounded"
              />
              <div className="flex justify-between">
              <button
                className="mt-4 bg-accent-600 text-text-100 text-xs md:text-md px-2 px-4 py-2 rounded-xl"
                onClick={() => {
                  setQRInfo(null);
                  navigate("/home");
                  location.reload()
                }}
              >
                seguir comprando
              </button>
              <button
                className="mt-4 bg-accent-600 text-text-100 text-xs md:text-md px-4 py-2 rounded-xl"
                onClick={() => {
                  setQRInfo(null);
                  window.open(`localhost:5473/profile/invoice/${qrInfo.id}`, "_blank");
                  location.reload()
                }}
              >
                ¡Visualizalo Aqui!
              </button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* Modal fuera del onClick */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/login");
        }}
        autoClose={true}
      >
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <OctagonX className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            No puedes seguir con el procedimiento
          </h2>
          <p className="text-gray-500">
            Para poder realizar la compra, necesitas estar logueado.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CartSummary;
