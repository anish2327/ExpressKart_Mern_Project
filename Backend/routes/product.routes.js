import { Router } from "express";
import uploadImageClodinary from "../utils/uploadimagecloudinary.js";
import upload from "../middleware/multer.js";
import { getproduct, uploadProduct } from "../Controller/product.controller.js";


const productRouter = Router();
productRouter.post("/upload", upload.single("image"), uploadProduct);
productRouter.get("/getproduct",getproduct );

export default productRouter;