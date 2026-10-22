import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@clerk/clerk-expo'
const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) return null
    if(!isSignedIn) return <Redirect href={'/(auth)/login'}></Redirect>
  return (
    <Tabs>
          <Tabs.Screen name='index' options={{
              title: 'Shop', tabBarIcon: ({ color, size }) => <Ionicons
              name='grid'></Ionicons>
          }}></Tabs.Screen>
          <Tabs.Screen name='cart' options={{
              title: 'Cart', tabBarIcon: ({ color, size }) => <Ionicons
              name='cart'></Ionicons>
          }}></Tabs.Screen>
          <Tabs.Screen name='profile' options={{
              title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons
              name='person'></Ionicons>
          }}></Tabs.Screen>
    </Tabs>
  )
}

export default TabsLayout