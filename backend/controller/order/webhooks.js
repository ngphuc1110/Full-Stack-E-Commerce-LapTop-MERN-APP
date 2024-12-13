const stripe = require('../../config/stripe')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
const webHooks = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const payloadString = JSON.stringify(req.body)
    let event;

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })
    try {
        event = stripe.webhooks.constructEvent(
            payloadString,
            header,
            endpointSecret
        );
    } catch (err) {
        response.sendStatus(400).send(`Webhook Error: ${err.message}`)
        return;
    }

    response.status(200).send();

}

module.exports = webHooks