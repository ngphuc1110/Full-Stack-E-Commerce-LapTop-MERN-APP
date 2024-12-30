const sendEmail = require('../../config/sendEmail')
const stripe = require('../../config/stripe')
const addToCartModel = require('../../models/cartProduct')
const orderProductModel = require('../../models/orderProductModel')
const orderEmailTemplate = require('../../ultis/orderEmailTemplate')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems) {
    let productItems = []
    if (lineItems?.data.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId
            //const address = product.metadata.
            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount,
                quantity: item.quantity,
                image: product.images
            }

            productItems.push(productData)
        }
    }

    return productItems
}

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
        res.sendStatus(400).send(`Webhook Error: ${err.message}`)
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            const productDetails = await getLineItems(lineItems)


            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                address: session.metadata.customer_address,
                orderStatus: session.metadata.order_status,
                phone: session.metadata.customer_phone,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_types: session.payment_method_types,
                    payment_status: session.payment_status
                },
                shipping_options: session.shipping_options.map(s => {
                    return {
                        ...s,
                        shipping_amount: s.shipping_amount
                    }
                }),
                totalAmount: session.amount_total
            }
            const order = new orderProductModel(orderDetails)
            const saveOrder = await order.save()

            const orderEmail = await sendEmail({
                sendTo: order.email,
                subject: "Order detail from LaptopStore",
                html: orderEmailTemplate({
                    name: session.customer_details.name,
                    phone: session.metadata.customer_phone,
                    address: session.metadata.customer_address,
                    product: order,
                })
            })

            if (saveOrder?._id) {
                const deleteCartItems = await addToCartModel.deleteMany({ userId: session.metadata.userId })
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    res.status(200).send();

}

module.exports = webHooks