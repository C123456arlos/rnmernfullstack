import { Router } from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { createPaymentIntent } from '../controllers/payment.controller.js'
const router = Router()
router.post('/create-intent', createPaymentIntent)
export default router