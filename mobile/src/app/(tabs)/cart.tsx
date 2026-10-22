import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SafeScreen from '../../../components/SafeScreen'

const CartScreen = () => {
  return (
    <SafeScreen>
      <Text style={styles.text}>CartScreen</Text>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  text: {
    color:'white'
  }
})

export default CartScreen