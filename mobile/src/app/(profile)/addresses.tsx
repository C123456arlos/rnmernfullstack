import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useAddresses } from '../../../hooks/useAddresses'
import SafeScreen from '../../../components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../constants/colors'
import AddressHeader from '../../../components/AddressHeader'
import { Address } from '../../../types'
import AddressFormModal from '../../../components/AddressFormModal'
import AddressCard from '../../../components/AddressCard'

const Addresses = () => {
  const { addAddress, addresses, deleteAddress, isAddingAddress, isDeletingAddress, updateAddress,
    isError, isLoading, isUpdatingAddress } = useAddresses()
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressForm, setAddressForm] = useState({
    label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '', phoneNumber: '',
    isDefault:true
  })
  const handleAddAddress = () => { 
    setShowAddressForm(true)
    setEditingAddressId(null)
    setAddressForm({
      label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '',
      phoneNumber:'', isDefault:true
     })
  }
  const handleEditAddress = (address: Address) => {
    setShowAddressForm(true)
    setEditingAddressId(address._id)
    setAddressForm({
      label: address.label, fullName: address.fullName, streetAddress: address.streetAddress, city: address.city,
      state: address.state, zipCode: address.zipCode, phoneNumber: address.phoneNumber,
      isDefault: address.isDefault
    })
   }
  const handleDeleteAddress = (addressId:string, label:string) => {
    Alert.alert('delete address', `are you sure you want to delete ${label}`, [
      { text: 'cancel', style: 'cancel' },
      { text: 'delete', style: 'destructive', onPress:()=>deleteAddress(addressId) }
    ])
   }
  const handleSaveAddress = () => { 
    if (!addressForm.label || !addressForm.fullName || !addressForm.streetAddress || !addressForm.city
      || !addressForm.state || !addressForm.zipCode || !addressForm.phoneNumber
    ) {
      Alert.alert('error', 'please fill all the fields')
      return
    }
    if (editingAddressId) {
      updateAddress({
        addressId: editingAddressId,
        addressData:addressForm
      }, {
        onSuccess: () => {
          setShowAddressForm(false)
          setEditingAddressId(null)
          Alert.alert('success', 'address updated successfully')
        },
        onError: (error: any) => {
          Alert.alert('error', error?.response?.data?.error || 'failed to update address')
      }})
    } else {
      addAddress(addressForm

        // { label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '', phoneNumber: '', isDefault: true }
        , {
          onSuccess: () => {
            setShowAddressForm(false)
            Alert.alert('success', 'address added successfully')
        },
        onError: (error: any) => {
          Alert.alert('error', error?.response?.data?.error || 'failed to add address')
        }
        })
    }
  }
  const handleCloseAddressForm = () => { 
    setShowAddressForm(false)
    setEditingAddressId(null)
  }
  if(isLoading) return <LoadingUI></LoadingUI>
  if(isError) return <ErrorUI></ErrorUI>
  return (
    <SafeScreen>
      <AddressHeader></AddressHeader>
      {addresses.length === 0 ? (<View style={addStyles.wishlist}>
        <Ionicons name='location-outline' size={80} color={'#666'}></Ionicons>
        <Text style={addStyles.wishlistText}>no addresses yet</Text>
        <Text style={addStyles.wishlistSecondary}>add your first delivery address</Text>
        <TouchableOpacity style={addStyles.wishlisthButton} activeOpacity={0.8}
          onPress={handleAddAddress}>
          <Text style={addStyles.wishlistBtnTxt}>add address</Text>
          </TouchableOpacity>
      </View>) : (
                    <ScrollView style={addStyles.addressList} showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={addStyles.boxContainer}>
              {addresses.map((address) => (
                <AddressCard key={address._id} address={address} onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress} isUpdatingAddress={isUpdatingAddress}
                  isDeletingAddress={isDeletingAddress}
                ></AddressCard>
              ))}
              <TouchableOpacity style={addStyles.addressBtn} activeOpacity={0.8} onPress={handleAddAddress}>
                <View style={addStyles.addressInput}>
                  <Ionicons name='add-circle-outline' size={24} color={'#121212'}></Ionicons>
                  <Text style={addStyles.addressBtn}>add new address</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
      )}
      <AddressFormModal visible={showAddressForm} isEditing={!!editingAddressId} addressForm={addressForm} isAddingAddress={isAddingAddress} isUpdatingAddress={isUpdatingAddress}
      onClose={handleCloseAddressForm} onSave={handleSaveAddress} onFormChange={setAddressForm}></AddressFormModal>
    </SafeScreen>
  )
}
export default Addresses
const addStyles = StyleSheet.create({
  addressBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop:4
  },
  addressInput: {
    flexDirection: 'row',
    alignItems:'center'
  },
  addressText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    marginLeft:5
  },
  boxContainer: {
    paddingHorizontal: 12,
    paddingVertical:8
  },
  addressList: {
    flex:1
  },
    wishlist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:12
  },
  wishlistText: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop:8
  },
  wishlistSecondary: {
    color: COLORS.textsecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  wishlisthButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 12
  },
  wishlistBtnTxt: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight:15
  },
})
function ErrorUI() {
  return (
    <SafeScreen>
      <AddressHeader></AddressHeader>
      <View style={styles.address}>
        <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
        <Text style={styles.icon}>failed to load address</Text>
        <Text style={styles.conn}>please check your connection and try again</Text>
      </View>
    </SafeScreen>
  )
}
function LoadingUI() {
  return (
    <SafeScreen>
      <AddressHeader></AddressHeader>
      <View style={styles.address}>
        <ActivityIndicator size='large' color={'#00d9ff'}></ActivityIndicator>
        <Text style={styles.conn}>loading addresses</Text>
      </View>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  address: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:12
  },
  icon: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    fontSize: 18,
    marginTop:8
  },
  conn: {
    color: COLORS.textsecondary,
    textAlign: 'center',
    marginTop:8
  }
})
// import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { useAddresses } from '../../../hooks/useAddresses'
// import SafeScreen from '../../../components/SafeScreen'
// import { Ionicons } from '@expo/vector-icons'
// import { COLORS } from '../../../constants/colors'
// import AddressHeader from '../../../components/AddressHeader'
// import { Address } from '../../../types'
// import AddressFormModal from '../../../components/AddressFormModal'
// import AddressCard from '../../../components/AddressCard'

