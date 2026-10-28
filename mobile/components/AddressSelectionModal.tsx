import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Address } from '../types'
import { useAddresses } from '../hooks/useAddresses'
import { COLORS } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
interface AddressSelectionModalProps{
    visible: boolean
    onClose: () => void
    onProceed: (address: Address) => void
    isProcessing:boolean
}
const AddressSelectionModal = ({ visible, onClose, onProceed, isProcessing }:AddressSelectionModalProps) => {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
    const { addresses, isLoading: addressesLoading } = useAddresses()
  return (
    <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={onClose}>
          <View style={styles.content}>
              <View style={styles.container}>
                  <View style={styles.header}>
                      <Text style={styles.modal}>select address</Text>
                      <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
                          <Ionicons name='close' size={24} color={'#ffffff'}></Ionicons>
                      </TouchableOpacity>
                  </View>
                  <ScrollView style={styles.address} showsVerticalScrollIndicator={false}>
                      {addressesLoading ? (
                          <View style={styles.list}>
                              <ActivityIndicator size='large' color={'#00d9ff'}></ActivityIndicator>
                          </View>
                      ) : (<View style={styles.txtList}>
                              {addresses?.map((address: Address) => (
                                  selectedAddress?._id === address._id ?
                                      <TouchableOpacity key={address._id} style={styles.listBtn}
                                      activeOpacity={0.7} onPress={() => setSelectedAddress(address)}>
                                      <View style={styles.btnAddress}>
                                          <View style={styles.contentContainer}>
                                              <View style={styles.btnContainer}>
                                                  <Text style={styles.txtContainer}>{address.label}</Text>
                                                  {address.isDefault && (
                                                      <View style={styles.default}>
                                                          <Text style={styles.defaultTxt}>default</Text>
                                                      </View>
                                                  )}
                                              </View>
                                              <Text style={styles.actionTxt}>{address.fullName}</Text>
                                              <Text style={styles.addressAction}>{address.streetAddress}</Text>
                                              <Text style={styles.addressTxt}>
                                                  {address.city}, {address.state} {address.zipCode}
                                              </Text>
                                              <Text style={styles.details}>{address.phoneNumber}</Text>
                                          </View>
                                          {selectedAddress?._id === address._id && 
                                              <View style={styles.detailsCard}>
                                                  <Ionicons name='checkmark' size={24} color={'#121212'}></Ionicons>
                                              </View>}
                                      </View>
                                  </TouchableOpacity>
                                      :<TouchableOpacity key={address._id} style={styles.listBtnSelected}
                                          activeOpacity={0.7} onPress={() => setSelectedAddress(address)}>
                                           <View style={styles.btnAddress}>
                                          <View style={styles.contentContainer}>
                                              <View style={styles.btnContainer}>
                                                  <Text style={styles.txtContainer}>{address.label}</Text>
                                                  {address.isDefault && (
                                                      <View style={styles.default}>
                                                          <Text style={styles.defaultTxt}>default</Text>
                                                      </View>
                                                  )}
                                              </View>
                                              <Text style={styles.actionTxt}>{address.fullName}</Text>
                                              <Text style={styles.addressAction}>{address.streetAddress}</Text>
                                              <Text style={styles.addressTxt}>
                                                  {address.city}, {address.state} {address.zipCode}
                                              </Text>
                                              <Text style={styles.details}>{address.phoneNumber}</Text>
                                          </View>
                                          {selectedAddress?._id === address._id && 
                                              <View style={styles.detailsCard}>
                                                  <Ionicons name='checkmark' size={24} color={'#121212'}></Ionicons>
                                              </View>}
                                      </View>
                                      </TouchableOpacity>
                            ))}
                      </View>)}
                      <View style={styles.proceed}>
                          <TouchableOpacity style={styles.proceedAddress} activeOpacity={0.9}
                              onPress={() => {
                              if(selectedAddress) onProceed(selectedAddress)
                              }} disabled={!selectedAddress || isProcessing}>
                              <View style={styles.btnProceed}>
                                  {isProcessing ? (<ActivityIndicator size='small' color={'#121212'}></ActivityIndicator>) : (<>
                                      <Text style={styles.txtProceed}>continue to payment</Text>
                                      <Ionicons name='arrow-forward' size={20} color='#121212'></Ionicons>
                                  </>)}
                              </View>
                          </TouchableOpacity>
                      </View>
                  </ScrollView>
              </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
    txtProceed: {
        color: COLORS.background,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight:4
    },
    proceedAddress: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical:10
    },
    btnProceed: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    proceed: {
        padding: 12,
        borderTopColor:COLORS.surface
    },
    detailsCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        padding: 4,
        marginLeft:6
    },
    details: {
        color: COLORS.textsecondary,
        fontSize: 12,
        lineHeight:12
    },
    addressTxt: {
        color: COLORS.textsecondary,
        lineHeight: 12,
        fontSize: 12,
        marginBottom:4
    },
    addressAction: {
        color: COLORS.textsecondary,
        fontSize: 12,
        lineHeight: 18,
        marginBottom:3
    },
    actionTxt: {
        color: COLORS.textprimary,
        fontWeight: 'semibold',
        fontSize: 20,
        marginBottom:4
    },
    default: {
        backgroundColor: '#000000bb',
        borderRadius: 100,
        paddingHorizontal: 6,
        paddingVertical:3
    },
    defaultTxt: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight:'semibold'
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:6
    },
    txtContainer: {
        backgroundColor: COLORS.textterciary,
        fontWeight: 'bold',
        fontSize: 20,
        marginRight:6
    },
    btnAddress: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'space-between'
    },
    contentContainer: {
        flex:1
    },
    listBtn: {
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        padding: 12,
        borderWidth: 4,
        borderColor:COLORS.primary
    },
    listBtnSelected: {
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        padding: 12,
        borderWidth: 4,
        borderColor:COLORS.lighter
    },
    txtList: {
        gap: 8
    },
    list: {
        padding:16
    },
    address: {
        flex: 1, 
        padding:12
    },
    modalBtn: {
        backgroundColor: COLORS.surface,
        borderRadius: 100,
        padding:6
    },
    modal: {
        color: COLORS.textprimary,
        fontSize: 20,
        fontWeight:'bold'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderColor:COLORS.surface
    },
    content: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent:'flex-end'
    },
    container: {
        backgroundColor: COLORS.background,
        borderTopEndRadius: 60,
        height:'50%'
    },
})
export default AddressSelectionModal
// import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
// import React, { useState } from 'react'
// import { Address } from '../types'
// import { useAddresses } from '../hooks/useAddresses'
// import { COLORS } from '../constants/colors'
// import { Ionicons } from '@expo/vector-icons'
// interface AddressSelectionModalProps{
//     visible: boolean
//     onClose: () => void
//     onProceed: (address: Address) => void
//     isProcessing:boolean
// }
// const AddressSelectionModal = ({ visible, onClose, onProceed, isProcessing }:AddressSelectionModalProps) => {
//     const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
//     const { addresses, isLoading: addressesLoading } = useAddresses()
//   return (
//     <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={onClose}>
//           <View style={styles.content}>
//               <View style={styles.container}>
//                   <View style={styles.header}>
//                       <Text style={styles.modal}>select address</Text>
//                       <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
//                           <Ionicons name='close' size={24} color={'#ffffff'}></Ionicons>
//                       </TouchableOpacity>
//                   </View>
//                   <ScrollView style={styles.address}>
//                       {addressesLoading ? (
//                           <View style={styles.list}>
//                               <ActivityIndicator size='large' color={'#00d9ff'}></ActivityIndicator>
//                           </View>
//                       ) : (<View style={styles.txtList}>
//                               {addresses?.map((address: Address) => (
//                                selectedAddress?._id ===address._id ? <TouchableOpacity key={address._id} style={styles.listBtn}
//                                       activeOpacity={0.7} onPress={() => setSelectedAddress(address)}>
//                                       <View style={styles.btnAddress}>
//                                           <View style={styles.contentContainer}>
//                                               <View style={styles.btnContainer}>
//                                                   <Text style={styles.txtContainer}>{address.label}</Text>
//                                                   {address.isDefault && (
//                                                       <View style={styles.default}>
//                                                           <Text style={styles.defaultTxt}>default</Text>
//                                                       </View>
//                                                   )}
//                                               </View>
//                                               <Text style={styles.actionTxt}>{address.fullName}</Text>
//                                               <Text style={styles.addressAction}>{address.streetAddress}</Text>
//                                               <Text style={styles.addressTxt}>
//                                                   {address.city}, {address.state} {address.zipCode}
//                                               </Text>
//                                               <Text style={styles.details}>{address.phoneNumber}</Text>
//                                           </View>
//                                           {selectedAddress?._id === address._id && 
//                                               <View style={styles.detailsCard}>
//                                                   <Ionicons name='checkmark' size={24} color={'#121212'}></Ionicons>
//                                               </View>}
//                                       </View>
//                                       </TouchableOpacity>:<TouchableOpacity key={address._id} style={styles.listBtnSelected}
//                                       activeOpacity={0.7} onPress={()=>setSelectedAddress(address)}></TouchableOpacity>
//                             ))}
//                       </View>)}
//                   </ScrollView>
//               </View>
//       </View>
//     </Modal>
//   )
// }
// const styles = StyleSheet.create({
//     detailsCard: {
//         backgroundColor: COLORS.primary,
//         borderRadius: 100,
//         padding: 4,
//         marginLeft:6
//     },
//     details: {
//         color: COLORS.textsecondary,
//         fontSize: 12,
//         lineHeight:12
//     },
//     addressTxt: {
//         color: COLORS.textsecondary,
//         lineHeight: 12,
//         fontSize: 12,
//         marginBottom:4
//     },
//     addressAction: {
//         color: COLORS.textsecondary,
//         fontSize: 12,
//         lineHeight: 18,
//         marginBottom:3
//     },
//     actionTxt: {
//         color: COLORS.textprimary,
//         fontWeight: 'semibold',
//         fontSize: 20,
//         marginBottom:4
//     },
//     default: {
//         backgroundColor: '#000000bb',
//         borderRadius: 100,
//         paddingHorizontal: 6,
//         paddingVertical:3
//     },
//     defaultTxt: {
//         color: COLORS.primary,
//         fontSize: 12,
//         fontWeight:'semibold'
//     },
//     btnContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom:6
//     },
//     txtContainer: {
//         backgroundColor: COLORS.primary,
//         fontWeight: 'bold',
//         fontSize: 20,
//         marginRight:6
//     },
//     btnAddress: {
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//         justifyContent:'space-between'
//     },
//     contentContainer: {
//         flex:1
//     },
//     listBtn: {
//         backgroundColor: COLORS.surface,
//         borderRadius: 24,
//         padding: 12,
//         borderWidth: 4,
//         borderColor:COLORS.primary
//     },
//     listBtnSelected: {
//         backgroundColor: COLORS.surface,
//         borderRadius: 24,
//         padding: 12,
//         borderWidth: 4,
//         borderColor:COLORS.lighter
//     },
//     txtList: {
//         gap: 8
//     },
//     list: {
//         padding:16
//     },
//     address: {
//         flex: 1, 
//         padding:12
//     },
//     modalBtn: {
//         backgroundColor: COLORS.surface,
//         borderRadius: 100,
//         padding:6
//     },
//     modal: {
//         color: COLORS.textprimary,
//         fontSize: 20,
//         fontWeight:'bold'
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 12,
//         borderColor:COLORS.surface
//     },
//     content: {
//         flex: 1,
//         backgroundColor: '#00000099',
//         justifyContent:'flex-end'
//     },
//     container: {
//         backgroundColor: COLORS.background,
//         borderTopEndRadius: 60,
//         height:'50%'
//     },
// })
// export default AddressSelectionModal