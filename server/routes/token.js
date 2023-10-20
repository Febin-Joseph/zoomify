import express from 'express';
import { genToken } from '../controllers/token.js';

const router = express.Router();

router.get('/token-gen/:channelName/:uid/:role/:expireTime', genToken);

export default router;