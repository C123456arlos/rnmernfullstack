import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SafeScreen from '../../../components/SafeScreen'
import { useOrders } from '../../../hooks/useOrders'
import { useReviews } from '../../../hooks/useReviews'
import { Order } from '../../../types'
import { COLORS } from '../../../constants/colors'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { capitalizeFirstLetter, formatDate, getStatusColor } from '../../../lib/utils'
import RatingModal from '../../../components/RatingModal'

const Orders = () => {
  const { data: orders, isLoading, isError } = useOrders()
  const { createReviewAsync, isCreatingReview } = useReviews()
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [productRatings, setProductRatings] = useState<{ [key: string]: number }>({})
  const handleOpenRating = (order: Order) => {
    setShowRatingModal(true)
    setSelectedOrder(order)
    const initialRatings: { [key: string]: number } = {}
    order.orderItems.forEach((item) => {
      const productId = item.product._id
      initialRatings[productId]=0
    })
    setProductRatings(initialRatings)
  }
  const handleSubmitRating = async () => {
    if (!selectedOrder) return
    const allRated = Object.values(productRatings).every((rating) => rating > 0)
    if (!allRated) {
      Alert.alert('error', 'please rate all products')
      return
    }
    try {
      await Promise.all(
        selectedOrder.orderItems.map(item => {
          createReviewAsync({
            productId: item.product._id,
            orderId: selectedOrder._id,
            rating:productRatings[item.product._id]
          })
        })
      )
      Alert.alert('success', 'thank you for rating all products')
      setShowRatingModal(false)
      setSelectedOrder(null)
      setProductRatings({})
    } catch (error:any) {
      Alert.alert('error', error?.response?.data?.error || 'failed to submit rating')
    }
  }
  return (
    <SafeScreen>
      <View style={styles.orders}>
        <TouchableOpacity onPress={() => router.back()} style={styles.orderBtn}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.txt}>my orders</Text>
      </View>
      {isLoading ? <LoadingUI></LoadingUI> : isError ? <ErrorUI></ErrorUI> : !orders || orders.length === 0 ? <EmptyUI></EmptyUI> :
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} >
          <View style={styles.content}>
            {orders.map(order => {
              const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
              const firstImage = order.orderItems[0]?.image || ''
              return (
                <View key={order._id} style={styles.orderContent}>
                  <View style={styles.orderContainer}>
                    <View style={styles.imgContainer}>
                      <Image source={firstImage} style={{ height: 80, width: 80, borderRadius: 8 }}
                        contentFit='cover'></Image>
                      {order.orderItems.length > 1 && (
                        <View style={styles.badge}>
                          <Text style={styles.txtBadge}>+{order.orderItems.length-1}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.badgeContainer}>
                      <Text style={styles.txtContainer}>order #{order._id.slice(-8).toUpperCase()}</Text>
                      <Text style={styles.order}>{formatDate(order.createdAt)}</Text>
                      <View style={[styles.orderTxt, { backgroundColor: getStatusColor(order.status) + "20" }]}>
                        <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
                          {capitalizeFirstLetter(order.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {order.orderItems.map((item, index) => (
                    <Text key={item._id} style={styles.item} numberOfLines={1}>
                      {item.name} x {item.quantity}
                    </Text>
                  ))}
                  <View style={styles.itemCard}>
                    <View>
                      <Text style={styles.txtItem}>{totalItems} items</Text>
                      <Text style={styles.total}>${order.totalPrice.toFixed(2)}</Text>
                    </View>
                    {order.status === 'delivered' && (
                      order.hasReviewed ? (<View style={styles.reviewed}>
                        <Ionicons name='checkmark-circle' size={18} color={'#1db954'}></Ionicons>
                        <Text style={styles.icon}>reviewed</Text>
                      </View>) : (<TouchableOpacity style={styles.iconBtn}
                          activeOpacity={0.7} onPress={() => handleOpenRating(order)}>
                          <Ionicons name='star' size={18} color='#121212'></Ionicons>
                          <Text style={styles.rating}>leave rating</Text>
                      </TouchableOpacity>)
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>}
      <RatingModal visible={showRatingModal} onClose={() => setShowRatingModal(false)}
        order={selectedOrder} productRatings={productRatings} onSubmit={handleSubmitRating}
        isSubmitting={isCreatingReview} onRatingChange={(productId, rating) =>
        setProductRatings((prev)=>({...prev, [productId]:rating})) 
      }></RatingModal>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  rating: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft:4
  },
  iconBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems:'center'
  },
  icon: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft:5
  },
  reviewed: {
    backgroundColor: '#1db954cc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems:'center'
  },
  total: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize:20
  },
  txtItem: {
    color: COLORS.textsecondary,
    fontSize: 10,
    marginBottom:2
  },
  itemCard: {
    borderTopColor: COLORS.lighter,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  item: {
    color: COLORS.textsecondary,
    fontSize: 15,
    flex:1
  },
  status: {
    fontSize: 12,
    fontWeight:'bold'
  },
  orderTxt: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius:100
  },
  order: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginBottom:4
  },
  txtContainer: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 15,
    marginBottom:4
  },
  badgeContainer: {
    flex: 1,
    marginLeft:8
  },
  txtBadge: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight:'bold'
  },
  badge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent:'center'
  },
  imgContainer: {
    position:'relative'
  },
  orderContainer: {
    flexDirection: 'row',
    marginBottom:8
  },
  orderContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    padding: 10,
    marginBottom:8
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical:8
  },
  container: {
    flex:1
  },
  txt: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight:'bold'
  },
  orderBtn: {
    marginRight:8
  },
  orders: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomColor: COLORS.surface,
    flexDirection: 'row',
    alignItems:'center'
  },
  text: {
    color:'white'
  }
})
export default Orders
export function ErrorUI() {
  return (
    <SafeScreen>
      <View style={stylesErr.errContainer}>
        <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
        <Text style={stylesErr.errTxt}>failed to load to orders</Text>
        <Text style={stylesErr.errConn}>please check your connection and try again</Text>
 </View>
    </SafeScreen>
  )
}
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
function EmptyUI() {
  return (
    <View style={stylesCart.empty}>
      <View style={stylesCart.content}>
        <Ionicons name='cart-outline' size={80} color={'#666'}></Ionicons>
        <Text style={stylesCart.icon}>no orders yet</Text>
        <Text style={stylesCart.txt}>your order history will appear here</Text>
      </View>
    </View>
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
function LoadingUI(){
  return (
    <View style={stylesLoading.loading}>
      <ActivityIndicator size="large" color='#00d9ff'></ActivityIndicator>
      <Text style={stylesLoading.txt}>loading offers</Text>
    </View>
  )
}
const stylesLoading = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  txt: {
    color: COLORS.textsecondary,
    marginTop:8
  }
})