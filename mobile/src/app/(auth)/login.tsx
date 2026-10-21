import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useSocialAuth from '../../../hooks/useSocialAuth'

export default function Login() {
    const { startSSOFlow } = useSSO()
      const { isLoading, handleSocialAuth } = useSocialAuth()
    const router=useRouter()
    const handleGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' })
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId })
                router.replace('./')
            }
        } catch (error) {
            console.log('oauth error', error)
        }
    }

  return (
    <View  style={styles.container}>
      <Image source={require('../../../assets/images/desk.png')}
        resizeMode={'contain'} style={styles.mainCenter}></Image>
      <View style={styles.subContainer}>
        <TouchableOpacity style={[styles.button, {shadowOffset:{width:0, height:1},
            shadowOpacity: 0.1,
            elevation:2}]} onPress={handleGoogleSignIn}
        // border-gray-300 rounded-full px-6 py-2' onPress={() => handleSocialAuth('oauth_google')}
          // disabled={isLoading}

        >
          {isLoading ? (<ActivityIndicator size={'small'} color={'#4285f4'}></ActivityIndicator>) : (
            <View style={styles.buttonDiv}>
              <Image source={require('../../../assets/images/google.png')}
                style={styles.logo} resizeMode='contain'></Image>
              <Text style={styles.buttonText}>continue with google</Text>
            </View>
          )}
        </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {shadowOffset:{width:0, height:1},
            shadowOpacity: 0.1,
            elevation:2}]}
          onPress={()=>handleSocialAuth('oauth_apple')}
          disabled={isLoading}
    
        >
          {isLoading ? (<ActivityIndicator size={'small'} color={'#4285f4'}></ActivityIndicator>) : (
            <View style={styles.buttonDiv}>
              <Image source={require('../../../assets/images/apple-logo.png')}
                style={styles.logo} resizeMode='contain'></Image>
              <Text style={styles.buttonText} className='size-3'>continue with apple</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.textTerms}>by signing up you agree to our <Text style={styles.textColor}>terms{', '}</Text>
        <Text style={styles.textColor}>privacy policy</Text>{', and'}
      <Text style={styles.textColor}>cookie use</Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  subContainer: {
    gap: 3,
    marginTop:3
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 'full',
    paddingHorizontal: 6,
    paddingVertical:2
  },
  buttonDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight:500
  },
  textTerms: {
    alignItems: 'center',
    color: 'grey',
    fontSize: 15,
    lineHeight: 26,
    marginTop: 6,
    paddingHorizontal:2
  },
  textColor: {
    color:'rgb(43, 159, 226)'
  },
  logo: {
    width: 30,
    height:30,
    marginRight:3
  },
  mainCenter: {
    width: 250,
    height:250
  }
})
