import { Ionicons } from "@expo/vector-icons"
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLORS } from "../constants/colors"
export default function AddressHeader() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={'#ffffff'}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.txt}>my address</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingBottom: 10,
        borderBottomWidth: 5,
        borderColor: COLORS.surface,
        flexDirection: 'row',
        alignItems:'center'
    },
    btn: {
        marginRight:8
    },
    txt: {
        color: COLORS.textprimary,
        fontSize: 18,
        fontWeight:'bold'
    }
})