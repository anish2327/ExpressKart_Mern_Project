import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
    default: "pending",
  },
  sessionId: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;