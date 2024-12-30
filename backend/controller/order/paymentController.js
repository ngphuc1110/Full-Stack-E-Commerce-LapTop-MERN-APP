const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body

        const user = await userModel.findOne({ _id: req.userId })

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QRqLTGRUIy5duC7Bp0HiE4u',
                }
            ],
            customer_email: user.email,

            metadata: {
                userId: req.userId,
                customer_address: user.address,
                order_status: "processing",
                customer_phone: user.phone,
            },
            line_items: cartItems.map((item, index) => {
                return {
                    price_data: {
                        currency: "VND",
                        product_data: {
                            name: item?.productId?.productName,
                            images: item?.productId?.productImage,
                            metadata: {
                                productId: item?.productId?._id,
                            }
                        },
                        unit_amount: item?.productId?.sellingPrice
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item?.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }



        const session = await stripe.checkout.sessions.create(params)

        res.status(303).json(session)

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = paymentController