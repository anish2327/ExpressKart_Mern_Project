// controller/order.controller.js (ya jahan bhi Order controllers hain)
import Order from "../model/Order.model.js";
import dotenv from "dotenv";
dotenv.config(); 

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
    });
  }
};