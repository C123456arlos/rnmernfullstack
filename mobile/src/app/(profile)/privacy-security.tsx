import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import SafeScreen from '../../../components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../constants/colors'
import { router } from 'expo-router'
type SecurityOption = {
  id: string
  icon: string
  title: string
  description: string
  type: 'navigation' | 'toggle'
  value?:boolean
}
const PrivacyAndSecurity = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [shareData, setShareData] = useState(false)
  const securitySettings: SecurityOption[] = [
    {
      id: 'password',
      icon: 'lock-closed-outline',
      title: 'change password',
      description: 'update your account password',
      type:'navigation'
    },
    {
      id: 'two-factor',
      icon: 'shield-checkmark-outline',
      title: 'two factor authentication',
      description: 'add an extra layer of security',
      type: 'toggle',
      value:twoFactorEnabled
    },
    {
      id: 'biometric',
      icon: 'finger-print-outline',
      title: 'biometric login',
      description: 'use face id or touch id',
      type: 'toggle',
      value:biometricEnabled
    } 
  ]
  const privacySettings: SecurityOption[] = [
    {
      id: 'push',
      icon: 'notifications-outline',
      title: 'push notifications', 
      description: 'receive push notifiactions',
      type: 'toggle',
      value:pushNotifications
    },
    {
      id: 'email',
      icon: 'mail-outline',
      title: 'email notifications',
      description: 'receive order updates via email',
      type: 'toggle',
      value:emailNotifications
    },
    {
      id: 'marketing',
      icon: 'megaphone-outline',
      title: 'marketing emails',
      description: 'receive promotional emails',
      type: 'toggle',
      value:marketingEmails
    },
    {
      id: 'data',
      icon: 'analytics-outline',
      title: 'share usage data',
      description: 'help us improve the app',
      type: 'toggle',
      value:shareData
    }
  ]
  const accountSettings = [
    {
      id: 'activity', 
      icon: 'time-outline',
      title: 'account activity',
      description:'view recent activity'
    },
    {
      id: 'devices',
      icon: 'phone-portrait-outline',
      title: 'connected devices',
      description:'manage devices with access'
    },
    {
      id: 'data-download',
      icon: 'download-outline',
      title: 'download your data',
      description:'get a copy of your data'
    }
  ]
  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case 'two-factor':
        setTwoFactorEnabled(value)
        break;
      case 'biometric':
        setBiometricEnabled(value)
        break;
      case 'push':
        setPushNotifications(value)
        break;
      case 'email':
        setEmailNotifications(value)
        break;
      case 'marketing':
        setMarketingEmails(value)
        break;
      case 'data':
        setShareData(value)
        break;
    }
  }
  return (
    <SafeScreen>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.margin}>
          <Ionicons name='arrow-back' size={28} color={'#fff'}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.txt}>privacy and security</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.security}>
          <Text style={styles.securityTxt}>security</Text>
          {securitySettings.map(setting => (
            <TouchableOpacity key={setting.id} style={styles.btn}
              activeOpacity={setting.type === 'toggle' ? 1 : 0.7}>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <Ionicons name={setting.icon as any} size={24} color='#1db954'></Ionicons>
                </View>
                <View style={styles.tab}>
                  <Text style={styles.element}>{setting.title}</Text>
                <Text style={styles.textTab}>{setting.description}</Text>
                </View> 
                {
                  setting.type === "toggle" ? (
                    <Switch value={setting.value}
                      onValueChange={(value) => handleToggle(setting.id, value)}
                      thumbColor={'#ffffff'} trackColor={{ false: '#2a2a2a', true: '#1db954' }}
                      ios-backgroundColor={'purple'}></Switch>
                  ) : (
                      <Ionicons name='chevron-forward' size={20} color='#666'
                     ></Ionicons>
                  )
                }
              </View>
              </TouchableOpacity>
          ))}
        </View>
        <View style={sectionStyles.section}>
          <Text style={sectionStyles.container}>privacy</Text>
            {
              privacySettings.map((setting) => (
                <TouchableOpacity key={setting.id} style={styles.btn}>
                          <View style={sectionStyles.setting}>
                    <View style={sectionStyles.settingContainer}>
                      <View style={sectionStyles.settingSection}>
                        <Ionicons name={setting.icon as any} size={24}
                        color={'#1db954'}></Ionicons>
                      </View>
                      <View style={styles.content}>
                        <Text style={sectionStyles.title}>{setting.title}</Text>
                        <Text style={sectionStyles.desc}>{setting.description}</Text>
                      </View>
                      <Switch value={setting.value}
                        onValueChange={(value) => handleToggle(setting.id, value)}
                      trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch>
          </View>
          </View>
                </TouchableOpacity>
              ))
            }
        </View>
        <View style={sectionStyles.section}>
          <Text style={sectionStyles.container}>account</Text>
            {
              accountSettings.map((setting) => (
                <TouchableOpacity key={setting.id} style={styles.btn}>
                          <View style={sectionStyles.setting}>
                    <View style={sectionStyles.settingContainer}>
                      <View style={sectionStyles.settingSection}>
                        <Ionicons name={setting.icon as any} size={24}
                        color={'#1db954'}></Ionicons>
                      </View>
                      <View style={styles.content}>
                        <Text style={sectionStyles.title}>{setting.title}</Text>
                        <Text style={sectionStyles.desc}>{setting.description}</Text>
                      </View>
                      {/* <Switch value={setting.value}
                        onValueChange={(value) => handleToggle(setting.id, value)}
                      trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch> */}
                    <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
                    </View>
          </View>
                </TouchableOpacity>
              ))
            }
        </View>
        <View style={sectionStyles.section}>
                <TouchableOpacity >
                          <View style={sectionStyles.setting}>
                    <View style={sectionStyles.settingContainer}>
                      <View style={sectionStyles.settingSection}>
                        <Ionicons name={'trash-outline'} size={24}
                        color={'#ef4444'}></Ionicons>
                      </View>
                      <View style={styles.content}>
                        <Text style={sectionStyles.title}>delete account</Text>
                        <Text style={sectionStyles.desc}>permanently delete your account</Text>
                      </View>
                      {/* <Switch value={setting.value}
                        onValueChange={(value) => handleToggle(setting.id, value)}
                      trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch> */}
                    <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
                    </View>
          </View>
                </TouchableOpacity>
         
        </View>
        <View style={sectionStyles.section}>
                <TouchableOpacity >
                          <View style={sectionStyles.settingLabel}>
                    <View style={sectionStyles.settingContainer}>
              
                      <View style={styles.content}>
                        <Text style={sectionStyles.desc}>we take your privacy seriously your data 
                    is encrypted and stored securely you can manage your privacy settings at any time</Text>
                      </View>
                    <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
                    </View>
          </View>
                </TouchableOpacity>
         
        </View>
        {/* <View style={sectionStyles.section}>
                          <View style={sectionStyles.settingLabel}>
                    <View style={sectionStyles.settingContainer}>
                      <View style={sectionStyles.settingSection}>
                        <Ionicons name={'information-circle-outline'} size={24}
                        color={'#1db954'}></Ionicons>
                      </View>
                      <View style={sectionStyles.descLabel}>
                  <Text style={sectionStyles.textLabel}>we take your privacy seriously your data 
                    is encrypted and stored securely you can manage your privacy settings at any time
                        </Text>
                      </View>
                    </View>
                    
          </View>
        </View> */}
      </ScrollView>
    </SafeScreen>
  )
}
const sectionStyles = StyleSheet.create({
    settingLabel: {
    backgroundColor:  '#8ccaa2',
    borderRadius: 8,
    padding: 8,
    marginBottom:6
  },
  sectionLabel: {
    backgroundColor:'red'
  },
  descLabel: {
    paddingVertical: 15,
    
  },
  desc: {
    color: COLORS.textsecondary,
    fontSize:12
  },
  description: {
    backgroundColor: COLORS.primarylight,
    fontSize:18
  },
  title: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginBottom:2
  },
  settingSection: {
    backgroundColor: '#1db9546b',
    borderRadius: 100,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:8
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  setting: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 8,
    marginBottom:6
  },
  section: {
    paddingHorizontal: 12,
    paddingTop:8
  },
  container: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:8
  }
})
const styles = StyleSheet.create({
  textTab: {
    color: COLORS.textsecondary,
    fontSize:12
  },
  tab: {
    flex:1
  },
  element: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginBottom:2
  },
  icon: {
    backgroundColor: '#1db9546b',
    borderRadius: 100,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:8
  },
  card: {
    flexDirection: 'row',
    alignItems:'center'
  },
  content: {
    flex: 1,
  },
  security: {
    paddingHorizontal: 12,
    paddingTop:12
  },
  securityTxt: {
    color: COLORS.textprimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:8
  },
  btn: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 8,
    marginBottom:6
  },
  container: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderColor: COLORS.surface,
    flexDirection: 'row',
    alignItems:'center'
  },
  margin: {
    marginRight:8
  },
  txt: {
    color: COLORS.textprimary,
    fontSize: 20,
    fontWeight:'bold'
  }
})
export default PrivacyAndSecurity
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native'
// import React, { useState } from 'react'
// import SafeScreen from '../../../components/SafeScreen'
// import { Ionicons } from '@expo/vector-icons'
// import { COLORS } from '../../../constants/colors'
// import { router } from 'expo-router'
// type SecurityOption = {
//   id: string
//   icon: string
//   title: string
//   description: string
//   type: 'navigation' | 'toggle'
//   value?:boolean
// }
// const PrivacyAndSecurity = () => {
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
//   const [biometricEnabled, setBiometricEnabled] = useState(true)
//   const [pushNotifications, setPushNotifications] = useState(true)
//   const [emailNotifications, setEmailNotifications] = useState(true)
//   const [marketingEmails, setMarketingEmails] = useState(false)
//   const [shareData, setShareData] = useState(false)
//   const securitySettings: SecurityOption[] = [
//     {
//       id: 'password',
//       icon: 'lock-closed-outline',
//       title: 'change password',
//       description: 'update your account password',
//       type:'navigation'
//     },
//     {
//       id: 'two-factor',
//       icon: 'shield-checkmark-outline',
//       title: 'two factor authentication',
//       description: 'add an extra layer of security',
//       type: 'toggle',
//       value:twoFactorEnabled
//     },
//     {
//       id: 'biometric',
//       icon: 'finger-print-outline',
//       title: 'biometric login',
//       description: 'use face id or touch id',
//       type: 'toggle',
//       value:biometricEnabled
//     } 
//   ]
//   const privacySettings: SecurityOption[] = [
//     {
//       id: 'push',
//       icon: 'notifications-outline',
//       title: 'push notifications', 
//       description: 'receive push notifiactions',
//       type: 'toggle',
//       value:pushNotifications
//     },
//     {
//       id: 'email',
//       icon: 'mail-outline',
//       title: 'email notifications',
//       description: 'receive order updates via email',
//       type: 'toggle',
//       value:emailNotifications
//     },
//     {
//       id: 'marketing',
//       icon: 'megaphone-outline',
//       title: 'marketing emails',
//       description: 'receive promotional emails',
//       type: 'toggle',
//       value:marketingEmails
//     },
//     {
//       id: 'data',
//       icon: 'analytics-outline',
//       title: 'share usage data',
//       description: 'help us improve the app',
//       type: 'toggle',
//       value:shareData
//     }
//   ]
//   const accountSettings = [
//     {
//       id: 'activity', 
//       icon: 'time-outline',
//       title: 'account activity',
//       description:'view recent activity'
//     },
//     {
//       id: 'devices',
//       icon: 'phone-portrait-outline',
//       title: 'connected devices',
//       description:'manage devices with access'
//     },
//     {
//       id: 'data-download',
//       icon: 'download-outline',
//       title: 'download your data',
//       description:'get a copy of your data'
//     }
//   ]
//   const handleToggle = (id: string, value: boolean) => {
//     switch (id) {
//       case 'two-factor':
//         setTwoFactorEnabled(value)
//         break;
//       case 'biometric':
//         setBiometricEnabled(value)
//         break;
//       case 'push':
//         setPushNotifications(value)
//         break;
//       case 'email':
//         setEmailNotifications(value)
//         break;
//       case 'marketing':
//         setMarketingEmails(value)
//         break;
//       case 'data':
//         setShareData(value)
//         break;
//     }
//   }
//   return (
//     <SafeScreen>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.margin}>
//           <Ionicons name='arrow-back' size={28} color={'#fff'}></Ionicons>
//         </TouchableOpacity>
//         <Text style={styles.txt}>privacy and security</Text>
//       </View>
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}>
//         <View style={styles.security}>
//           <Text style={styles.securityTxt}>security</Text>
//           {securitySettings.map(setting => (
//             <TouchableOpacity key={setting.id} style={styles.btn}
//               activeOpacity={setting.type === 'toggle' ? 1 : 0.7}>
//               <View style={styles.card}>
//                 <View style={styles.icon}>
//                   <Ionicons name={setting.icon as any} size={24} color='#1db954'></Ionicons>
//                 </View>
//                 <View style={styles.tab}>
//                   <Text style={styles.element}>{setting.title}</Text>
//                 <Text style={styles.textTab}>{setting.description}</Text>
//                 </View> 
//                 {
//                   setting.type === "toggle" ? (
//                     <Switch value={setting.value}
//                       onValueChange={(value) => handleToggle(setting.id, value)}
//                       thumbColor={'#ffffff'} trackColor={{ false: '#2a2a2a', true: '#1db954' }}
//                       ios-backgroundColor={'purple'}></Switch>
//                   ) : (
//                       <Ionicons name='chevron-forward' size={20} color='#666'
//                      ></Ionicons>
//                   )
//                 }
//               </View>
//               </TouchableOpacity>
//           ))}
//         </View>
//         <View style={sectionStyles.section}>
//           <Text style={sectionStyles.container}>privacy</Text>
//             {
//               privacySettings.map((setting) => (
//                 <TouchableOpacity key={setting.id} style={styles.btn}>
//                           <View style={sectionStyles.setting}>
//                     <View style={sectionStyles.settingContainer}>
//                       <View style={sectionStyles.settingSection}>
//                         <Ionicons name={setting.icon as any} size={24}
//                         color={'#1db954'}></Ionicons>
//                       </View>
//                       <View style={styles.content}>
//                         <Text style={sectionStyles.title}>{setting.title}</Text>
//                         <Text style={sectionStyles.desc}>{setting.description}</Text>
//                       </View>
//                       <Switch value={setting.value}
//                         onValueChange={(value) => handleToggle(setting.id, value)}
//                       trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch>
//           </View>
//           </View>
//                 </TouchableOpacity>
//               ))
//             }
//         </View>
//         <View style={sectionStyles.section}>
//           <Text style={sectionStyles.container}>account</Text>
//             {
//               accountSettings.map((setting) => (
//                 <TouchableOpacity key={setting.id} style={styles.btn}>
//                           <View style={sectionStyles.setting}>
//                     <View style={sectionStyles.settingContainer}>
//                       <View style={sectionStyles.settingSection}>
//                         <Ionicons name={setting.icon as any} size={24}
//                         color={'#1db954'}></Ionicons>
//                       </View>
//                       <View style={styles.content}>
//                         <Text style={sectionStyles.title}>{setting.title}</Text>
//                         <Text style={sectionStyles.desc}>{setting.description}</Text>
//                       </View>
//                       {/* <Switch value={setting.value}
//                         onValueChange={(value) => handleToggle(setting.id, value)}
//                       trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch> */}
//                     <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
//                     </View>
//           </View>
//                 </TouchableOpacity>
//               ))
//             }
//         </View>
//         <View style={sectionStyles.section}>
//                 <TouchableOpacity >
//                           <View style={sectionStyles.setting}>
//                     <View style={sectionStyles.settingContainer}>
//                       <View style={sectionStyles.settingSection}>
//                         <Ionicons name={'trash-outline'} size={24}
//                         color={'#ef4444'}></Ionicons>
//                       </View>
//                       <View style={styles.content}>
//                         <Text style={sectionStyles.title}>delete account</Text>
//                         <Text style={sectionStyles.desc}>permanently delete your account</Text>
//                       </View>
//                       {/* <Switch value={setting.value}
//                         onValueChange={(value) => handleToggle(setting.id, value)}
//                       trackColor={{false:'#2a2a2a', true:'#1db954'}} thumbColor={'#ffffff'}></Switch> */}
//                     <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
//                     </View>
//           </View>
//                 </TouchableOpacity>
         
