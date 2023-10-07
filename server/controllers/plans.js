import Plan from "../models/Pricing-plans.js";

export const pricingPlans = async (req, res) => {
    try {
        const plans = await Plan.find().sort({ order: 1 }).toArray();
        res.json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ error: error.message });
    }
};