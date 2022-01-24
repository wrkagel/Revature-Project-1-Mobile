import axios from "axios";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ReimbursementItem, { ReimbursementStatus } from "../models/reimbursement-item";
import { backendAddress } from "./login-view";


export default function ReimbursementView(props:{reimbursement:ReimbursementItem, updateReimbursement:Function}) {

    const {updateReimbursement, reimbursement} = props;
    const {id, employeeId, type, desc, amount, date, status} = props.reimbursement;

    async function updateStatus(newStatus:ReimbursementStatus) {
        try {
            const response = await axios.patch<ReimbursementItem>(`${backendAddress}/reimbursements/update`, {id, status:newStatus});
            if(!response || response.status !== 200) {
                alert('There was an error fetching reimbursements form the server.');
                return;
            }
            reimbursement.status = newStatus;
            updateReimbursement(reimbursement);
        } catch (error) {
            console.log(error);
            alert('There was an error communicating with the server.');
        }
    }
    
    const ManagerButtons = () => {
        switch(status) {
            case ReimbursementStatus.pending: {
                return (
                    <View style={{flex:1}}>
                        <View style={{flex:0.5, height:"100%", width:"100%"}}>
                            <Button color={"#008C00"} title="Approve" onPress={() => updateStatus(ReimbursementStatus.approved)}/>
                        </View>
                        <View style={{flex:0.5, height:"100%", width:"100%"}}>
                            <Button color={"#fc3939"} title="Deny" onPress={() => updateStatus(ReimbursementStatus.denied)}/>
                        </View>
                    </View>
                )
            }
            case ReimbursementStatus.approved:
            case ReimbursementStatus.denied: {
                return (
                    <View style={{flex:1, justifyContent:"center"}}>
                        <Button color={"#593196"} title="Set Pending" onPress={() => updateStatus(ReimbursementStatus.pending)}/>
                    </View>
                )
            }
            case ReimbursementStatus.paid: {
                return (
                    <View style={{flex:1, justifyContent:"center", alignContent:"center"}}>
                        <Text style={{fontSize:20, textAlign:"center", textAlignVertical:"center", height:30, backgroundColor:"lightgrey"}}>Paid</Text>
                    </View>
                )
            }
            default:{
                console.log("Error with reimbursement status. Reached default in switch in reimbursement-view.tsx.");
            }
        }
        return null;
    }

    return (<View style={{flex:1, flexDirection:"row", justifyContent:"space-evenly", backgroundColor:"#02F687"}}>
        <View style={{flex:0.4}}>
            <Text style={textStyle.th}>Type</Text>
            <Text style={textStyle.th}>Description</Text>
            <Text style={textStyle.th}>Amount</Text>
            <Text style={textStyle.th}>Date</Text>
            <Text style={textStyle.th}>Status</Text>
            <Text style={textStyle.th}>ID</Text>
            <Text style={textStyle.th}>EmployeeID</Text>
            <Text style={textStyle.th}>Status Update</Text>
        </View>
        <View style={{flex:0.6}}>
            <Text style={textStyle.td}>{type}</Text>
            <Text style={textStyle.td}>{desc}</Text>
            <Text style={textStyle.td}>${amount}</Text>
            <Text style={textStyle.td}>{new Date(date).toDateString()}</Text>
            <Text style={textStyle.td}>{status}</Text>
            <Text style={textStyle.td}>{id}</Text>
            <Text style={textStyle.td}>{employeeId}</Text>
            {<ManagerButtons/>}
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