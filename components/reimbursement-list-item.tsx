import { StyleSheet, Text, View } from "react-native";
import ReimbursementItem from "../models/reimbursement-item";


export default function ReimbursementListItem(props:ReimbursementItem) {

    const {type, desc, amount, date, status, employeeId, id} = props;

    return (<View style={{flex:1, flexDirection:'row', flexWrap:'wrap'}}>
        <Text style={styles.listItem}>
            {type}
        </Text>
        <Text style={styles.listItem}>
            {desc}
        </Text>
        <Text style={styles.listItem}>
            {amount}
        </Text>
        <Text style={styles.listItem}>
            {new Date(date).toDateString()}
        </Text>
        <Text style={styles.listItem}>
            {employeeId}
        </Text>
        <Text style={styles.listItem}>
            {id}
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    listItem: {
        flex:1,
        textAlign:'center',
        fontSize:20,
        backgroundColor:"cyan",
        borderStyle:"solid",
        borderWidth:2
    }
})