// const Addresses = () => {
//   const { addAddress, addresses, deleteAddress, isAddingAddress, isDeletingAddress, updateAddress,
//     isError, isLoading, isUpdatingAddress } = useAddresses()
//   const [showAddressForm, setShowAddressForm] = useState(false)
//   const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
//   const [addressForm, setAddressForm] = useState({
//     label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '', phoneNumber: '',
//     isDefault:true
//   })
//   const handleAddAddress = () => { 
//     setShowAddressForm(true)
//     setEditingAddressId(null)
//     setAddressForm({
//       label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '',
//       phoneNumber:'', isDefault:true
//      })
//   }
//   const handleEditAddress = (address: Address) => {
//     setShowAddressForm(true)
//     setEditingAddressId(address._id)
//     setAddressForm({
//       label: address.label, fullName: address.fullName, streetAddress: address.streetAddress, city: address.city,
//       state: address.state, zipCode: address.zipCode, phoneNumber: address.phoneNumber,
//       isDefault: address.isDefault
//     })
//    }
//   const handleDeleteAddress = (addressId:string, label:string) => {
//     Alert.alert('delete address', `are you sure you want to delete ${label}`, [
//       { text: 'cancel', style: 'cancel' },
//       { text: 'delete', style: 'destructive', onPress:()=>deleteAddress(addressId) }
//     ])
//    }
//   const handleSaveAddress = () => { 
//     if (!addressForm.label || !addressForm.fullName || !addressForm.streetAddress || !addressForm.city
//       || !addressForm.state || !addressForm.zipCode || !addressForm.phoneNumber
//     ) {
//       Alert.alert('error', 'please fill all the fields')
//       return
//     }
//     if (editingAddressId) {
//       updateAddress({
//         addressId: editingAddressId,
//         addressData:addressForm
//       }, {
//         onSuccess: () => {
//           setShowAddressForm(false)
//           setEditingAddressId(null)
//           Alert.alert('success', 'address updated successfully')
//         },
//         onError: (error: any) => {
//           Alert.alert('error', error?.response?.data?.error || 'failed to update address')
//       }})
//     } else {
//       addAddress(addressForm

