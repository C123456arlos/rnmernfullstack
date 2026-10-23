// import { Router } from "express"
// import { addAddress, addToWishlist, deleteAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
// import { protectRoute } from "../middleware/auth.middleware.js"
// const router = Router()
// router.use(protectRoute)
// router.post('/addresses',  addAddress)
// router.get('/addresses',  getAddresses)
// router.put('/addresses/:addressId',  updateAddress)
// router.delete('/addresses/:addressId',  deleteAddress)

// router.post('/wishlist/:productId', addToWishlist)
// // router.post('/wishlist/:productId',  addToWishlist)
// router.delete('/wishlist/:productId', removeFromWishlist)
// router.get('/wishlist', getWishlist)
// export default router
// // import { Router } from "express"
// // import { addAddress, addToWishlist, deleteAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
// // import { protectRoute } from "../middleware/auth.middleware.js"
// // const router = Router()
// // // router.use(protectRoute)
// // router.post('/addresses', protectRoute, addAddress)
// // router.get('/addresses', protectRoute, getAddresses)
// // router.put('/addresses/:addressId', protectRoute, updateAddress)
// // router.delete('/addresses/:addressId', protectRoute, deleteAddress)

// // router.post('/wishlist/:productId', addToWishlist)
// // // router.post('/wishlist/:productId', protectRoute, addToWishlist)
// // router.delete('/wishlist/:productId',protectRoute, removeFromWishlist)
// // router.get('/wishlist', getWishlist)
// // export default router






// // import { Router } from "express"
// // import { protectRoute } from "../middleware/auth.middleware.js"
// // import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js"
// // const router = Router()
// // router.use(protectRoute)
// // router.get('/', getCart)
// // router.post('/', addToCart)
// // router.put('/:productId', updateCartItem)
// // router.delete('/:productId', removeFromCart)
// // router.delete('/', clearCart)
// // export default router



// import { Router } from "express"
// import { addAddress, addToWishlist, deleteAddress, getAddresses, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
// import { protectRoute } from "../middleware/protectRoute.js"
// import { getWishlist } from "../controllers/user.controller.js"
// const router = Router()
// router.use(protectRoute)
// router.post('/addresses', protectRoute, addAddress)
// router.get('/addresses', protectRoute, getAddresses)
// router.put('/addresses/:addressId', protectRoute, updateAddress)
// router.delete('/addresses/:addressId', protectRoute, deleteAddress)

// router.post('/wishlist/:productId', protectRoute, addToWishlist)
// router.delete('/wishlist/:productId',protectRoute, removeFromWishlist)
// router.get('/wishlist', getWishlist)
// export default router

import { Router } from "express"
import { addAddress, addToWishlist, deleteAddress, getAddresses, removeFromWishlist, updateAddress } from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getWishlist } from "../controllers/user.controller.js"
const router = Router()
router.use(protectRoute)
router.post('/addresses', protectRoute, addAddress)
router.get('/addresses', protectRoute, getAddresses)
router.put('/addresses/:addressId', protectRoute, updateAddress)
router.delete('/addresses/:addressId', protectRoute, deleteAddress)

router.post('/wishlist/:productId', protectRoute, addToWishlist)
router.delete('/wishlist/:productId',protectRoute, removeFromWishlist)
router.get('/wishlist', getWishlist)
export default router