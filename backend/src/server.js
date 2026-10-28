import express from 'express'
import path from 'path'
import dns from "node:dns/promises"
import { clerkMiddleware } from '@clerk/express'
import { serve } from 'inngest/express'
import cors from 'cors'
import {functions, inngest} from './config/inngest.js'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.js'
import adminRoutes from './routes/admin.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'
import reviewRoutes from './routes/review.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import paymentRoutes from './routes/payment.route.js'
dns.setServers(["1.1.1.1"])
const app = express()
const __dirname = path.resolve()
app.use('/api/payment', (req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') {
        express.raw({type: 'application/json'})(req, res, next)
    } else {
        express.json()(req, res, next)
}}
, paymentRoutes)
app.use(express.json())
app.use(clerkMiddleware())
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
// app.use(cors({origin:'http://localhost:5173'}))
app.use('/api/inngest', serve({ client: inngest, functions: functions }))
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.get('/api/health', (req, res) => {
    res.status(200).json({message:'success'})
})
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')))
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'))
    })
}
const startServer = async () => {
    await connectDB()
    app.listen(ENV.PORT, () => {
        console.log('server is up and running')
    })
}
startServer()


// cd C:\Program Files (x86)\Google\Chrome\Application
// chrome.exe --disable-web-security --user-data-dir="C:\my-chrome-data\data"
// 	"scripts": {
// 		    "dev": "cross-env NODE_ENV=development nodemon backend/index.js",
//     "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
//     "start": "cross-env NODE_ENV=production node backend/index.js"
// 	},