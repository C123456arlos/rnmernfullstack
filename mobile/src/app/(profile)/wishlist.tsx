import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import SafeScreen from '../../../components/SafeScreen'
import useWishlist from '../../../hooks/useWishlist'
import useCart from '../../../hooks/useCart'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image } from 'expo-image'

const Wishlist = () => {
  const { wishlist, isLoading, isError, removeFromWishlist, isRemovingFromWishlist } = useWishlist()
  const { addToCart, isAddingToCart } = useCart()
  const handleRemoveFromWishlist = (productId: string, productName: string) => { 
    Alert.alert('remove form wishlist', `remove ${productName} from wishlist`, [
      {text:'cancel', style:'cancel'},
      {text:'remove', style:'destructive', onPress:()=>removeFromWishlist(productId)}
    ])
  }
  const handleAddToCart = (productId: string, productName: string) => {
    addToCart({ productId, quantity: 1 },
      { onSuccess: () => Alert.alert('success', `${productName} added to cart`) ,
       onError: (error:any) => {Alert.alert('error', error?.response?.data?.error || 'failed to add to cart')} }
    )
  }
  if(isLoading) return <LoadingUI></LoadingUI>
  if(isError) return <ErrorUI></ErrorUI>
  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.buttonHeader}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.textHeader}>wishlist</Text>
        <Text style={styles.wishlistHeader}>{wishlist.length} {wishlist.length ===1 ?'item':'items'}</Text>
      </View>
      {wishlist.length === 0 ? (
        <View style={styles.wishlist}>
          <Ionicons name='heart-outline' size={80} color={'#666'}></Ionicons>
          <Text style={styles.wishlistText}>your wishlist is empty</Text>
          <Text style={styles.wishlistSecondary}>start adding products</Text>
          <TouchableOpacity style={styles.wishlisthButton} activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/shop')}>
            <Text style={styles.wishlistBtnTxt}>browse products</Text>
            </TouchableOpacity>
        </View>
      ) : (
          <ScrollView style={styles.items} showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.itemContent}>
              {wishlist.map(item => (
                <TouchableOpacity key={item._id} style={styles.wishlistBackground}
                  activeOpacity={0.8}
                  // onPress={() => router.push(`/product/${item._id}`)}
                >
                  <View style={styles.list}>
                    <Image source={item.images[0]} style={[styles.listImg , {width:96, height:96}]}
                    ></Image>
                    <View style={styles.cardImg}>
                      <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
                      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                      {item.stock > 0 ? (
                        <View style={styles.itemList}>
                          <View style={styles.itemContainerIn}></View>
                          <Text style={styles.itemNameIn}>{item.stock} in stock</Text>
                      </View>
                      ) : (
                        <View style={styles.itemList}>
                          <View style={styles.itemContainer}></View>
                          <Text style={styles.itemName}>out of stock</Text>
                      </View>
                      )}
                    </View>
                    <TouchableOpacity style={styles.remove} activeOpacity={0.7}
                      onPress={() => handleRemoveFromWishlist(item._id, item.name)}
                      disabled={isRemovingFromWishlist}>
                      <Ionicons name='trash-outline' size={20} color={'#ef4444'}></Ionicons>
                      </TouchableOpacity>
                  </View>
                  {item.stock > 0 && (
                    <View style={styles.add}>
                      <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}
                        onPress={() => handleAddToCart(item._id, item.name)} disabled={isAddingToCart}>
                        {isAddingToCart ? (<ActivityIndicator size="small" color="#121212"></ActivityIndicator>) : (<Text style={styles.addText}>add to cart</Text>)}
                        </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            </ScrollView>
      )}
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  add: {
    paddingHorizontal: 15, 
    paddingBottom:15
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 6,
    alignItems:'center'
  },
  addText: {
    color: COLORS.background,
    fontWeight: 'bold'
  },
  remove: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(163, 28, 39, 0.26)',
    borderRadius: 100,
    right: 12,
    top:12
  },
  itemList: {
    flexDirection: 'row',
    alignItems:'center'
  },
  itemContainer: {
    width: 4,
    height: 4,
    backgroundColor: 'red',
    borderRadius: 100,
    marginRight:4
  },
  itemName: {
    color: 'red',
    fontSize: 14,
    fontWeight:'semibold'
  },
  itemContainerIn: {
    width: 4,
    height: 4,
    backgroundColor: 'green',
    borderRadius: 100,
    marginRight:4
  },
  itemNameIn: {
    color: 'green',
    fontSize: 14,
    fontWeight:'semibold'
  },
  name: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4
  },
  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 4,
    marginTop:15
  },
  cardImg: {
    flex: 1,
    marginLeft: 8
  },
  listImg: {
    borderRadius: 8,
    backgroundColor:COLORS.lighter
  },
  list: {
    flexDirection: 'row',
    padding:8
  },
  wishlistBackground: {
    backgroundColor: COLORS.surface,
    borderRadius: 27,
    overflow: 'hidden',
    marginBottom: 6
  },
  itemContent: {
    paddingHorizontal: 12,
    paddingVertical:8
  },
  items: {
    flex:1,
  },
  wishlist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:12
  },
  wishlistText: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop:8
  },
  wishlistSecondary: {
    color: COLORS.textsecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  wishlisthButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 12
  },
  wishlistBtnTxt: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight:15
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderColor: COLORS.surface,
    flexDirection: 'row',
    alignItems:'center'
  },
  buttonHeader: {
    marginRight:8
  },
  textHeader: {
    fontSize: 25,
    color: COLORS.textprimary,
    fontWeight:'bold'
  },
  wishlistHeader: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginLeft:'auto'
  }
})
export default Wishlist
export function LoadingUI() {
  return (
    <SafeScreen>
      <View style={stylesLoad.loadingContainer}>
        <TouchableOpacity onPress={() => router.back()} style={stylesLoad.btn}>
          <Ionicons name='arrow-back' size={28} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={stylesLoad.loaderTxt}>wishlist</Text>
      </View>
      <View style={stylesLoad.loadWishlist}>
        <ActivityIndicator size='large' color='#00d9ff'></ActivityIndicator>
        <Text style={stylesLoad.wishlistTxt}>loading wishlist</Text>
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
        <Text style={stylesErr.loaderTxt}>wishlist</Text>
      </View>
      <View style={stylesErr.errContainer}>
        <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
        <Text style={stylesErr.errTxt}>failed to load to wishlist</Text>
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