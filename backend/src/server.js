import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import { serve } from 'inngest/express'
import {clerkMiddleware, getAuth} from '@clerk/express'
import { inngest, functions } from './config/inngest.js'
// import chatRoutes from './routes/chatRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'

import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'

import orderRoutes from './routes/order.route.js'
import reviewRoutes from './routes/review.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1"])
const app = express()
const __dirname = path.resolve()
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
app.use(clerkMiddleware())
app.use('/api/inngest', serve({client:inngest, functions}))
// app.use('/api/chat', chatRoutes)
app.use('/api/inngest', serve({ client: inngest, functions: functions }))
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.get('/health', (req, res) => {
    res.status(200).json({message:'api is up and running'})
})
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })
}


const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT, () => {
            console.log('server running on port', ENV.PORT)
        })
} catch (error) {
    console.error('error starting the server', error)
    }
}
startServer()















// import express from 'express'
// import { clerkMiddleware } from '@clerk/express'

// const app = express()
// const PORT = 3000

// app.use(clerkMiddleware())
// // Use `getAuth()` to protect this route
// app.get('/protected', async (req, res) => {
//   // Use `getAuth()` to get the user's `userId` and authentication status
//   const { isAuthenticated, userId } = getAuth(req)

//   // If user isn't authenticated, return a 401 error
//   if (!isAuthenticated) {
//     res.status(401).json({ error: 'User not authenticated' })
//     return
//   }

//   // Use Clerk's JavaScript Backend SDK to get the user's User object
//   const user = await clerkClient.users.getUser(userId)

//   res.json({ user })
// })
// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })