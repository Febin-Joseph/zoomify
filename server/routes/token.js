import express from 'express';
import { genToken } from '../controllers/token.js';

const router = express.Router();

router.get('/token-gen', genToken)

export default router;