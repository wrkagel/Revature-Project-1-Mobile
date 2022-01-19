import axios from "axios";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ReimbursementItem, { ReimbursementStatus } from "../models/reimbursement-item";
import { backendAddress } from "./login-view";


export default function ReimbursementView(props:{navigation:any, reimbursement:ReimbursementItem}) {

    const {navigation} = props;
    const {id, employeeId, type, desc, amount, date, status} = props.reimbursement;

    const isPending = status === ReimbursementStatus.pending;

    async function updateStatus(newStatus:ReimbursementStatus) {
        try {
            const response = await axios.patch<ReimbursementItem>(`${backendAddress}/reimbursements/update`, {id, status:newStatus});
            if(!response || response.status !== 200) {
                alert('There was an error fetching reimbursements form the server.');
                return;
            }
            navigation.pop();
            navigation.pop();
            navigation.push('ReimbursementList', {id:employeeId})
            navigation.push('Reimbursement')
        } catch (error) {
            console.log(error);
            alert('There was an error communicating with the server.')              
        }
    }    

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
            <Text style={textStyle.td}>${amount}</Text>
            <Text style={textStyle.td}>{new Date(date).toDateString()}</Text>
            <Text style={textStyle.td}>{status}</Text>
            <Text style={textStyle.td}>{id}</Text>
            <Text style={textStyle.td}>{employeeId}</Text>
            {isPending ? <View style={{flex:1}}>
                <View style={{flex:0.5, height:"100%", width:"100%"}}>
                    <Button title="Approve" onPress={() => updateStatus(ReimbursementStatus.approved)}/>
                </View>
                <View style={{flex:0.5, height:"100%", width:"100%"}}>
                    <Button title="Deny" onPress={() => updateStatus(ReimbursementStatus.denied)}/>
                </View>
            </View>
            :
            <View style={{flex:1, height:"100%", width:"100%"}}>
                <Button title="Set Pending" onPress={() => updateStatus(ReimbursementStatus.pending)}/>
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