//         // { label: '', fullName: '', streetAddress: '', city: '', state: '', zipCode: '', phoneNumber: '', isDefault: true }
//         , {
//           onSuccess: () => {
//             setShowAddressForm(false)
//             Alert.alert('success', 'address added successfully')
//         },
//         onError: (error: any) => {
//           Alert.alert('error', error?.response?.data?.error || 'failed to add address')
//         }
//         })
//     }
//   }
//   const handleCloseAddressForm = () => { 
//     setShowAddressForm(false)
//     setEditingAddressId(null)
//   }
//   if(isLoading) return <LoadingUI></LoadingUI>
//   if(isError) return <ErrorUI></ErrorUI>
//   return (
//     <SafeScreen>
//       <AddressHeader></AddressHeader>
//       {addresses.length === 0 ? (<View style={addStyles.wishlist}>
//         <Ionicons name='location-outline' size={80} color={'#666'}></Ionicons>
//         <Text style={addStyles.wishlistText}>no addresses yet</Text>
//         <Text style={addStyles.wishlistSecondary}>add your first delivery address</Text>
//         <TouchableOpacity style={addStyles.wishlisthButton} activeOpacity={0.8}
//           onPress={handleAddAddress}>
//           <Text style={addStyles.wishlistBtnTxt}>add address</Text>
//           </TouchableOpacity>
//       </View>) : (
//                     <ScrollView style={addStyles.addressList} showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 100 }}>
//             <View style={addStyles.boxContainer}>
//               {addresses.map((address) => (
//                 <AddressCard key={address._id} address={address} onEdit={handleEditAddress}
//                   onDelete={handleDeleteAddress} isUpdatingAddress={isUpdatingAddress} 
//                   isDeletingAddress={isDeletingAddress}
//                 ></AddressCard>
//               ))}
// <View><Text style={{color:'white'}}>test</Text></View>
//               <TouchableOpacity style={addStyles.addressBtn} activeOpacity={0.8} onPress={handleAddAddress}>
//                 <View style={addStyles.addressInput}>
//                   <Ionicons name='add-circle-outline' size={24} color={'#121212'}></Ionicons>
//                   <Text style={addStyles.addressText}>add new address</Text>
//                   </View>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//       )}
//       <AddressFormModal visible={showAddressForm} isEditing={!!editingAddressId} addressForm={addressForm} isAddingAddress={isAddingAddress} isUpdatingAddress={isUpdatingAddress}
//       onClose={handleCloseAddressForm} onSave={handleSaveAddress} onFormChange={setAddressForm}></AddressFormModal>
//     </SafeScreen>
//   )
// }
// export default Addresses
// const addStyles = StyleSheet.create({
//   addressBtn: {
//     color: COLORS.primary,
//     borderRadius: 20,
//     paddingVertical: 8,
//     alignItems: 'center',
//     marginTop:4
//   },
//   addressInput: {
//     flexDirection: 'row',
//     alignItems:'center'
//   },
//   addressText: {
//     color: COLORS.background,
//     fontWeight: 'bold',
//     fontSize: 12,
//     lineHeight: 15,
//     marginLeft:5
//   },
//   boxContainer: {
//     paddingHorizontal: 12,
//     paddingVertical:8
//   },
//   addressList: {
//     flex:1
//   },
//     wishlist: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal:12
//   },
//   wishlistText: {
//     color: COLORS.textprimary,
//     fontWeight: 'bold',
//     fontSize: 30,
//     marginTop:8
//   },
//   wishlistSecondary: {
//     color: COLORS.textsecondary,
//     textAlign: 'center',
//     marginTop: 4,
//   },
//   wishlisthButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 17,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     marginTop: 12
//   },
//   wishlistBtnTxt: {
//     color: COLORS.background,
//     fontWeight: 'bold',
//     fontSize: 12,
//     lineHeight:15
//   },
// })
// function ErrorUI() {
//   return (
//     <SafeScreen>
//       <AddressHeader></AddressHeader>
//       <View style={styles.address}>
//         <Ionicons name='alert-circle-outline' size={64} color={'#ff6b6b'}></Ionicons>
//         <Text style={styles.icon}>failed to load address</Text>
//         <Text style={styles.conn}>please check your connection and try again</Text>
//       </View>
//     </SafeScreen>
//   )
// }
// function LoadingUI() {
//   return (
//     <SafeScreen>
//       <AddressHeader></AddressHeader>
//       <View style={styles.address}>
//         <ActivityIndicator size='large' color={'#00d9ff'}></ActivityIndicator>
//         <Text style={styles.conn}>loading addresses</Text>
//       </View>
//     </SafeScreen>
//   )
// }

// const styles = StyleSheet.create({
//   address: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal:12
//   },
//   icon: {
//     color: COLORS.textprimary,
//     fontWeight: 'semibold',
//     fontSize: 18,
//     marginTop:8
//   },
//   conn: {
//     color: COLORS.textsecondary,
//     textAlign: 'center',
//     marginTop:8
//   }
// })
