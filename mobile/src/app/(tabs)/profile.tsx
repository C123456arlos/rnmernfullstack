import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SafeScreen from '../../../components/SafeScreen'

const ProfileScreen = () => {
  return (
    <SafeScreen>
      <Text style={styles.text}>ProfileScreen</Text>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  text: {
    color:'white'
  }
})
export default ProfileScreen

// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import SafeScreen from '../../../components/SafeScreen'

// const ProfileScreen = () => {
//   return (
//     <SafeScreen>
//       <Text style={styles.text}>ProfileScreen</Text>
//     </SafeScreen>
//   )
// }
// const styles = StyleSheet.create({
//   text: {
//     color:'white'
//   }
// })
// export default ProfileScreen