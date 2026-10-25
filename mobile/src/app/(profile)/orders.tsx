import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SafeScreen from '../../../components/SafeScreen'

const Orders = () => {
  return (
    <SafeScreen>
      <Text style={styles.text}>Orders</Text>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  text: {
    color:'white'
  }
})
export default Orders
