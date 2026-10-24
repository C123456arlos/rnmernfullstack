import { User } from "../models/user.model.js"
export async function addAddress(req, res) {
try {
    const { label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault } = req.body
    const user = req.user
    if (!fullName || !streetAddress || !city || !state || !zipCode) {
        return res.status(400).json({error:'missing required address fields'})
    }
    if (isDefault === true) {
        user.address.foreEach(addr=>{addr.isDefault=false})
    }
    user.addresses.push({
        label: label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault:isDefault ||false
    })
    await user.save()
    res.status(201).json({message:'address added successfully', addresses:user.addresses})
} catch (error) {
    console.error('Error in addAddress controller', error)
    res.status(500).json({error:'Internal server error'})
}
}
export async function getAddresses(req, res) {
    try {
        const user = req.user
        res.status(200).json({addresses:user.addresses})
    } catch (error) {
        console.error('Error in getAddresses controller', error)
        res.status(500).json({error:'Internal server error'})
    }
 }
export async function updateAddress()
{
    try {
        const { label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault } = req.body
        const { addressId } = req.params
        const user = req.user
        const address = user.addresses.id(addressId)      
        if (!address) {
            return res.status(404).json({error:'address not found'})
        }
        if (isDefault) {
            user.addresses.forEach((addr) => {
                addr.isDefault=false
            })
        }
        address.label = label || address.label
        address.fullName = fullName || address.fullName
        address.streetAddress = streetAddress || address.streetAddress
        address.city = city || address.city
        address.state = state || address.state
        address.zipCode = zipCode || address.zipCode
        address.phoneNumber = phoneNumber || address.phoneNumber
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault
        await user.save()
        res.status(200).json({message:'address updated successfully', address:user.address})
    } catch (error) {
        console.error("Error in update address controller", error)
        res.status(500).json({error:'Internal server error'})
    }

 }
export async function deleteAddress() {
    try {
        const { addressId } = req.params
        const user = req.user
        user.addresses.pull(addressId)
        await user.save()
        res.status(200).json({ message: 'address deleted successfully', address: user.addresses })
    } catch (error) {
        console.error('Error in deleteAddress controller', error)
        res.status(500).json({error:'Internal server error'})
    }
 }
export async function addToWishlist(req, res) {
    try {
        const { productId } = req.params
        const user = req.user
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({error:'product already in wishlist'})
        }
        user.wishlist.push(productId)
        await user.save()
        res.status(200).json({messge:'product added to wishlist', wishlist:user.wishlist})
    } catch (error) {
        console.error('Error in addToWishlist controller', error)
        res.status(500).json({error:'Internal server error'})
    }
}
export async function removeFromWishlist() {
    try {
        const { productId } = req.params
        const user = req.user
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({error:'product is not even in wishlist'})
        }
        user.wishlist.pull(productId)
        await user.save()
        res.status(200).json({messge:'product removed from wishlist', wishlist:user.wishlist})
    } catch (error) {
        console.error('Error in removeFromWishlist controller', error)
        res.status(500).json({error:'Internal server error'})
    }
 }
export async function getWishlist() {
    try {
    // const user= req.user
    const user= await User.findById(req.user._id).populate('wishlist')
    res.status(200).json({ wishlist: user.wishlist })
} catch (error) {
        console.error('Error in getWishlist controller', error)
res.status(500).json({error:'Internal server error'})        
}
}