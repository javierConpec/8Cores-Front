import { useAuth } from "../Contexts/AuthContext";
import { useOrders } from "../Hooks/OrderHook";
import InfinityLoader from "../Helpers/Loader";
import SidebarAuth from "./Sidebar/AuthSid";

const OrdersList = () => {
  const { user } = useAuth();
  const { order, loading, error } = useOrders(user?.sid || null);

  if (loading) return <InfinityLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex mt-8 gap-3 mx-5">
      <SidebarAuth />
      <div className="bg-background-0 dark:bg-background-100 shadow-2xl  rounded-lg p-4 w-full">
        <h2 className="text-3xl text-text-800 font-bold mb-4">Mis Pedidos</h2>
        {order.map((ord) => {
          return (
            <div key={ord.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between text-text-900 text-sm border-b  pb-2 mb-2">
                <span>
                  <strong>Fecha de Pedido:</strong>{" "}
                  {ord.createdAt?.slice(0, 10) || "Fecha no disponible"}
                </span>
                <span className="text-text-800">
                  Total:{" "}
                  <strong className="text-text-700">S/ {ord.total}</strong>
                </span>
              </div>
              <div className="text-text-800">
                <p>
                  <strong>ID:</strong> {ord.id}
                </p>
                <p>
                  <strong>Origen: </strong>
                  {ord.origin}
                </p>
                <p>
                  <strong>Metodo de Pago: </strong>
                  {ord.paymentMethod}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersList;
