import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {Image} from 'expo-image'
import SafeScreen from '../../../components/SafeScreen'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
const MENU_ITEMS = [
  { id: 1, icon: 'person-outline', title: 'edit profile', color: '#3b82f6', action: '/profile' },
  { id: 2, icon: 'list-outline', title: 'orders', color: '#10b981', action: '/orders' },
  { id: 3, icon: 'location-outline', title: 'addresses', color: '#f59e0b', action: '/addresses' },
  {id:4, icon:'heart-outline', title:'wishlist', color:'#ef4444', action:'/wishlist'}
] as const
const ProfileScreen = () => {
  const { signOut } = useAuth()
  const{ user }= useUser()
  const handleMenuPress = (action: (typeof MENU_ITEMS)[number]['action']) => {
    if (action === '/profile') return 
    router.push(action)
  }
  return (
    <SafeScreen>
      <ScrollView style={styles.containerList} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerItems}>
              <View style={styles.imageContainer}>
                <Image source={user?.imageUrl} style={{ width: 80, height: 80, borderRadius: 40 }}
                  transition={200}></Image>
                <View style={styles.imageIcon}>
                  <Ionicons name='checkmark' size={16} color='#121212'></Ionicons>
                </View>
              </View>
              <View style={styles.userContainer}>
                <Text style={styles.userText}>
                    {user?.firstName} {user?.lastName}
                </Text>
                <Text style={styles.textUser}>
                  {user?.emailAddresses?.[0]?.emailAddress || 'no email'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.menuItems}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.items, { width: '48%' }]}
              activeOpacity={0.7} onPress={() => handleMenuPress(item.action)}>
              <View style={[styles.icon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={28} color={item.color}></Ionicons>
              </View>
              <Text style={styles.iconTitle}>{item.title}</Text>
              </TouchableOpacity>
          ))}
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <View style={styles.notificationCard}>
              <Ionicons name='notifications-outline' size={22} color='#ffffff'></Ionicons>
              <Text style={styles.notificationText}>notifications</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color={'#666'}></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.privacy}>
          <TouchableOpacity style={styles.privacyText} activeOpacity={0.7}
            onPress={() => router.push('/privacy-security')}
          >
            <View style={styles.notificationCard}>
              <Ionicons name='shield-checkmark-outline' size={22} color='#ffffff'></Ionicons>
              <Text style={styles.notificationText}>privacy and security</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#666'></Ionicons>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout} activeOpacity={0.8} onPress={() => signOut()}>
          <Ionicons name='log-out-outline' size={22} color={"#ef4444"}></Ionicons>
          <Text style={styles.logoutText}>sign out</Text>
        </TouchableOpacity>
        <Text style={styles.version}>version 1.0.0</Text>
      </ScrollView>
    </SafeScreen>
  )
}
const styles = StyleSheet.create({
  version: {
    marginHorizontal: 10,
    textAlign: 'center',
    color: COLORS.textsecondary,
    fontSize:12
  },
  logout: {
    marginHorizontal: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor:'rgba(33, 33, 33/0.3)'
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft:6
  },
  privacy: {
    marginBottom: 6,
    marginHorizontal: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding:8
  },
  privacyText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:12
  },
  notificationContainer: {
    marginBottom: 6,
    marginHorizontal: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding:8
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:12
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems:'center'
  },
  notificationText: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    marginLeft:6
  },
  iconTitle: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize:18
  },
  icon: {
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent:'center'
  },
  items: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  menuItems: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 7,
    marginBottom: 5
  },
  userContainer: {
    flex: 1,
    marginLeft:10
  },
  userText: {
    color: COLORS.textprimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom:6
  },
  textUser: {
    color: COLORS.textsecondary,
    fontSize:15
  },
  containerList: {
    flex:1
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom:12
  },
  headerContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding:15
  },
  headerItems: {
    flexDirection: 'row',
    alignItems:'center'
  },
  imageContainer: {
    position: 'relative',
    marginLeft:10
  },
  imageIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor:COLORS.surface
  },
  text: {
    color:'white'
  }
})
export default ProfileScreen
