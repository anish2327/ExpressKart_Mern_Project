
import Razorpay from "razorpay";
import Order from "../model/Order.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
import auth from "../middleware/auth.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("CART ITEMS RECEIVED:", cartItems);

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Frontend already has total for each cart item
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    console.log("TOTAL AMOUNT:", totalAmount);

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("RAZORPAY ORDER CREATED:", order);

    // Prepare products according to Order schema
    const products = cartItems.map((item) => ({
      name: item.name || item.productName || "Product",
      price: Number(item.price || item.total / item.qty),
      qty: Number(item.qty),
    }));

    // Save order
    const savedOrder = await Order.create({
      userId: req.userId,
      products,
      totalAmount,
      razorpayOrderId: order.id,
      paymentStatus: "created",
    });

    console.log("ORDER SAVED:", savedOrder);

    return res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing",
      });
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET_KEY
      )
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Order.findOneAndUpdate(
        {
          razorpayOrderId: razorpay_order_id,
        },
        {
          paymentStatus: "paid",
          paymentId: razorpay_payment_id,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });

  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while verifying payment",
      error: err.message,
    });
  }
};