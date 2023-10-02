import express from 'express'
import { getProfile, uploadProfile } from '../controllers/profile.js'

const router = express.Router()

router.patch('/upload/:userId', uploadProfile)
router.get('/:userId/image', getProfile)

export default router;