import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { SplashScreen, Stack, Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import InitialLayout from './(auth)/initialLayout'
import { Ionicons } from '@expo/vector-icons'
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'missing publishable key please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

export default function RootLayout() {

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
        
       <Stack screenOptions={{headerShown:false}}></Stack>
     
      

  

      </ClerkProvider>
  
      
      )
}

// import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
// import { tokenCache } from '@clerk/clerk-expo/token-cache'
// import { ConvexReactClient } from 'convex/react'
// import { ConvexProviderWithClerk } from 'convex/react-clerk'
// import { useFonts } from 'expo-font'
// import * as NavigationBar from 'expo-navigation-bar'
// import { SplashScreen } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { useCallback, useEffect } from 'react'
// import { Platform } from 'react-native'
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
// import InitialLayout from '../../src/app/(auth)/initialLayout'
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
// const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
//     unsavedChangesWarning:false
// })
// if (!publishableKey) {
//   throw new Error(
//     'missing publishable key please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
//   )
// }

// export default function RootLayout() {

//   return (
//     <ClerkProvider
//       tokenCache={tokenCache}
//       publishableKey={publishableKey}>
//       <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
//       <ClerkLoaded>
//         <SafeAreaProvider>
      
//      <InitialLayout></InitialLayout>
      
//           </SafeAreaProvider>
//           <StatusBar style='light'></StatusBar>
//       </ClerkLoaded>
//               </ConvexProviderWithClerk>
//       </ClerkProvider>
  
      
//       )
// }

// import { Redirect, Stack, Tabs } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons'
// import { useAuth } from '@clerk/clerk-expo'
// const TabsLayout = () => {
//     const { isSignedIn, isLoaded } = useAuth()
//     if (!isLoaded) return null
//     if(!isSignedIn) return <Redirect href={'/(auth)/login'}></Redirect>
//   return (
// <Stack></Stack>
//   )
// }

// export default TabsLayout