const stripe = require('../../config/stripe')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
const webHook = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const payloadString = JSON.stringify(req.body)
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            payloadString,
            signature,
            endpointSecret
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
    }

}