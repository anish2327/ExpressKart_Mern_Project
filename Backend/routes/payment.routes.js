import express from "express";
import { Router } from "express";
import { createOrder } from "../Controller/payment.controller.js";
import { verifyPayment } from "../Controller/payment.controller.js";
import auth from "../middleware/auth.js";
import { getMyOrders } from "../Controller/order.controller.js";

const paymentRouter = Router();


paymentRouter.post("/create-order",auth, createOrder);
paymentRouter.post("/verify-payment", verifyPayment);
paymentRouter.get("/my-orders", auth, getMyOrders);


export default paymentRouter;
