import { Router } from "express"
import { addAddress, addToWishlist, deleteAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const router = Router()
// router.use(protectRoute)
router.post('/addresses', protectRoute, addAddress)
router.get('/addresses', getAddresses)
router.put('/addresses/:addressId',  updateAddress)
router.delete('/addresses/:addressId', protectRoute, deleteAddress)

router.post('/wishlist/:productId', protectRoute, addToWishlist)
router.delete('/wishlist/:productId',protectRoute, removeFromWishlist)
router.get('/wishlist',protectRoute, getWishlist)
export default router