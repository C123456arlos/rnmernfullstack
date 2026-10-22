import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import { Product } from '../types'
import useWishlist from '../hooks/useWishlist'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
import { router } from 'expo-router'
import useCart from '../hooks/useCart'
interface ProductsGridProps{
  isLoading: boolean,
  isError: boolean,
  products:Product[]
}
const ProductsGrid = ({ products, isLoading, isError }: ProductsGridProps) => {
  const { isInWishlist, toggleWishlist, isAddingToWishlist, isRemovingFromWishlist, addToWishlist } = useWishlist()
  const {isAddingToCart, addToCart}= useCart()
  const handleAddToCart = (productId: string, productName: string) => {
    addToCart({ productId, quantity: 1 }, {
      onSuccess: () => {
        Alert.alert('success', `${productName} added to cart`)
      },
      onError: (error:any) => {
        Alert.alert('error', error?.response?.data?.error || 'failed to added to cart')
      }
    })
   }
  const renderProduct = ({ item: product }: { item: Product }) => (
    <TouchableOpacity style={[styles.renderButton, { width: '48%' }]} activeOpacity={0.8}
      // onPress={() => router.push(`/product/${product._id}`)}
    >
      <View style={styles.renderImage}>
        <Image source={{ uri: product.images[0] }} style={styles.sourceImage}
          resizeMode='cover'>
        </Image>
        <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}
          onPress={() => addToWishlist}>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}
          onPress={() => toggleWishlist || isRemovingFromWishlist}>
          {isAddingToWishlist || isRemovingFromWishlist ? (
          <ActivityIndicator size='small' color={'#ffffff'}></ActivityIndicator>
          ) : (<Ionicons name={isInWishlist(product._id) ? 'heart' : 'heart-outline'} size={18}
          color={isInWishlist(product._id) ?'#ff6b6b':'#ffffff'}></Ionicons>)}
        </TouchableOpacity> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textCategorySecondary}>{product.category}</Text>
        <Text style={styles.textCategory} numberOfLines={2}>{product.name}</Text>
      <View style={styles.rating}>
        <Ionicons name='star' size={12} color={'#ffc107'}></Ionicons>
        <Text style={styles.ratingText}>{product.averageRating.toFixed(1)}
          Math.round(23.45)
        </Text>
        <Text style={styles.reviews}>({product.totalReviews})</Text>
        </View>
        <View style={styles.actions}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.productButton} activeOpacity={0.7}
            onPress={() => handleAddToCart(product._id, product.name)} disabled={isAddingToCart}>
            {isAddingToCart ? (<ActivityIndicator size='small' color={'#121212'}></ActivityIndicator>)
              : (<Ionicons name='add' size={20} color={'#121212'}></Ionicons>)}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'#00d9ff'}></ActivityIndicator>
        <Text style={styles.loadingText}>loading products</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name='alert-circle-outline' size={48} color={'#ff6b6b'}></Ionicons>
        <Text style={styles.errorProduct}>failed to load products</Text>
        <Text style={styles.errorMsg}>please try again later</Text>
      </View>
    )
  }
  return (
    <FlatList data={products} columnWrapperStyle={{justifyContent:'space-between'}}
      renderItem={renderProduct} keyExtractor={item => item._id}
      numColumns={2} showsVerticalScrollIndicator={false} ListEmptyComponent={NoProductsFound}
    scrollEnabled={false}></FlatList>
  )
}

export default ProductsGrid
function NoProductsFound() {
  return (
    <View style={styles.noProductsContainer}>
      <Ionicons name='search-outline' size={48} color={'#666'}></Ionicons>
      <Text style={styles.noProductsText}>no products found</Text>
      <Text style={styles.adjustText}>try adjusting your filters</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorProduct: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    marginTop:8
  },
  errorMsg: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginTop:4
  },
  errorContainer: {
        paddingVertical: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  loading: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  loadingText: {
    color: COLORS.textsecondary,
    marginTop:8
  },
  productButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  productPrice: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize:24
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  reviews: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginLeft:4
  },
  ratingText: {
    color: COLORS.textprimary,
    fontSize: 12,
    fontWeight: 'semibold',
    marginLeft:4
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:4,
  },
  textCategorySecondary: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginBottom:8
  },
  textCategory: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:4
  },
  textContainer: {
    padding:6
  },
  itemButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    backdropFilter: 'rgb(79, 82, 83/0.5)',
    padding: 5,
    borderRadius: 100,
    marginRight:4
  },
  sourceImage: {
    width: '100%',
    height: 144,
    backgroundColor:COLORS.lighter
  },
  renderImage: {
    position:'relative'
  },
  renderButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 8,
    marginRight:7
  },
  noProductsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  noProductsText: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    marginTop:10
  },
  adjustText: {
    color: COLORS.textsecondary,
    fontSize: 14,
    marginTop:4
  }
})
// .backdrop-blur-xl {
//  --tw-backdrop-blur: blur(24px);
//  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
//  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
// }