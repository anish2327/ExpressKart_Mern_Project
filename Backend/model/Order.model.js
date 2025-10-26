import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "pending", // comment: initial state before payment confirmation
    },

    razorpayOrderId: {
      type: String, // comment: from Razorpay order creation API
    },

    razorpayPaymentId: {
      type: String, // comment: from Razorpay payment success response
    },

    razorpaySignature: {
      type: String, // comment: used for payment verification
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
