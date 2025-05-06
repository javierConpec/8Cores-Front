import { useNavigate } from "react-router-dom";
import { X, Trash, HandCoins } from "lucide-react";
import { useCart } from "../../Contexts/CartContextType";
import Counter from "../../Components/Cart/Counter";
import Button from "../../Components/Button/Button";

const SidebarCart = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) => {
  const { cart = [], editCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-[2] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[90%] md:w-[400px] max-w-full bg-background-100 text-text-900 shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-10 overflow-y-auto`}
      >
        {/* Botón de Cerrar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-2 text-text-800 hover:text-text-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-5">
          <h2 className="text-xl font-bold text-text-900">Tu Carrito</h2>
          <div className="w-full h-[1px] bg-background-300 my-4"></div>

          {cart.length === 0 ? (
            <p className="text-center text-text-500">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center bg-background-0 dark:bg-background-200 p-3 shadow-md rounded-lg"
                  >
                    {/* Imagen del producto */}
                    {item.images && (
                      <img
                        src={
                          Array.isArray(item.images)
                            ? item.images[0]
                            : item.images
                        }
                        className="h-[60px] w-[60px] object-cover rounded mr-3"
                        alt={item.name}
                      />
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-[15px] text-text-900 font-medium">
                        {item.name}
                      </p>

                      {Number(item.prices.currentPrice) > 0 ? (
                        <>
                          {Number(item.prices.basePrice) >
                            Number(item.prices.currentPrice) && (
                            <p className="text-[12px] text-text-500 line-through">
                              S/.{Number(item.prices.basePrice).toFixed(2)}
                            </p>
                          )}
                          <p className="text-md font-bold ">
                            S/.{Number(item.prices.currentPrice).toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-md font-bold ">
                          S/.{Number(item.prices.basePrice).toFixed(2)}
                        </p>
                      )}

                      <p className="text-sm text-text-500">
                        Cantidad: {Number(item.existences?.quantity || 0)}
                      </p>
                    </div>
                    <div>
                      <Counter
                        productId={item.id}
                        quantity={item.existences?.quantity || 0}
                        onChange={(newQuantity) => {
                          const difference =
                            newQuantity - (item.existences?.quantity || 0);
                          const operation = difference > 0 ? 1 : -1;
                          editCartItem(item.id, operation);
                        }}
                        onEditCart={(operation) =>
                          editCartItem(item.id, operation)
                        }
                      />
                    </div>
                    
                  </li>
                ))}
              </ul>

              {/* Acciones */}
              <div className="mt-3 flex flex-col gap-1">
                <Button
                  icon={<HandCoins />}
                  text="Comprar ahora"
                  onClick={() => {
                    navigate("/resumen");
                    setIsOpen(false);
                  }}
                  variant="addCart"
                />

                <Button
                  icon={<Trash />}
                  text="Vaciar carrito"
                  onClick={clearCart}
                  variant="buy"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarCart;
