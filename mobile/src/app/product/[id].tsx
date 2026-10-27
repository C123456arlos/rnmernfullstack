import { View, Text, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useProduct } from '../../../hooks/useProduct'
import useCart from '../../../hooks/useCart'
import useWishlist from '../../../hooks/useWishlist'
import { COLORS } from '../../../constants/colors'
import SafeScreen from '../../../components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import { Product } from '../../../types'
import { Image } from 'expo-image'
const {width}=Dimensions.get('window')
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { data:product, isError, isLoading } = useProduct(id as string)
  const { addToCart, isAddingToCart } = useCart()
  const { isInWishlist, toggleWishlist, isAddingToWishlist, isRemovingFromWishlist } = useWishlist()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    if (!product) return
    addToCart(
      { productId: product._id, quantity },
      {
        onSuccess: () => Alert.alert('success', `${product.name} added to cart`),
        onError: (error: any) => {
        Alert.alert('error', error?.reponse?.product?.error || 'failed to add to cart')
      }
      }
    )
  }
  if (isLoading) return <LoadingUI></LoadingUI>
  if (isError) return <ErrorUI></ErrorUI>
  const inStock= product.stock >0
  return (
    <SafeScreen>
      <View style={styles.id}>
        <TouchableOpacity style={styles.btnId} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name='arrow-back' size={24} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        {isInWishlist(product._id) ?
          <TouchableOpacity style={styles.wishlist} onPress={() => toggleWishlist(product._id)}
            disabled={isAddingToWishlist || isRemovingFromWishlist} activeOpacity={0.7}>
            {isAddingToWishlist || isRemovingFromWishlist ? (
              <ActivityIndicator size={'small'} color={'#ffffff'}></ActivityIndicator>
            ) : (
                <Ionicons name={isInWishlist(product._id) ? 'heart' : 'heart-outline'}
                  size={24} color={isInWishlist(product._id)?'#121212':'#ffffff'}></Ionicons>
            )}
            </TouchableOpacity>
        :
          <TouchableOpacity style={styles.notWishlist} onPress={() => toggleWishlist(product._id)}
            disabled={isAddingToWishlist || isRemovingFromWishlist} activeOpacity={0.7}>
            {isAddingToWishlist || isRemovingFromWishlist ? (
              <ActivityIndicator size={'small'} color={'#ffffff'}></ActivityIndicator>
            ) : (
                <Ionicons name={isInWishlist(product._id) ? 'heart' : 'heart-outline'}
                  size={24} color={isInWishlist(product._id)?'#121212':'#ffffff'}></Ionicons>
            )}
          </TouchableOpacity>
        }
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.component}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width)
            setSelectedImageIndex(index)
            }}>
            {product.images.map((image: string, index: number) => (
              <View key={index} style={{ width }}>
                <Image source={image} style={{width, height:400}} contentFit='cover'></Image>
              </View>
            ))}
          </ScrollView>
        </View>
          {/* <View style={styles.id}>
            {product.images.map((_: any, index: number) => (
              <View key={index} style={styles.id}><View>
              ))}
              </View> */}
          {/* <View style={styles.id}>
            {product.images.map((_: any, index: number) => (
              <View key={index} style={styles.id}><View>
              ))}
              </View> */}
        <View style={styles.indicator}>
              {product.images.map((_: any, index: number) => (
                index === selectedImageIndex ? <View style={styles.btnIndicator}></View>
                  : <View style={styles.btnRound}></View>
              ))}
        </View>
        <View style={styles.prod}>
          <View style={styles.categoryProd}>
            <View style={styles.cardCategory}>
              <Text style={styles.txtCategory}>{product.category}</Text>
            </View>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.containerRating}>
            <View style={styles.contentRating}>
              <Ionicons name='star' size={16} color={'#ffc107'}></Ionicons>
              <Text style={styles.txtRating}>{product.averageRating.toFixed(1)}</Text>
              <Text style={styles.txtReview}>({product.totalReviews} reviews)</Text>
            </View>
            {inStock ? <View style={styles.reviewCard}>
              <View style={styles.separator}></View>
              <Text style={styles.msg}>{product.stock} in stock</Text>
            </View> : <View style={styles.reviewCard}>
                <View style={styles.separatorEmpty}></View>
              <Text style={styles.msgEmpty}>out of stock</Text>
            </View>}
          </View>
          <View style={styles.price}>
            <Text style={styles.priceTxt}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.margin}>
            <Text style={styles.marginTxt}>quantity</Text>
            <View style={styles.qty}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}
                activeOpacity={0.7} disabled={!inStock}>
                <Ionicons name='remove' size={24} color={inStock ? '#ffffff':'#666'}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.qtyTxt}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtnAdd} onPress={()=>setQuantity(Math.min(product.stock, quantity+1))} activeOpacity={0.7} disabled={!inStock || quantity >=product.stock}
              >
                <Ionicons name='add' size={24} color={!inStock || quantity >= product.stock ? '#666' :
                  '#121212'
                }></Ionicons>
              </TouchableOpacity>
            </View>
            {quantity >= product.stock && inStock && (
              <Text style={styles.max}>maximum stock reached</Text>
            )}
          </View>
          <View style={styles.description}>
            <Text style={styles.txtDescription}>description</Text>
            <Text style={styles.btnDescription}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <Text style={styles.bottomTxt}>total price</Text>
            <Text style={styles.bottomSecondary}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
          {!inStock ?
            <TouchableOpacity style={styles.btnAction} activeOpacity={0.8} onPress={handleAddToCart}
              disabled={!inStock || isAddingToCart}>
              {isAddingToCart ?
                <ActivityIndicator size={'small'} color='#121212'></ActivityIndicator>
                :
                
                <>
                  
                  {!inStock ?
                    <>
                      <Ionicons name='cart' size={24} color={!inStock ? '#666' : '#121212'}></Ionicons>
                      <Text style={styles.txtAction}>{!inStock ?'out of stock':'add to cart'}</Text></> :
                    <>
                      <Ionicons name='cart' size={24} color={!inStock ? '#666' : '#121212'}></Ionicons>
                      <Text style={styles.txtActionEmpty}>{!inStock ?'out of stock':'add to cart'}</Text></>}
                </>
              }
              
            </TouchableOpacity> :
            <TouchableOpacity style={styles.btnActionEmpty} activeOpacity={0.8} onPress={handleAddToCart}
              disabled={!inStock || isAddingToCart}>
              {isAddingToCart ?
                <ActivityIndicator size={'small'} color='#121212'></ActivityIndicator> :
                <>
                  {!inStock ?
                    <>
                      <Ionicons name='cart' size={24} color={!inStock ? '#666' : '#121212'}></Ionicons>
                      <Text style={styles.txtAction}>{!inStock ?'out of stock':'add to cart'}</Text>
                    </> :
                    <>
                      <Ionicons name='cart' size={24} color={!inStock ? '#666' : '#121212'}></Ionicons>
                      <Text style={styles.txtActionEmpty}>{!inStock ?'out of stock':'add to cart'}</Text></>}
                </>
              }
            </TouchableOpacity>
          }
        </View>
      </View>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  txtAction: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
    color:COLORS.textsecondary
  },
  txtActionEmpty: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
    color:COLORS.light
  },
  btnAction: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:COLORS.primary
  },
  btnActionEmpty: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:COLORS.primary
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    backdropFilter: 'rgb(79, 82, 83/0.5)',
    borderTopWidth: 5,
    borderTopColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom:12
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:6,
  },
  bottomContent: {
    flex:1
  },
  bottomTxt: {
    color: COLORS.textsecondary,
    fontSize: 14,
    marginBottom:2
  },
  bottomSecondary: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight:'bold'
  },
  txtDescription: {
    color: COLORS.textprimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:7
  },
  btnDescription: {
    color: COLORS.textsecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  description: {
    marginBottom:16,
  },
  max: {
    color: 'orange',
    fontSize: 14,
    marginTop:4
  },
  qtyTxt: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal:15
  },
  qtyBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  qtyBtnAdd: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  qty: {
    flexDirection: 'row',
    alignItems:'center'
  },
  marginTxt: {
    color: COLORS.textprimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:6
  },
  margin: {
    marginBottom:12
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:12
  },
  priceTxt: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight:'bold'
  },
  msg: {
    color: 'green',
    fontWeight: 'semibold',
    fontSize:15
  },
  msgEmpty: {
    color: 'red',
    fontWeight: 'semibold',
    fontSize:15
  },
  separator: {
    width: 4,
    height: 4,
    backgroundColor: 'green',
    borderRadius: 100,
    marginRight:6
  },
  separatorEmpty: {
    width: 4,
    height: 4,
    backgroundColor: 'red',
    borderRadius: 100,
    marginRight:6
  },
  reviewCard: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems:'center'
  },
  txtReview: {
    color: COLORS.textsecondary,
    fontSize:12
  },
  txtRating: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight:8
  },
  containerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:8
  },
  contentRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius:100
  },
  name: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:7
  },
  categoryProd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:6
  },
  cardCategory: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    borderRadius: 100,
    marginTop:30
  },
  txtCategory: {
    color: COLORS.textprimary,
    fontSize: 10,
    fontWeight:'bold'
  },
  prod: {
    paddingHorizontal:12
  },
  btnIndicator: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 12,
    borderRadius:100
  },
  btnRound: {
    backgroundColor: COLORS.light,
    width: 8,
    height: 12,
    borderRadius:100
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'flex-end',
    gap: 4,
    height:390
  },
  component: {
    position:'relative'
  },
  container: {
    flex:1
  },
  notWishlist: {
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    backdropFilter: 'rgb(79, 82, 83/0.5)',    
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center'
  },
  wishlist: {
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:COLORS.primary
  },
  btnId: {
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    backdropFilter: 'rgb(79, 82, 83/0.5)',
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center'
  },
  id: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  }
})
export default ProductDetailsScreen
// export function LoadingUI() {
//   return (
//     <SafeScreen>
//       <View style={stylesLoad.loadingContainer}>
//         <ActivityIndicator size='large' color='#00d9ff'></ActivityIndicator>
//         <Text style={stylesLoad.wishlistTxt}>loading product</Text>
//       </View>
//     </SafeScreen>
//   )
// }
// const stylesLoad = StyleSheet.create({
//   loadingContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 10,
//     borderColor: COLORS.surface,
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   btn: {
//     marginRight:8
//   },
//   loadWishlist: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent:'center'
//   },
//   loaderTxt: {
//     color: COLORS.textprimary,
//     fontSize: 20,
//     fontWeight:'bold'
//   },
//   wishlistTxt: {
//     color: COLORS.textsecondary,
//     marginTop:8
//   }
// })
// export function ErrorUI() {
//   return (
//     <SafeScreen>
//       <View style={stylesErr.loadingContainer}>
//         <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
//         <Text style={stylesErr.errTxt}>product not found</Text>
//         <Text style={stylesErr.errConn}>this product may have been removed or doesn$apos;t exist</Text>
//         <TouchableOpacity onPress={() => router.back()} style={stylesErr.btn}>
//         <Text style={stylesErr.loaderTxt}>go back</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeScreen>
//   )
// }
// const stylesErr = StyleSheet.create({
//   loadingContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 10,
//     borderColor: COLORS.surface,
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   btn: {
//     marginRight:8
//   },
//   loadWishlist: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent:'center'
//   },
//   loaderTxt: {
//     color: COLORS.textprimary,
//     fontSize: 20,
//     fontWeight:'bold'
//   },
//   wishlistTxt: {
//     color: COLORS.textsecondary,
//     marginTop:8
//   },
//   errContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal:10
//   },
//   errTxt: {
//     color: COLORS.textprimary,
//     fontWeight: 'semibold',
//     fontSize: 20,
//     marginTop:8
//   },
//   errConn: {
//     color: COLORS.textsecondary,
//     textAlign: 'center',
//     marginTop:4
//   }
// })
export function LoadingUI() {
  return (
    <SafeScreen>
      <View style={stylesLoad.loadWishlist}>
        <ActivityIndicator size='large' color='#00d9ff'></ActivityIndicator>
        <Text style={stylesLoad.wishlistTxt}>loading product</Text>
      </View>
    </SafeScreen>
  )
}
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
export function ErrorUI() {
  return (
    <SafeScreen>
      <View style={stylesErr.loadingContainer}>
        <TouchableOpacity onPress={() => router.back()} style={stylesErr.btn}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={stylesErr.loaderTxt}>products</Text>
      </View>
      <View style={stylesErr.errContainer}>
        <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
        <Text style={stylesErr.errTxt}>failed to load to product</Text>
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