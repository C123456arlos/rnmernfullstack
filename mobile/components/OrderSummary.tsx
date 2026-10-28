import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants/colors'
interface OrderSummaryProps{
    subtotal: number
    shipping: number
    tax: number
    total:number
}
export default function OrderSummary({ subtotal, shipping, tax, total }: OrderSummaryProps) {
    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.txt}>summary</Text>
                <View style={styles.summaryContent}>
                    <View style={styles.summaryTotal}>
                        <Text style={styles.summaryTxt}>subtotal</Text>
                        <Text style={styles.summaryPrice}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryTotal}>
                        <Text style={styles.summaryTxt}>shipping</Text>
                        <Text style={styles.summaryPrice}>${shipping.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryTotal}>
                        <Text style={styles.summaryTxt}>tax</Text>
                        <Text style={styles.summaryPrice}>${tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryTotalCard}>
                        <Text style={styles.summaryTxt}>total</Text>
                        <Text style={styles.summaryTotalPrice}>${total.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    summaryTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    summaryTotalCard: {
        marginTop:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    summaryTxt: {
        color: COLORS.textsecondary,
        fontSize: 12,
        lineHeight:12
    },
    summaryPrice: {
        color: COLORS.textprimary,
        fontWeight: 'semibold',
        lineHeight: 12,
        fontSize:12
    },
    summaryContent: {
        marginTop: 6,
        marginBottom:6
    },
    content: {
        paddingHorizontal: 10,
        marginTop:12
    },
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 15,
        padding:10
    },
    txt: {
        color: COLORS.textprimary,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:8
    },
    summaryTotalPrice: {
          color: COLORS.primary,
        fontWeight: 'semibold',
        lineHeight: 18,
        fontSize:18      
    }
})