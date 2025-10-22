import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../model/Order.model.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1SKsTv2KYmopSTftz16fe58b" }],

      line_items: req.body.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.qty,
      })),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

   const session = await stripe.checkout.sessions.create(params);

    // optional: save order in DB
    const totalAmount = req.body.reduce((acc, item) => acc + item.price * item.qty, 0);
    await Order.create({
      products: req.body,
      totalAmount,
      sessionId: session.id,
    });

    // ✅ new response format
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};


