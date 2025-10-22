import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import userRouter from './routes/user.routes.js'
import connectDB from './config/connectDB.js'
import dotenv from 'dotenv'
import productRouter from './routes/product.routes.js'
import paymentRouter from "./routes/payment.routes.js";
dotenv.config();





const app = express()
app.use(express.json()); // ✅ This line is essential

const allowedOrigins = process.env.FRONTEND_URL.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy : false

}))

app.use("/api",  userRouter);
app.use("/api",productRouter);
app.use("/api", paymentRouter);



const PORT = 8080 || process.env.PORT
app.get("/", (req, res) => {
    res.json({ message: "Server is running successfully 🚀" });
});


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running ", PORT)
    })


})



