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
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
        transformation: [{ width: 200, height: 200, crop: 'limit' }],
    },
})

export const upload = multer({ storage: storage });