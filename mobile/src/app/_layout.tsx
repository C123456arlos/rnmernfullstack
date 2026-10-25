import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { SplashScreen, Stack, Tabs } from 'expo-router'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import InitialLayout from './(auth)/initialLayout'
import { Ionicons } from '@expo/vector-icons'

import * as Sentry from "@sentry/react-native";
// Sentry.init({
//   dsn: "https://c07c1906753d70734c21fe2780ee436f@o4512098219589632.ingest.us.sentry.io/4512313413730304",
//    sendDefaultPii: true,
//   replaysSessionSampleRate: 1.0,
//   replaysOnErrorSampleRate: 1.0,
//   integrations: [Sentry.mobileReplayIntegration()],
// });
// throw new Error("error");

Sentry.init({
  dsn: 'https://c07c1906753d70734c21fe2780ee436f@o4512098219589632.ingest.us.sentry.io/4512313413730304',
  
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  
  // Enable Logs
  enableLogs: true,
  
  // Configure Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1,

  integrations: [Sentry.mobileReplayIntegration({
      maskAllText: false,
  maskAllImages: false,
    maskAllVectors: false,
  screenshotStrategy:'canvas'
  })],
  
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
// // Sentry.getReplay()?.start()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'missing publishable key please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
} const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      Sentry.captureException(error, {
        tags: {
          type: 'react-query-error',
          queryKey:query.queryKey[0]?.toString() || 'unknown'
        },
        extra: {
          errorMessage: error.message, 
          statusCode:error.response?.status
        }
      })
    }
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      Sentry.captureException(error, {
        tags: { type: 'react-query-mutation-error' },
        extra: {
          errorMessage: error.message,
          statusCode:error.response?.status
        }
      })
    }
  })
})
 function RootLayout() {
  
  return (
    <QueryClientProvider client={queryClient}>
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
       <Stack screenOptions={{headerShown:false}}></Stack>  </ClerkProvider>
        </QueryClientProvider>
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
    // import { Stack } from "expo-router";
    // import '../../global.css'
    // import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    // import { ClerkProvider } from '@clerk/clerk-expo'
    // import { tokenCache } from "@clerk/clerk-expo/token-cache"
    // const queryClient= new QueryClient()
    // export default function RootLayout() {
      //   return (
        //     <ClerkProvider tokenCache={tokenCache}>
        //     <QueryClientProvider client={queryClient}>
        //       <Stack screenOptions={{
          //         headerShown:false
          //       }}></Stack>
          //     </QueryClientProvider>
          //       </ClerkProvider>
          //   )
          
// }
export default Sentry.wrap(RootLayout)