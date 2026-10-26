import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, ActivityIndicator } from 'react-native'
import SafeScreen from './SafeScreen'
import { COLORS } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
interface AddressFormData{
    label: string
    fullName: string
    streetAddress: string
    city: string
    state:string
    zipCode: string
    phoneNumber: string
    isDefault:boolean
}
interface AddressFormModalProps{
    visible: boolean
    isEditing: boolean
    addressForm: AddressFormData
    isAddingAddress: boolean
    isUpdatingAddress: boolean
    onClose: () => void
    onSave: () => void
    onFormChange:(form:AddressFormData)=>void
}
const AddressFormModal = ({addressForm, isAddingAddress, isEditing, isUpdatingAddress, onClose, onFormChange, onSave, visible}:AddressFormModalProps) => {
  return (
    <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
          <SafeScreen>
              <View style={styles.topContainer}>
                  <Text style={styles.txt}>
                      {isEditing ?'edit address':'add new address'}
                  </Text>
                  <TouchableOpacity onPress={onClose}>
                      <Ionicons name='close' size={28} color='#ffffff'></Ionicons>
                  </TouchableOpacity>
              </View>
              <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 50 }}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.container}>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>label</Text>
                          <TextInput style={styles.input} placeholder='e.g. home work office'
                              placeholderTextColor={'#666'} value={addressForm.label}
                          onChangeText={(text)=>onFormChange({...addressForm, label:text})}></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>full name</Text>
                          <TextInput style={styles.input} placeholder='enter your full name'
                              placeholderTextColor={'#666'} value={addressForm.fullName}
                          onChangeText={(text)=>onFormChange({...addressForm, fullName:text})}></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>street address</Text>
                          <TextInput style={styles.input} placeholder='street address apt suite number'
                              placeholderTextColor={'#666'} value={addressForm.streetAddress}
                              onChangeText={(text) => onFormChange({ ...addressForm, streetAddress: text })}
                          multiline></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>city</Text>
                          <TextInput style={styles.input} placeholder='e.g. new york'
                              placeholderTextColor={'#666'} value={addressForm.city}
                              onChangeText={(text)=>onFormChange({...addressForm, city:text})}></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>state</Text>
                          <TextInput style={styles.input} placeholder='e.g. NY' placeholderTextColor={'#666'}
                          value={addressForm.state} onChangeText={(text)=>onFormChange({...addressForm, state:text})}></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>zipcode</Text>
                          <TextInput style={styles.input} placeholder='e.g. 10001' placeholderTextColor={'#666'}
                              value={addressForm.zipCode} onChangeText={(text) => onFormChange({ ...addressForm, zipCode: text })}
                          keyboardType='numeric'></TextInput>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.txtCard}>phone number</Text>
                          <TextInput style={styles.input} placeholder='+1 (555) 123-4567' placeholderTextColor={'#666'}
                              value={addressForm.phoneNumber} onChangeText={(text) => onFormChange({ ...addressForm, phoneNumber: text })}
                          keyboardType='phone-pad'></TextInput>
                      </View>
                      <View style={styles.toggle}>
                          <Text style={styles.txtToggle}>set as default address</Text>
                          <Switch value={addressForm.isDefault} onValueChange={(value)=>onFormChange({...addressForm, isDefault:value})} thumbColor={'white'}></Switch>
                      </View>
                  <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSave}
                      disabled={isAddingAddress || isUpdatingAddress}>
                      {
                          isAddingAddress || isUpdatingAddress ? (
                          <ActivityIndicator size='small' color={'#121212'}></ActivityIndicator>
                          ) : (<Text style={styles.loadBtn}>{isEditing ?'save changes':'add address'}</Text>)
                      }
                  </TouchableOpacity>
                  </View>
              </ScrollView>
      </SafeScreen>
    </Modal>
  )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:12
    },
    loadBtn: {
        color: COLORS.background,
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        alignContent:'center'
    },
    toggle: {
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:12
    },
    txtToggle: {
        color: COLORS.textprimary,
        fontWeight:'semibold'
    },
    input: {
        color: COLORS.textprimary,
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: 12,
        lineHeight: 12,
        backgroundColor:COLORS.lighter
    },
    txtCard: {
        color: COLORS.textprimary,
        fontWeight: 'semibold',
        marginBottom:4
    },
    card: {
        marginBottom:10
    },
    container: {
        padding:12
    },
    content: {
        flex:1
    },
    topContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 5,
        borderColor: COLORS.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:-30
    },
    txt: {
        color: COLORS.textprimary,
        fontSize: 20,
        fontWeight:'bold'
    }
})
export default AddressFormModal
// import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, ActivityIndicator } from 'react-native'
// import SafeScreen from './SafeScreen'
// import { COLORS } from '../constants/colors'
// import { Ionicons } from '@expo/vector-icons'
// interface AddressFormData{
//     label: string
//     fullName: string
//     streetAddress: string
//     city: string
//     state:string
//     zipCode: string
//     phoneNumber: string
//     isDefault:boolean
// }
// interface AddressFormModalProps{
//     visible: boolean
//     isEditing: boolean
//     addressForm: AddressFormData
//     isAddingAddress: boolean
//     isUpdatingAddress: boolean
//     onClose: () => void
//     onSave: () => void
//     onFormChange:(form:AddressFormData)=>void
// }
// const AddressFormModal = ({addressForm, isAddingAddress, isEditing, isUpdatingAddress, onClose, onFormChange, onSave, visible}:AddressFormModalProps) => {
//   return (
//     <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
//           <SafeScreen>
//               <View style={styles.topContainer}>
//                   <Text style={styles.txt}>
//                       {isEditing ?'edit address':'add new address'}
//                   </Text>
//                   <TouchableOpacity onPress={onClose}>
//                       <Ionicons name='close' size={28} color='#ffffff'></Ionicons>
//                   </TouchableOpacity>
//               </View>
//               <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 50 }}
//                   showsVerticalScrollIndicator={false}>
//                   <View style={styles.container}>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>label</Text>
//                           <TextInput style={styles.input} placeholder='e.g. home work office'
//                               placeholderTextColor={'#666'} value={addressForm.label}
//                           onChangeText={(text)=>onFormChange({...addressForm, label:text})}></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>full name</Text>
//                           <TextInput style={styles.input} placeholder='enter your full name'
//                               placeholderTextColor={'#666'} value={addressForm.fullName}
//                           onChangeText={(text)=>onFormChange({...addressForm, fullName:text})}></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>street address</Text>
//                           <TextInput style={styles.input} placeholder='street address apt suite number'
//                               placeholderTextColor={'#666'} value={addressForm.streetAddress}
//                               onChangeText={(text) => onFormChange({ ...addressForm, streetAddress: text })}
//                           multiline></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>city</Text>
//                           <TextInput style={styles.input} placeholder='e.g. new york'
//                               placeholderTextColor={'#666'} value={addressForm.city}
//                               onChangeText={(text)=>onFormChange({...addressForm, city:text})}></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>state</Text>
//                           <TextInput style={styles.input} placeholder='e.g. NY' placeholderTextColor={'#666'}
//                           value={addressForm.state} onChangeText={(text)=>onFormChange({...addressForm, state:text})}></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>zipcode</Text>
//                           <TextInput style={styles.input} placeholder='e.g. 10001' placeholderTextColor={'#666'}
//                               value={addressForm.zipCode} onChangeText={(text) => onFormChange({ ...addressForm, zipCode: text })}
//                           keyboardType='numeric'></TextInput>
//                       </View>
//                       <View style={styles.card}>
//                           <Text style={styles.txtCard}>phone number</Text>
//                           <TextInput style={styles.input} placeholder='+1 (555) 123-4567' placeholderTextColor={'#666'}
//                               value={addressForm.phoneNumber} onChangeText={(text) => onFormChange({ ...addressForm, phoneNumber: text })}
//                           keyboardType='phone-pad'></TextInput>
//                       </View>
//                       <View style={styles.toggle}>
//                           <Text style={styles.txtToggle}>set as default address</Text>
//                           <Switch value={addressForm.isDefault} onValueChange={(value)=>onFormChange({...addressForm, isDefault:value})} thumbColor={'white'}></Switch>
//                       </View>
//                   <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSave}
//                       disabled={isAddingAddress || isUpdatingAddress}>
//                       {
//                           isAddingAddress || isUpdatingAddress ? (
//                           <ActivityIndicator size='small' color={'#121212'}></ActivityIndicator>
//                           ) : (<Text style={styles.loadBtn}>{isEditing ?'save changes':'add address'}</Text>)
//                       }
//                   </TouchableOpacity>
//                   </View>
//               </ScrollView>
//       </SafeScreen>
//     </Modal>
//   )
// }
// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: COLORS.primary,
//         borderRadius: 12,
//         padding: 15,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom:12
//     },
//     loadBtn: {
//         color: COLORS.background,
//         fontWeight: 'bold',
//         fontSize: 18,
//         alignItems: 'center',
//         alignContent:'center'
//     },
//     toggle: {
//         backgroundColor: COLORS.surface,
//         borderRadius: 10,
//         padding: 8,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom:12
//     },
//     txtToggle: {
//         color: COLORS.textprimary,
//         fontWeight:'semibold'
//     },
//     input: {
//         color: COLORS.textprimary,
//         paddingVertical: 20,
//         borderRadius: 10,
//         fontSize: 12,
//         lineHeight: 12,
//         backgroundColor:COLORS.lighter
//     },
//     txtCard: {
//         color: COLORS.textprimary,
//         fontWeight: 'semibold',
//         marginBottom:4
//     },
//     card: {
//         marginBottom:10
//     },
//     container: {
//         padding:12
//     },
//     content: {
//         flex:1
//     },
//     topContainer: {
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         borderBottomWidth: 5,
//         borderColor: COLORS.surface,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginTop:-30
//     },
//     txt: {
//         color: COLORS.textprimary,
//         fontSize: 20,
//         fontWeight:'bold'
//     }
// })
// export default AddressFormModal