import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import SafeScreen from '../../components/SafeScreen'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import ProductsGrid from '../../components/ProductsGrid'
import useProducts from '../../hooks/useProducts'
const CATEGORIES = [
  { name: 'All', icon: 'grid-outline' as const },
  { name: 'Electronics', image: require('@/assets/images/desk.png') },
  { name: 'Fashion', image: require('@/assets/images/desk.png') },
  { name: 'Sports', image: require('@/assets/images/desk.png') },
  {name:'Books', image: require('@/assets/images/desk.png')}
]
const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { data: products, isLoading, isError } = useProducts()
  console.log('products', products)
  const filteredProducts = useMemo(() => {
    if (!products) return []
    let filtered = products
    if (selectedCategory !== 'All') {
      filtered= filtered.filter(product=>product.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      filtered= filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return filtered
  },[products, selectedCategory, searchQuery])
  return (
    <SafeScreen>
      <ScrollView style={styles.contentScroll} contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View >
              <Text style={styles.leftContainer}>shop</Text>
              <Text style={styles.rightContainer}>browse all products</Text>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Ionicons name='options-outline' size={22} color={'#fff'}></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={styles.search}>
            <Ionicons color={'#666'} size={22} name='search'></Ionicons>
            <TextInput placeholder='search products' placeholderTextColor={'#666'}
            style={styles.textInput} value={searchQuery} onChangeText={setSearchQuery}></TextInput>
          </View>
        </View>
        <View style={styles.category}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}>
            {CATEGORIES.map(category => {
              const isSelected = selectedCategory === category.name
              return (
                isSelected ?
                  <>
                              <TouchableOpacity key={category.name} style={styles.categoryButton} onPress={() => setSelectedCategory(category.name)}>
                  {category.icon ? (<Ionicons name={category.icon} size={36}
                    color={isSelected ? '#121212' : '#fff'}></Ionicons>)
                    : (<Image source={category.image} style={styles.imageSize} resizeMode='contain'></Image>)   }</TouchableOpacity></> : <>                <TouchableOpacity key={category.name} style={styles.categoryButtonSelected} onPress={() => setSelectedCategory(category.name)}>
                  {category.icon ? (<Ionicons name={category.icon} size={36}
                    color={isSelected ? '#121212' : '#fff'}></Ionicons>)
                    : (<Image source={category.image} style={styles.imageSize} resizeMode='contain'></Image>)   }</TouchableOpacity>
                </>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.categoryFilter}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>products</Text>
            <Text style={styles.categoryTextSecondary}>{filteredProducts.length} items</Text>
          </View>
          <ProductsGrid products={filteredProducts} isLoading={isLoading} isError={isError}></ProductsGrid>
        </View>
      </ScrollView>
      <Text style={styles.text}>ShopScreen</Text>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  categoryFilter: {
    paddingHorizontal: 10,
    marginBottom:12
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginBottom:12
  },
  categoryText: {
    color: COLORS.textprimary,
    fontSize: 22,
    fontWeight:'bold'
  },
  categoryTextSecondary: {
    color: COLORS.textsecondary,
    fontSize: 14
  },
  imageSize: {
    width:60,
    height:60
  },
  categoryButton: {
    marginRight: 7,
    borderRadius: 30,
    width: 75,
    height: 75,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.primary
    // backgroundColor:COLORS.surface
  },
  categoryButtonSelected: {
    marginRight: 7,
    borderRadius: 30,
    width: 75,
    height: 75,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:COLORS.primary
    backgroundColor:COLORS.surface
  },
  category: {
    marginBottom:10
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
        fontSize: 16,
        lineHeight:24,
color:COLORS.textprimary
  },
  search: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius:20
  },
  button: {
    backgroundColor: 'rgb(79, 82, 83/0.5)',
    padding: 10,
    borderRadius: 100,
    // width: 50,
    // height:50
  },
  leftContainer: {
    color: COLORS.textprimary,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing:0.5
  },
  rightContainer: {
    color: COLORS.textsecondary,
    fontSize: 15,
    marginTop:10
  },
  text: {
    color:'white'
  },
  contentScroll: {
    flex: 1
  },
  container: {
    paddingBottom: 6,
    paddingHorizontal: 10,
    paddingTop:10
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:10
  }
})
export default ShopScreen

