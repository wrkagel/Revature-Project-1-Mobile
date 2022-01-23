import { StyleSheet, Text, View } from "react-native";
import ReimbursementItem from "../models/reimbursement-item";


export default function ReimbursementListItem(props:ReimbursementItem) {

    const {type, desc, amount, date, status, id} = props;

    return (<View style={{flex:1, backgroundColor:"#0455D4", borderStyle:"solid", borderWidth:3, borderRadius:20}}>
        <View style={{flex:1, flexDirection:"row", borderStyle:"solid", borderBottomWidth:3}}>
            <Text style={{...styles.listText, flex:0.2}}>{type}:</Text>
            <Text style={{...styles.listText, flex:0.8}}>{desc}</Text>
        </View>
        <View style={{flex:1, flexDirection:"row", borderBottomWidth:3, borderStyle:"solid"}}>
            <Text style={{...styles.listText, borderRightWidth:3, borderStyle:"solid"}}>${amount}</Text>
            <Text style={{...styles.listText, borderRightWidth:3, borderStyle:"solid"}}>{status}</Text>
            <Text style={styles.listText}>{new Date(date).toDateString()}</Text>
        </View>
        <Text style={styles.listText}>
            ID:{id}
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    listText: {
        flex:1,
        textAlign:'center',
        fontSize:20,
        color:"#fff"
    }
})