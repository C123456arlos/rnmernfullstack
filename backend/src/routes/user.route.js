import { Router } from "express"
import { addAddress, addToWishlist, deleteAddress, getAddresses, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { getWishlist } from "../controllers/user.controller.js"
const router = Router()
router.use(protectRoute)
router.post('/addresses', protectRoute, addAddress)
router.get('/addresses', protectRoute, getAddresses)
router.put('/addresses/:addressId', protectRoute, updateAddress)
router.delete('/addresses/:addressId', protectRoute, deleteAddress)

// router.post('/wishlist', addToWishlist)
router.post('/wishlist/:productId', addToWishlist)
router.delete('/wishlist/:productId',protectRoute, removeFromWishlist)
router.get('/wishlist', getWishlist)
export default router