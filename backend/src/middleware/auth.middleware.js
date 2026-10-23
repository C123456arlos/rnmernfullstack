// // import { requireAuth } from "@clerk/express"
// // import { User } from "../models/user.model.js"
// // import { ENV } from "../config/env.js"
// // export const protectRoute =async (req, res, next)=>{
// // requireAuth()
// //             try {
// //                 // const clerkId = req.auth().userId
// //                 const clerkId = req.auth()
// //                 console.log(clerkId)
// //             if (!clerkId) return res.status(401).json({ message: 'unauthorized invalid token' })
// //             const user = await User.findOne({ clerkId: clerkId })
// //             if (!user) return res.status(404).json({ message: 'user not found' })
// //             req.user = user
// //             next()
// //         } catch (error) {
// //             console.error('error in protectRoute middleware', error)
// //             res.status(500).json({message:'internal server error'})
// //         }

// import { getAuth, requireAuth } from "@clerk/express"

    
// // }
// export const protectRoute =
//    async (req, res) => {
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

// // import { getAuth, requireAuth } from "@clerk/express"

    
// // // }
// // export const protectRoute = async (req, res, next) => {
// //     console.log(req)
// //     console.log(req.auth())
// //     requireAuth()
// //     if (!req.auth().isAuthenticated) {
// //     return res.status(401).json({message:'unauthorized you must be logged in'})
// //     }
// //     next()




// //     const { userId } = getAuth(req);
// //     console.log('userId',userId)
// //   if (!userId) {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }






// }
// export const adminOnly = (req, res, next) => {
//     if (!req.user) {
//         return res.status(401).json({ message:'unauthorized user not found'})
//     }
//     if (req.user.email !== ENV.ADMIN_EMAIL) {
//         return res.status(403).json({message:'forbidden admin access only'})
//     }
//     next()
// }
// import { requireAuth } from "@clerk/express"
// import { User } from "../models/user.model.js"
// import { ENV } from "../config/env.js"
// export const protectRoute = [
//     requireAuth(),
//     async (req, res, next) => {
//         try {
//             const clerkId = req.auth().userId
//             if (!clerkId) return res.status(401).json({ message: 'unauthorized invalid token' })
//             const user = await User.findOne({ clerkId: clerkId })
//             if (!user) return res.status(404).json({ message: 'user not found' })
//             req.user = user
//             next()
//         } catch (error) {
//             console.error('error in protectRoute middleware', error)
//             res.status(500).json({message:'internal server error'})
//         }
//     }
// ]
// export const adminOnly = (req, res, next) => {
//     if (!req.user) {
//         return res.status(401).json({ message:'unauthorized user not found'})
//     }
//     if (req.user.email !== ENV.ADMIN_EMAIL) {
//         return res.status(403).json({message:'forbidden admin access only'})
//     }
//     next()
// }

import { requireAuth } from '@clerk/express'
import {User} from '../models/user.model.js'
export const protectRoute = [
    // requireAuth({signInUrl:'/sign-in'}),
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId
            console.log('clerkId',clerkId)
            if (!clerkId) return res.status(401).json({ message: 'unauthorized invalid token' })
            const user = await User.findOne({ clerkId })
            if (!user) return res.status(404).json({ message: 'user not found' })
            req.user = user
            next()
        } catch (error) {
            console.error('error in protect route middleware', error)
            res.status(500).json({message:'internal server error'})
        }
    }
]