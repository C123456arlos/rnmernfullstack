import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Address } from '../types'
interface AddressCardProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (addressId: string, label: string) => void
  isUpdatingAddress: boolean
  isDeletingAddress:boolean
 }
export default function AddressCard({
  address, onEdit, onDelete, isUpdatingAddress, isDeletingAddress
}:AddressCardProps) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View style={styles.contentCard}>
          <View style={styles.cardLabel}>
<Ionicons name='location' size={24} color='#1db854'></Ionicons>
          </View>
          <Text style={styles.cardTxt}>{address.label}</Text>
        </View>
        {address.isDefault && (
          <View style={styles.cardContent}>
            <Text style={styles.txtCard}>default</Text>
          </View>
        )}
      </View>
      <View style={styles.cardWrapper}>
        <Text style={styles.cardText}>{address.fullName}</Text>
        <Text style={styles.cardSecondary}>{address.streetAddress}</Text>
        <Text style={styles.details}>{address.city} {address.state} {address.zipCode}</Text>
        <Text style={styles.detailsTxt}>{address.phoneNumber}</Text>
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.success} activeOpacity={0.7} onPress={() => onEdit(address)}
        disabled={isUpdatingAddress}>
        <Text style={styles.txtSuccess}>edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => onDelete(address._id, address.label)}
        disabled={isDeletingAddress}>
        <Text style={styles.txtSuccess}>delete</Text>
      </TouchableOpacity>
          </View>
</View>
  )
}
const styles = StyleSheet.create({
  cardText: {
    color: COLORS.textprimary,
    fontWeight: 'semibold',
    marginBottom:3
  },
  details: {
    color: COLORS.textsecondary,
    fontSize:12
  },
  detailsTxt: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginBottom:4
  },
  cardSecondary: {
    color: COLORS.textsecondary,
    fontSize: 12,
    marginBottom:3
  },
  cardWrapper: {
    marginLeft:20
  },
  txtCard: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent:'center'
  },
  cardContent: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 100,
    right:50
  },
  cardTxt: {
    color: COLORS.textprimary,
    fontWeight: 'bold',
    fontSize: 18
  },
  cardLabel: {
    backgroundColor: '24cc69ff',
    borderRadius: 100,
    width: 24,
    height: 24,

    marginRight:6
  },  
  content: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 10,
    marginBottom:2
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
    width:'100%'
  },
  container: {
    flexDirection: 'row',
    marginTop: 8,
    gap:6,
  },
  btn: {
    flex: 1,
    backgroundColor: '#8ccaa2ff',
    paddingVertical: 6,
    borderRadius: 24,
    alignItems:'center'
  },
  success: {
    flex: 1,
    backgroundColor: '##24ca69ff',
    paddingVertical: 6,
    borderRadius: 24,
    alignItems:'center'
  },
  text: {
    color: 'red',
    fontWeight:'bold'
  },
  txtSuccess: {
    color: 'green',
   fontWeight:'bold' 
  }
})
// 12:58