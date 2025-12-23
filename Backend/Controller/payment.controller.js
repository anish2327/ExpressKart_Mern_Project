import Razorpay from "razorpay";
import Order from "../model/Order.model.js";
import dotenv from "dotenv";
import crypto from "crypto";


dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
export const createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    await Order.create({
      products: cartItems,
      totalAmount,
      razorpayOrderId: order.id,
      paymentStatus: "created",
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};



export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment details missing" });
    }

    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "paid", paymentId: razorpay_payment_id }
      );
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ success: false, message: "Server error while verifying payment" });
  }
};