//         </View>
//         <View style={sectionStyles.section}>
//                 <TouchableOpacity >
//                           <View style={sectionStyles.settingLabel}>
//                     <View style={sectionStyles.settingContainer}>
//                       <View style={sectionStyles.settingSection}>
//                         <Ionicons name={'trash-outline'} size={24}
//                         color={'#ef4444'}></Ionicons>
//                       </View>
//                       <View style={styles.content}>
//                         <Text style={sectionStyles.desc}>we take your privacy seriously your data 
//                     is encrypted and stored securely you can manage your privacy settings at any time</Text>
//                       </View>
//                     <Ionicons name='chevron-forward'  size={28} color={'#666'}></Ionicons>
//                     </View>
//           </View>
//                 </TouchableOpacity>
         
//         </View>
//         {/* <View style={sectionStyles.section}>
//                           <View style={sectionStyles.settingLabel}>
//                     <View style={sectionStyles.settingContainer}>
//                       <View style={sectionStyles.settingSection}>
//                         <Ionicons name={'information-circle-outline'} size={24}
//                         color={'#1db954'}></Ionicons>
//                       </View>
//                       <View style={sectionStyles.descLabel}>
//                   <Text style={sectionStyles.textLabel}>we take your privacy seriously your data 
//                     is encrypted and stored securely you can manage your privacy settings at any time
//                         </Text>
//                       </View>
//                     </View>
                    
