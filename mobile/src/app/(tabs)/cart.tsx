import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SafeScreen from '../../../components/SafeScreen'
import useCart from '../../../hooks/useCart'
import { useApi } from '../../../lib/api'
import { useAddresses } from '../../../hooks/useAddresses'
import {useStripe} from '@stripe/stripe-react-native'
import { Address } from '../../../types'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import OrderSummary from '../../../components/OrderSummary'
import AddressSelectionModal from '../../../components/AddressSelectionModal'
const Cart = () => {
  const api =useApi()
  const { addToCart, isAddingToCart, cart, cartItemCount, cartTotal, clearCart, isClearing, isError,
    isLoading, isRemoving, isUpdating, removeFromCart, updateQuantity
   } = useCart()
  const { addresses } = useAddresses()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const cartItems = cart?.items || []
  const subtotal = cartTotal
  const shipping = 10.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const handleQuantityChange = (productId:string, currentQuantity:number, change:number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity < 1) return
    updateQuantity({productId, quantity:newQuantity})
  }
  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert('remove item', `Remove ${productName} from cart`, [
      { text: 'cancel', style: 'cancel' },
      {text:'remove', style:'destructive', onPress:()=>removeFromCart(productId)}
    ])
  }
  const handleCheckout = () => {
    if (cartItems.length === 0) return
    if (!addresses || addresses.length === 0) {
      Alert.alert('no address', 'please add a shipping address in your profile before checking out',
        [{text:'ok'}]
      )
      return
    }
    setAddressModalVisible(true)
  }
  const handleProceedWithPayment = async (selectedAddress: Address) => {
    setAddressModalVisible(false)
    try {
      setPaymentLoading(true)
      const { data } = await api.post('/payment/create-intent', {
        cartItems, shippingAddress: {
          fullName: selectedAddress.fullName, 
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          phoneNumber:selectedAddress.phoneNumber
       }
      })
      const {error:initError}=await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName:'your store name'
      })
      if (initError) {
        Alert.alert('error', initError.message)
        setPaymentLoading(false)
        return
      }
      const { error: presentError } = await presentPaymentSheet()
      if (presentError) {
        Alert.alert('payment cancelled', presentError.message)
      } else {
        Alert.alert('success', 'your payment was successful your order is being processed', [
          { text:'ok', onPress:()=>{}}
        ])
      }
      console.log('cleared')
      console.log('cleared')
      clearCart()
      console.log('cleared')
    } catch (error) {
      console.log('payment failed', error)
      Alert.alert('error', 'failed to process payment')
    } finally {
      setPaymentLoading(false)
    }
  }
  if (isLoading) return <LoadingUI></LoadingUI>
  if (isError) return <ErrorUI></ErrorUI>
  if (cartItems.length===0) return <EmptyUI></EmptyUI>
  return (
    <SafeScreen>
      <Text style={styles.cart}>cart</Text>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 240 }}>
        <View style={styles.container}>{cartItems.map((item, index) => (
          <View key={item._id} style={styles.item}>
            <View style={styles.itemCart}>
              <View style={styles.itemCard}>
                <Image source={item.product.images[0]} style={styles.cardImage}
                  contentFit='cover'></Image>
                <View style={styles.qty}>
                  <Text style={styles.txt}>x{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.cartContent}>
                <View>
                  <Text style={styles.txtName} numberOfLines={2}>{item.product.name}</Text>
                  <View style={styles.txtDesc}>
                    <Text style={styles.txtCart}>${(item.product.price * item.quantity).toFixed(2)}</Text>
                    <Text style={styles.price}>${item.product.price.toFixed(2)} each</Text>
                  </View>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity style={styles.btnTxt} activeOpacity={0.7}
                    onPress={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                    disabled={isUpdating}>
                    {isUpdating ? <ActivityIndicator size='small' color={'#ffffff'}></ActivityIndicator>
                      : <Ionicons name='remove' size={18} color={"#ffffff"}></Ionicons>}
                  </TouchableOpacity>
                  <View style={styles.btnQty}>
                    <Text style={styles.qtyTxt}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity style={styles.btnTxtPrimary} activeOpacity={0.7}
                    onPress={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                    disabled={isUpdating}>
                    {isUpdating ? <ActivityIndicator size='small' color={'#ffffff'}></ActivityIndicator>
                      : <Ionicons name='add' size={18} color={"#ffffff"}></Ionicons>}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}
                    onPress={() => handleRemoveItem(item.product._id, item.product.name)}
                    disabled={isRemoving}>
                    <Ionicons name='trash-outline' size={18} color={'#ef44444'}></Ionicons>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}</View>
        <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total}></OrderSummary>
      </ScrollView>
      <View style={styles.orderSummary}>
        <View style={styles.stats}>
          <View style={styles.statsContainer}>
            <Ionicons name='cart' size={20} color='#1db954'></Ionicons>
            <Text style={styles.statsTxt}>{cartItemCount} {cartItemCount===1?'item':'items'}</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsContent}>${total.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnCheckout} activeOpacity={0.9} onPress={handleCheckout}
          disabled={paymentLoading}>
          <View style={styles.containerBtn}>
            {paymentLoading ? <ActivityIndicator size='small' color={'#121212'}></ActivityIndicator> : <>
              <Text style={styles.txtCheckout}>checkout</Text>
              <Ionicons name='arrow-forward' size={20} color={'#121212'}></Ionicons></>}
          </View>
        </TouchableOpacity>
      </View>
      <AddressSelectionModal visible={addressModalVisible} onClose={() => setAddressModalVisible(false)}
      onProceed={handleProceedWithPayment} isProcessing={paymentLoading}></AddressSelectionModal>
    </SafeScreen>
  )
}
export default Cart
const styles = StyleSheet.create({
  txtCheckout: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight:5
  },
  containerBtn: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  btnCheckout: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    overflow:'hidden'
  },
  contentBtn: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  statsContent: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize:18
  },
  statsTxt: {
    color: COLORS.textsecondary,
    marginLeft:4
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:8
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  orderSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    backdropFilter: 'rgb(79, 82, 83/0.5)',
    borderTopWidth: 2,
    borderColor: COLORS.surface,
    paddingTop: 8,
    paddingBottom: 64,
    paddingHorizontal:12
  },
  deleteBtn: {
    marginLeft: 'auto',
    backgroundColor: '#b33838dd',
    borderRadius: 100,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent:'center'
  },
  btnQty: {
    marginHorizontal: 8,
    minWidth: 28,
    alignItems:'center'
  },
  qtyTxt: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize:24
  },
  btnTxt: {
    backgroundColor: COLORS.light,
    borderRadius: 100,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent:'center'
  },
  btnTxtPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent:'center'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:6
  },
  price: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginLeft:4
  },
  txtCart: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize:18
  },
  txtDesc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:4
  },
  txtName: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing:2
  },
  cartContent: {
    flex: 1,
    marginLeft: 8,
    justifyContent:'space-between'
  },
  txt: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight:'bold'
  },
  qty: {
    position: 'absolute',
    top: 4,
    right: 4,
    // backgroundColor: 'red',
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical:1
  },
  cardImage: {
    width: 96,
    height: 96,
    borderRadius: 10,
    backgroundColor:'red'
    // backgroundColor:COLORS.lighter
  },
  itemCard: {
    position:'relative'
  },
  itemCart: {
    padding: 8,
    flexDirection:'row',
  },
  item: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    overflow:'hidden'
  },
  content: {
    flex:1
  },
  container: {
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom:10
  },
  cart: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    color: COLORS.textprimary,
    fontSize: 20, 
    fontWeight: 'bold',
    letterSpacing:1
  }
})
function EmptyUI() {
  return (
    <View style={stylesCart.empty}>
      <View style={stylesCart.container}>
        <Text style={stylesCart.text}>cart</Text>
      </View>
      <View style={stylesCart.content}>
        <Ionicons name='cart-outline' size={80} color={'#666'}></Ionicons>
        <Text style={stylesCart.icon}>your cart is empty</Text>
        <Text style={stylesCart.txt}>add some products to get started</Text>
      </View>
    </View>
  )
}
export function ErrorUI() {
  return (
    <SafeScreen>
      {/* <View style={stylesErr.loadingContainer}>
        <TouchableOpacity onPress={() => router.back()} style={stylesErr.btn}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={stylesErr.loaderTxt}>wishlist</Text>
      </View> */}
      <View style={stylesErr.errContainer}>
        <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
        <Text style={stylesErr.errTxt}>failed to load to cart</Text>
        <Text style={stylesErr.errConn}>please check your connection and try again</Text>
 </View>
    </SafeScreen>
  )
}
export function LoadingUI() {
  return (
    <SafeScreen>
      <View style={stylesLoad.loadingContainer}>
        {/* <TouchableOpacity onPress={() => router.back()} style={stylesLoad.btn}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={stylesLoad.loaderTxt}>wishlist</Text> */}
      </View>
      <View style={stylesLoad.loadWishlist}>
        <ActivityIndicator size='large' color='#00d9ff'></ActivityIndicator>
        <Text style={stylesLoad.wishlistTxt}>loading wishlist</Text>
      </View>
    </SafeScreen>
  )
}
const stylesCart = StyleSheet.create({
  txt: {
    color: COLORS.textsecondary,
    textAlign: 'center',
    marginTop:4
  },
  icon: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    fontSize: 18,
    marginTop:8
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:12
  },
  empty: {
    flex: 1, 
    backgroundColor:COLORS.background
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 32,
    paddingBottom:10
  },
  text: {
    color: COLORS.textprimary,
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing:1
  }
})
const stylesLoad = StyleSheet.create({
  loadingContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderColor: COLORS.surface,
    flexDirection: 'row',
    alignItems:'center'
  },
  btn: {
    marginRight:8
  },
  loadWishlist: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  loaderTxt: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight:'bold'
  },
  wishlistTxt: {
    color: COLORS.textsecondary,
    marginTop:8
  }
})
const stylesErr = StyleSheet.create({
  loadingContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderColor: COLORS.surface,
    flexDirection: 'row',
    alignItems:'center'
  },
  btn: {
    marginRight:8
  },
  loadWishlist: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  loaderTxt: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight:'bold'
  },
  wishlistTxt: {
    color: COLORS.textsecondary,
    marginTop:8
  },
  errContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10
  },
  errTxt: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    fontSize: 20,
    marginTop:8
  },
  errConn: {
    color: COLORS.textsecondary,
    textAlign: 'center',
    marginTop:4
  }
})
// 14:31