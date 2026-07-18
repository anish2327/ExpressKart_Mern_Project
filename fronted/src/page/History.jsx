import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/my-orders`, {
          method: "GET",
          credentials: "include", // ✅ zaroori — cookies ke liye
        });
        const result = await response.json();

        if (result.success) {
          setOrders(result.orders);
        } else {
          toast.error("Failed to load order history");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders yet. Start shopping!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            <ul className="text-sm text-gray-700 mb-2">
              {order.products.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty} — ₹{item.price * item.qty}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-2">
              <span className="font-semibold">Total: ₹{order.totalAmount}</span>
              <span className="text-xs text-gray-400">Order ID: {order.razorpayOrderId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;