import User from "../models/User.js";
import { upload } from "../middleware/profileUpload.js";

export const uploadProfile = async (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ error: "Image upload failed" });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ error: "No image file provided" });
            } else if (!req.user) {
                return res.status(400).json({ error: "No user found" });
            }

            const userId = req.user._id;
            const imageUrl = req.file.path;

            User.findByIdAndUpdate(userId, { profile: imageUrl });

            res.json({ message: "Image Uploaded Successfully", imageUrl });
        } catch (error) {
            console.error('Error uploading profile image:', error);
            res.status(500).json({ error: 'Profile image upload failed' });
        }
    });
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId)

        if (!user) {
            res.status(404).json({ error: "User not Found " })
        } else if (!user.profile) {
            res.status(404).json({ error: "User Image not Found " })
        }
    } catch (error) {
        console.error('Error getting profile image:', error);
        res.status(500).json({ error: 'Profile image retrieval failed' });
    }
}