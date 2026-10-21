import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import InitialLayout from './(auth)/initialLayout'
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning:false
})
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
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
      <ClerkLoaded>
        <SafeAreaProvider>
      
     <InitialLayout></InitialLayout>
      
          </SafeAreaProvider>
          <StatusBar style='light'></StatusBar>
      </ClerkLoaded>
              </ConvexProviderWithClerk>
      </ClerkProvider>
  
      
      )
}

