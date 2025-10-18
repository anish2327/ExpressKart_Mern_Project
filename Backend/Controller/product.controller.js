import productModel from "../model/Product.model.js";
import Product from "../model/Product.model.js";
import uploadImageCloudinary from "../utils/uploadimagecloudinary.js";

export async function uploadProduct(req, res) {
    try {
        console.log(req.file);
        const { name, category, price, description } = req.body;

        let imageUrl = "";
        if (req.file) { // chcek if the base64 string exist
            const result = await uploadImageCloudinary(req.file);
            imageUrl = result.secure_url;
        }

        // ✅ Create a new Product instance
        const product = new Product({
            name,
            category,
            price,
            description,
            image: imageUrl
        });

        await product.save(); // Save to MongoDB

        res.status(201).json({ message: "Product uploaded successfully", product });

    } catch (error) {
        res.status(500).json({ message: "Error uploading product", error: error.message });
    }
}

export async function getproduct(req,res){
    try {
        const products = await productModel.find({});
        res.json(products);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
        
    }
}

