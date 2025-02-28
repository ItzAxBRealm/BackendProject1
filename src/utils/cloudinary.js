import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: 'localFile'
        })

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary");
        console.log(response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // removes the locally saved temporary file as the upload operation failed or was interrupted.
        return null;
    }
}
    

export { uploadCloudinary };