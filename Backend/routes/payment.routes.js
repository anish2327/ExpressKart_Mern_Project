import express from "express";
import { Router } from "express";
import {  createCheckoutSession } from "../Controller/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);

export default paymentRouter;
