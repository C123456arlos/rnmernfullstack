import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeScreen from '../../../components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import { useAuth, useUser } from '@clerk/clerk-expo'
const CartScreen = () => {
  const { signOut } = useAuth()
  const{ user }= useUser()
  return (
 <TouchableOpacity style={{paddingTop:100}} activeOpacity={0.8} onPress={() => signOut()}>
          <Ionicons name='log-out-outline' size={22} color={"#ef4444"}></Ionicons>
          <Text >sign out</Text>
        </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  text: {
    color:'white'
  }
})

export default CartScreen