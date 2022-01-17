import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ReimbursementItem, { ReimbursementStatus } from "../models/reimbursement-item";


function ReimbursementView() {



    const {id, employeeId, type, desc, amount, date, status} = testItem;

    const isPending = status === ReimbursementStatus.pending;

    return (<View style={{flex:1, flexDirection:"row", justifyContent:"space-evenly"}}>
        <View style={{flex:0.4}}>
            <Text style={textStyle.th}>Type</Text>
            <Text style={textStyle.th}>Description</Text>
            <Text style={textStyle.th}>Amount</Text>
            <Text style={textStyle.th}>Date</Text>
            <Text style={textStyle.th}>Status</Text>
            <Text style={textStyle.th}>ID</Text>
            <Text style={textStyle.th}>EmployeeID</Text>
            {isPending && <Text style={textStyle.th}>Status Update</Text>}
        </View>
        <View style={{flex:0.6}}>
            <Text style={textStyle.td}>{type}</Text>
            <Text style={textStyle.td}>{desc}</Text>
            <Text style={textStyle.td}>{amount}</Text>
            <Text style={textStyle.td}>{date}</Text>
            <Text style={textStyle.td}>{status}</Text>
            <Text style={textStyle.td}>{id}</Text>
            <Text style={textStyle.td}>{employeeId}</Text>
            {isPending && <View style={{flex:1}}>
                <View style={{flex:0.5, height:"100%", width:"100%"}}><Button title="Approve" onPress={() => {}}/></View>
                <View style={{flex:0.5}}><Button title="Deny" onPress={() =>{}}/></View>
            </View>}
        </View>
    </View>)
}

const textStyle = StyleSheet.create({
    th:{
        textAlign:"center",
        textAlignVertical:"center",
        flex:1,
        fontWeight:"bold",
        fontSize:20
    },
    td:{
        textAlign:"left",
        textAlignVertical:"center",
        flex:1,
        fontSize:15
    }
});

export default React.memo(ReimbursementView)

const testItem:ReimbursementItem = {
    id:"test-test-test-test-test", 
    employeeId:"test-test-test-test-test",
    type:"Testing",
    desc:"This is for testing.",
    amount:1000000.99,
    date:Date.now(),
    status:ReimbursementStatus.pending
  };