import { useCart } from "../../Contexts/CartContextType";
import Counter from "../../Components/Cart/Counter";

const ResumenCart = () => {
  const { cart = [], editCartItem } = useCart();

  return (
    <div className="md:my-4 md:ml-4 md:p-2 w-full md:w-[70%] bg-transparent">
      <h2 className="text-sm md:text-lg text-text-900 font-semibold mb-4">
        Carrito de Compras ({cart.length} productos)
      </h2>
      {/*Mobile */}
      <div className="block bg-background-0 dark:bg-background-100 md:hidden p-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 border-b border-text-300 pb-2"
          >
            {item.images && (
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.images}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover m-auto  rounded bg-background-100"
              />
            )}
            <div className="flex-2">
              <p className="text-sm font-semibold text-text-900">{item.name}</p>
              <p className="text-[12px] text-text-500">SKU: {item.sku}</p>

              <div className="mt-1">
                {Number(item.prices.currentPrice) > 0 ? (
                  <>
                    {Number(item.prices.basePrice) >
                      Number(item.prices.currentPrice) && (
                      <p className="text-[10px] text-text-500 line-through">
                        S/.{Number(item.prices.basePrice).toFixed(2)}
                      </p>
                    )}
                    <p className="text-sm font-bold text-text-700">
                      S/.{Number(item.prices.currentPrice).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-bold text-text-700">
                    S/.{Number(item.prices.basePrice).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="mt-2 flex justify-between items-center">
                <Counter
                  productId={item.id}
                  quantity={item.existences?.quantity || 0}
                  onChange={(newQuantity) =>
                    console.log("Nueva cantidad:", newQuantity)
                  }
                  onEditCart={(operation) => editCartItem(item.id, operation)}
                />
                <p className="p-2 font-bold mr-5  text-text-700">
                  S/{" "}
                  {(
                    Number(
                      Number(item.prices?.currentPrice) > 0
                        ? item.prices.currentPrice
                        : item.prices.basePrice
                    ) * Number(item.existences?.quantity || 0)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*PC */}

      <table className="hidden md:table w-full bg-background-0 dark:bg-background-100">
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b border-text-300">
              <td className="w-[80px] h-[80px]">
                {item.images && (
                  <img
                    src={
                      Array.isArray(item.images) ? item.images[0] : item.images
                    }
                    alt={item.name}
                    className="w-[80px] h-[80px] object-cover rounded bg-background-100"
                  />
                )}
              </td>
              <td className="font-semibold text-text-700">
                {item.name}
              </td>
              <td className="p-2 text-text-700">
                {item.sku}
              </td>
              <td className="p-2  font-semibold text-text-700">
                {Number(item.prices.currentPrice) > 0 ? (
                  <>
                    {Number(item.prices.basePrice) >
                      Number(item.prices.currentPrice) && (
                      <p className="text-[12px] text-text-700 line-through">
                        S/.{Number(item.prices.basePrice).toFixed(2)}
                      </p>
                    )}
                    <p className="text-md font-bold text-text-700">
                      S/.{Number(item.prices.currentPrice).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-md font-bold text-text-700 ">
                    S/.{Number(item.prices.basePrice).toFixed(2)}
                  </p>
                )}
              </td>
              <td className="p-2">
                <Counter
                  productId={item.id}
                  quantity={item.existences?.quantity || 0}
                  onChange={(newQuantity) =>
                    console.log("Nueva cantidad:", newQuantity)
                  }
                  onEditCart={(operation) => editCartItem(item.id, operation)}
                />
              </td>
              <td className="p-2 font-bold text-text-700">
                S/{" "}
                {(
                  Number(
                    Number(item.prices?.currentPrice) > 0
                      ? item.prices.currentPrice
                      : item.prices.basePrice
                  ) * Number(item.existences?.quantity || 0)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumenCart;
