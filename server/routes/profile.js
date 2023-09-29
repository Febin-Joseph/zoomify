import express from 'express'
import { getProfile, uploadProfile } from '../controllers/profile.js'

const router = express.Router()

router.post('/upload', uploadProfile)
router.get('/:userId/image', getProfile)

export default router;