//           </View>
//         </View> */}
//       </ScrollView>
//     </SafeScreen>
//   )
// }
// const sectionStyles = StyleSheet.create({
//     settingLabel: {
//     backgroundColor:  '#8ccaa2',
//     borderRadius: 20,
//     padding: 8,
//     marginBottom:6
//   },
//   sectionLabel: {
//     backgroundColor:'red'
//   },
//   descLabel: {
//     paddingVertical: 15,
    
//   },
//   desc: {
//     color: COLORS.textsecondary,
//     fontSize:12
//   },
//   description: {
//     backgroundColor: COLORS.primarylight,
//     fontSize:18
//   },
//   title: {
//     color: COLORS.textprimary,
//     fontWeight: 'bold',
//     fontSize: 12,
//     lineHeight: 15,
//     marginBottom:2
//   },
//   settingSection: {
//     backgroundColor: '#1db9546b',
//     borderRadius: 100,
//     width: 46,
//     height: 46,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight:8
//   },
//   settingContainer: {
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   setting: {
//     backgroundColor: COLORS.surface,
//     borderRadius: 0,
//     padding: 8,
//     marginBottom:6
//   },
//   section: {
//     paddingHorizontal: 12,
//     paddingTop:8
//   },
//   container: {
//     color: COLORS.textprimary,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom:8
//   }
// })
// const styles = StyleSheet.create({
//   textTab: {
//     color: COLORS.textsecondary,
//     fontSize:12
//   },
//   tab: {
//     flex:1
//   },
//   element: {
//     color: COLORS.textprimary,
//     fontWeight: 'bold',
//     fontSize: 12,
//     lineHeight: 15,
//     marginBottom:2
//   },
//   icon: {
//     backgroundColor: '#1db9546b',
//     borderRadius: 100,
//     width: 46,
//     height: 46,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight:8
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   content: {
//     flex: 1,
//   },
//   security: {
//     paddingHorizontal: 12,
//     paddingTop:12
//   },
//   securityTxt: {
//     color: COLORS.textprimary,
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom:8
//   },
//   btn: {
//     backgroundColor: COLORS.surface,
//     borderRadius: 10,
//     padding: 8,
//     marginBottom:6
//   },
//   container: {
//     paddingHorizontal: 12,
//     paddingBottom: 10,
//     borderBottomWidth: 5,
//     borderColor: COLORS.surface,
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   margin: {
//     marginRight:8
//   },
//   txt: {
//     color: COLORS.textprimary,
//     fontSize: 20,
//     fontWeight:'bold'
//   }
// })
// export default PrivacyAndSecurity
