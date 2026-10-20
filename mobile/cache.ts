// import { TokenCache } from "@clerk/clerk-expo"
// import { TokenCache } from "@/cache"
// @ts-ignore
import { TokenCache } from "@clerk/clerk-expo/dist/cache"
// import { TokenCache } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { Platform } from "react-native"
const createTokenCache = (): TokenCache => {
    return {
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key)
                if (item) {
                    console.log(`${key} was used`)
                } else {
                    console.log('no values stored under' + key)
                }
                return
            } catch (error) {
                console.error('secure store get item error', error)
                await SecureStore.deleteItemAsync(key)
                return null
            }
        },
            saveToken: (key: string, token: string) => {
                return SecureStore.setItemAsync(key, token)
            }
        }
    }
    export const tokenCache= Platform.OS !== 'web' ?createTokenCache():undefined