import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Order } from '../types'
import { COLORS } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
interface RatingModalProps{
    visible: boolean
    onClose: () => void
    order: Order | null
    productRatings: { [key: string]: number }
    onRatingChange:(productId:string, rating:number)=>void
    onSubmit: () => void
    isSubmitting:boolean
}
const RatingModal = ({ visible, onClose, order, productRatings, onRatingChange, onSubmit, isSubmitting }:
    RatingModalProps
) => {
  return (
    <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
          <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.layer}>
                  <TouchableWithoutFeedback>
                      <View style={styles.content}>
                          <View style={styles.container}>
                              <View style={styles.icon}>
                                  <Ionicons name='star' size={32} color='#1db954'></Ionicons>
                              </View>
                              <Text style={styles.txt}>rate your products</Text>
                              <Text style={styles.rate}>rate each product from your order</Text>
                          </View>
                          <ScrollView style={styles.txtContainer}>
                              {order?.orderItems.map((item, index) => {
                                  const productId = item.product._id
                                  const currentRating= productRatings[productId] ||0
                                  return (
                                      index < order.orderItems.length - 1 ? 
                                          <View key={item._id} style={styles.current}>
                                              <View style={styles.rateTxt}>
                                                  <Image source={item.image} style={{
                                                      height: 64, width: 64,
                                                      borderRadius:8
                                                  }}></Image>
                                                  <View style={styles.img}>
                                                      <Text style={styles.imgTxt} numberOfLines={2}>
                                                          {item.name}
                                                      </Text>
                                                      <Text style={styles.nameTxt}>
                                                          qty {item.quantity} * ${item.price.toFixed(2)}
                                                      </Text>
                                                  </View>
                                              </View>
                                                    <View style={styles.rating}>
                                                  {[1, 2, 3, 4, 5].map(star =>
                                                  (<TouchableOpacity key={star}
                                                      onPress={() => onRatingChange(productId, star)}
                                                      activeOpacity={0.7} style={styles.margin}>
                                                      <Ionicons name={star <= currentRating ? 'star' : 'star-outline'}
                                                          size={32} color={star <= currentRating 
                                                              ?'#1db954':'#666'
                                                          }></Ionicons>
                                                      </TouchableOpacity>)
                                                  )}
                                              </View>
                                      </View>
                                      :
                                          <View key={item._id} style={styles.currentTxt}>
                                                 <View style={styles.rateTxt}>
                                                  <Image source={item.image} style={{
                                                      height: 64, width: 64,
                                                      borderRadius:8
                                                  }}></Image>
                                                  <View style={styles.img}>
                                                      <Text style={styles.imgTxt} numberOfLines={2}>
                                                          {item.name}
                                                      </Text>
                                                      <Text style={styles.nameTxt}>
                                                          qty {item.quantity} * ${item.price.toFixed(2)}
                                                      </Text>
                                                  </View>
                                              </View>
                                              <View style={styles.rating}>
                                                  {[1, 2, 3, 4, 5].map(star =>
                                                  (<TouchableOpacity key={star}
                                                      onPress={() => onRatingChange(productId, star)}
                                                      activeOpacity={0.7} style={styles.margin}>
                                                      <Ionicons name={star <= currentRating ? 'star' : 'star-outline'}
                                                          size={32} color={star <= currentRating 
                                                              ?'#1db954':'#666'
                                                          }></Ionicons>
                                                      </TouchableOpacity>)
                                                  )}
                                              </View>
                                      </View>
                                  )
                              })}
                          </ScrollView>
                          <View style={styles.btn}>
                              <TouchableOpacity style={styles.submit} activeOpacity={0.8}
                                  onPress={onSubmit} disabled={isSubmitting}>
                                  {isSubmitting ? (<ActivityIndicator size='small' color={'#121212'}></ActivityIndicator>) : (
                                      <Text style={styles.txtBtn}>submit all ratings</Text>
                                  )}
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7}
                                  onPress={onClose} disabled={isSubmitting}>
                                      <Text style={styles.cancel}>cancel</Text>
                                </TouchableOpacity>
                          </View>
                      </View>
                  </TouchableWithoutFeedback>
              </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
    cancelBtn: {
        backgroundColor: COLORS.lighter,
        borderRadius: 20,
        paddingVertical: 8,
        alignItems: 'center',
        borderColor:COLORS.lighter
    },
    cancel: {
        color: COLORS.textsecondary,
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight:12
    },
    txtBtn: {
        color: COLORS.background,
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight:12
    },
    submit: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems:'center'
    },
    btn: {
        gap:7
    },
    margin: {
        marginHorizontal:4
    },
    rating: {
        flexDirection: 'row',
        justifyContent:'center'
    },
    nameTxt: {
        color: COLORS.textsecondary,
        fontSize: 10,
        marginTop:3
    },
    img: {
        flex: 1,
        marginLeft:8
    },
    imgTxt: {
        color: COLORS.textprimary,
        fontWeight: 'semibold',
        fontSize:15
    },
    rateTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:6
    },
    current: {
        backgroundColor: COLORS.lighter,
        borderRadius: 20,
        padding: 8,
        marginBottom:8
    },
    currentTxt: {
        backgroundColor: COLORS.lighter,
        borderRadius: 20,
        padding: 8
    },
    txtContainer: {
        marginBottom:10
    },
    rate: {
        color: COLORS.textsecondary,
        textAlign: 'center',
        fontSize:12
    },
    txt: {
        color: COLORS.textprimary,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:3
    },
    icon: {
        backgroundColor: '#1db954aa',
        borderRadius: 100,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:6
    },
    container: {
        alignItems: 'center',
        marginBottom:8
    },
    content: {
        backgroundColor: COLORS.surface,
        borderRadius: 30,
        padding: 12,
        // maxWidth: 500,
        width: 300,
        height:500
        // maxHeight:500
    },
    layer: {
        flex: 1,
        backgroundColor: 'rgb(79, 82, 83/0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:8
    }
})
export default RatingModal