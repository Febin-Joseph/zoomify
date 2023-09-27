import express from 'express'
import { pricingPlans } from '../controllers/plans.js';

const router = express.Router()

router.get('/', pricingPlans)

export default router;