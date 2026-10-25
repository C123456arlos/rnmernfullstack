import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@clerk/clerk-expo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'
const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()
    const insets= useSafeAreaInsets()
    if (!isLoaded) return null
    if(!isSignedIn) return <Redirect href={'/(auth)'}></Redirect>
  return (
      <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1db954',
        //   tabBarInactiveBackgroundColor: '#b3b3b3', 
          tabBarStyle: {
                            position: 'absolute',
              backgroundColor:  'rgb(79, 82, 83/0.5)',
            //   backgroundColor: 'transparent',
              borderTopWidth: 0,
              height: 32 + insets.bottom,
              marginHorizontal: 100,
              marginBottom: insets.bottom,
              paddingTop: 6,
              borderRadius: 28,
              overflow: 'hidden'
          },
          tabBarBackground:()=>{<BlurView intensity={80} tint='dark' style={StyleSheet.absoluteFill}></BlurView>},
          tabBarLabelStyle: {
              fontSize: 12,
              fontWeight:600
          }
      }}>
          <Tabs.Screen name='index' options={{
              title: 'Shop', tabBarIcon: ({ color, size }) => <Ionicons
              name='grid' size={size} color={color}></Ionicons>
          }}></Tabs.Screen>
          <Tabs.Screen name='cart' options={{
              title: 'Cart', tabBarIcon: ({ color, size }) => <Ionicons
              name='cart' size={size} color={color}></Ionicons>
          }}></Tabs.Screen>
          <Tabs.Screen name='profile' options={{ 
              title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons
              name='person' size={size} color={color}></Ionicons>
          }}></Tabs.Screen>
    </Tabs>
  )
}

export default TabsLayout