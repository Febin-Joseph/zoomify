import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dz1jdl1sa',
    api_key: '329247159121158',
    api_secret: 'Ge6sqLGt9jJW9DkK6zbPhIbYKYY',
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Profile-images',
        format: async (req, file) => 'png',
        public_id: (req, file) => console.log("file of the user", file, "user id", req.body),
    },
})

export const upload = multer({ storage: storage });