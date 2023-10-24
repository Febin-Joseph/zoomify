import express from 'express';
import { meetingId, meetingPassword } from '../controllers/meeting.js';

const router = express.Router();

router.get('/id', meetingId)
router.get('/pswd',meetingPassword)

export default router;