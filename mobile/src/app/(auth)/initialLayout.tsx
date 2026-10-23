// import { useAuth } from '@clerk/clerk-expo'
// import { Stack, useRouter, useSegments } from 'expo-router'
// import { useEffect } from 'react'


// export default function initialLayout() {
//     const { isLoaded, isSignedIn } = useAuth()
//     const segments = useSegments()
//     const router = useRouter()
//     useEffect(() => {
//         if (!isLoaded) return
//         const inAuthScreen = segments[0] === '(auth)'
//         if (!isSignedIn && !inAuthScreen) router.replace('/(auth)/login')
//         else if(isSignedIn && inAuthScreen) router.replace('./')
//     }, [isLoaded, isSignedIn, segments])
//     if (!isLoaded) return null
//     return <Stack></Stack>
// }

import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth()
    console.log(isSignedIn)
    if(!isLoaded) return null
    if (isSignedIn) {
        return <Redirect href={'/(tabs)'}></Redirect>
    }
    return <Stack screenOptions={{headerShown:false}}></Stack>
}
