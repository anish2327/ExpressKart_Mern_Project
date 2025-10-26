import express from "express";
import { Router } from "express";
import { createOrder } from "../Controller/payment.controller.js";
import { verifyPayment } from "../Controller/payment.controller.js";

const paymentRouter = Router();


paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);


export default paymentRouter;
