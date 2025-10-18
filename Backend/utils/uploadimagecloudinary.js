import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadImageCloudinary = async(image)=>{
    const buffer = image.buffer; 

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { 
                folder: "SPEEDOMART",
                // Specify resource_type to prevent errors if Mimetype is tricky
                resource_type: 'auto'
            }, 
            (error, uploadResult) => {
                if (error) {
                    // Log the actual Cloudinary error for debugging!
                    console.error("Cloudinary Upload Failed:", error); 
                    return reject(error);
                }
                if (!uploadResult) {
                    return reject(new Error("Cloudinary result is undefined."));
                }
                return resolve(uploadResult);
            }
        );
        // End the stream with the buffer data
        stream.end(buffer);
    });
}

export default uploadImageCloudinary