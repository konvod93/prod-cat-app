// Orders tab component to display user's order history

import { useOrders } from "../../hooks/useOrders";
import { getOrderStatus, formatProductPrice } from "../../functions";
import { statusColors } from "../../constants";
import { useState, useEffect } from "react";

const OrdersTab = () => {
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    setOrdersLoading(true);
    getOrders().then((data) => {
      setOrders(data);
      setOrdersLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Історія замовлень
      </h2>
      {ordersLoading ? (
        <p className="text-gray-400 text-sm">Завантаження...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400 text-sm">Замовлень доки немає</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = getOrderStatus(order.created_at);
            return (
              <div
                key={order.id}
                className="border rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    Замовлення №{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("ru-RU")} ·{" "}
                    {order.items.length} товару
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="font-semibold text-gray-800">
                    {formatProductPrice(order.total)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
