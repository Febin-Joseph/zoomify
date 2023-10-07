const plans = [
    {
        name: 'Basic Plan',
        price: 299,//price in cents (2.99 * 100)
        features: ['Set ID and Password'],
        order: 1,
    },
    {
        name: 'Pro Plan',
        price: 599,//price in cents (5.99 * 100)
        features: ['Set ID and Password', 'Find Who Is The Host'],
        order: 2,
    },
    {
        name: 'Premium  Plan',
        price: 2099,//price in cents (20.99 * 100)
        features: ['Set ID and Password', 'Find Who Is The Host', 'Schedule Meeting', 'Video View'],
        order: 3,
    },
]

const insertPlans = async (db) => {
    try {
        await db.collection('plans').insertMany(plans);
        console.log('Data inserted successfully.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

export default insertPlans;