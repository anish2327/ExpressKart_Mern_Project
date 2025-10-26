
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty.gif";
import { increaseQty, decreaseQty, deleteCartItem } from "../redux/productSlide.js";

// Dynamic Razorpay loader
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Cart = () => {
  const dispatch = useDispatch();
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    house: localStorage.getItem("savedLocation") || "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

  const handlePayment = async () => {
    if (!user?.email) {
      toast("You are not logged in!");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    if (!address.fullName || !address.phone || !address.house) {
      toast.error("Please fill all delivery address fields!");
      return;
    }
    if (totalPrice < 50) {
      toast.error("Minimum payment is ₹50");
      return;
    }

    const res = await loadRazorpay();
    if (!res || !window.Razorpay) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: productCartItem }),
      });
      const data = await orderRes.json();
      if (!data.id) return toast.error("Order creation failed!");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "SpeedoMart",
        order_id: data.id,
        handler: async (response) => {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment successful!");
            navigate("/success");
          } else {
            toast.error("Payment verification failed!");
            navigate("/cancel");
          }
        },
        prefill: {
          name: address.fullName,
          email: user.email,
          contact: address.phone,
        },
        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items</h2>

      {productCartItem.length > 0 ? (
        <div className="my-4 flex gap-3">
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                {...el}
                onIncrease={() => dispatch(increaseQty(el._id))}
                onDecrease={() => dispatch(decreaseQty(el._id))}
                onDelete={() => dispatch(deleteCartItem(el._id))}
              />
            ))}
          </div>

          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-slate-700">Delivery Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="border p-2 rounded w-full mb-2"
              />
              <textarea
                placeholder="Full Delivery Address"
                value={address.house}
                onChange={(e) => setAddress({ ...address, house: e.target.value })}
                className="border p-2 rounded w-full mb-4 h-20"
              />
            </div>

            <button
              className="bg-red-500 w-full text-lg font-bold py-2 text-white"
              onClick={handlePayment}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          <img src={emptyCartImage} className="w-full max-w-sm" />
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
