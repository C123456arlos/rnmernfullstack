import Stripe from 'stripe'
import { ENV } from '../config/env.js'
import { User } from '../models/user.model.js'
import { Product } from '../models/product.model.js'
import { Order } from '../models/order.model.js'
import { Cart } from '../models/cart.model.js'
const stripe = new Stripe(ENV.STRIPE_SECRET_KEY)
export async function createPaymentIntent(req, res) {
    try {
        const { cartItems, shippingAddress } = req.body
        const user = req.user
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({error:'cart is empty'})
        }
        let subtotal = 0
        const validatedItems = []
        for (const item of cartItems) {
            // const product = await Product.findById('6ad51f3b7ac633084bd3d171')
            const product = await Product.findById(item.product._id)
            if (!product) {
                return res.status(404).json({error:`Product ${item.product.name} not found`})
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({error:`insufficient stock for ${product.name}`})
            }
            subtotal += product.price * item.quantity
            validatedItems.push({
                product: product._id.toString(),
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image:product.images[0]
            })
        }
        const shipping = 10.0
        const tax = subtotal * 0.08
        const total = subtotal + shipping + tax 
        // console.log('subtotal',subtotal)
        const amount = total*100
        // const amount = 100
        if (total <= 0) {
            return res.status(400).json({error:'invalid order total'})
        }
        let customer
        if (user.stripeCustomerId) {
            // customer= await stripe.customers.retrieve('cus_VWfCWSkSjdgZQh')
            customer= await stripe.customers.retrieve(user.stripeCustomerId)
        } else {
            customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                    clerkId: user.clerkId,
                    userId:user._id.toString()
                }
            })
            await User.findByIdAndUpdate(user._id, {stripeCustomerId:customer.id})
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            // amount: Math.round(total * 100),
            currency: 'usd',
            customer: customer.id,
            automatic_payment_methods: {
                enabled:true
            },
            metadata: {
                // clerkId: 'user_3J0qe7MrwSGvnqArhqpT4Obeu9l',
                clerkId: user.clerkId,
                // userId: '6adbb4d3e61f261e74139ec4',
                userId: user._id.toString(),
                // orderItems: JSON.stringify('6ae1d021dcdc7312ef53e25c'),
                orderItems: JSON.stringify(validatedItems),
                // shippingAddress: '1',
                shippingAddress: JSON.stringify(shippingAddress),
                // totalPrice:10
                totalPrice:total.toFixed(2)
            }
        })
        res.status(200).json({clientSecret:paymentIntent.client_secret})
    } catch (error) {
        console.error('error creating payment intent', error)
        // res.status(500).json({ error: error.message })
        res.status(500).json({error:error.message})
    }
}