import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, Pressable, StyleSheet, TextInput, View, Alert } from "react-native";
import Employee from "../models/employee";

const alert = Alert.alert;

export default function LoginView(props:{setManagerId:Function}) {

    const [nameInput, setNameInput] = useState<string>("");
    const [passInput, setPassInput] = useState<string>("");
    const [loginClick, setLoginClick] = useState<{}>();

    useEffect(() => {
        if(!loginClick) return;
        let succeeded:boolean = false;
        const controller = new AbortController();
        (
            async () => {
                if(!nameInput || !passInput) {
                    alert('Both username and password must be non-empty.')
                    return;
                }
                try {
                    const response = await axios.patch<Employee>(`${backendAddress}/loginMobile`, {
                        user:nameInput, pass:passInput}, {signal:controller.signal});
                    if (response.status !== 200) {
                        alert(String(response.data));
                        return;
                    }
                    const manager:Employee = response.data;
                    await AsyncStorageLib.setItem("managerId", manager.id);
                    succeeded = true;
                    props.setManagerId(manager.id);
                } catch (error) {
                    console.log(error);
                    if(error instanceof Error && error.message.includes("404")) {
                        alert("No matching username and password found.", "No");
                    } else {
                        alert('There was an error communicating with the server.');
                    }
                }
            }
        )();
        return () => {
            if(succeeded) return;
            (
            async () => {controller.abort();
                props.setManagerId("");
                AsyncStorageLib.clear();
            })();
        }
    } ,[loginClick])

    

    return (<View style={{padding:"5%"}}>
        <TextInput style={styles.inputText} placeholder="username" onChangeText={setNameInput} autoCapitalize="none"/>
        <TextInput style={styles.inputText} placeholder="password" onChangeText={setPassInput} secureTextEntry={true} autoCapitalize="none"/>
        <Pressable accessibilityRole="button" style={styles.pressable} onPress={() => setLoginClick({...loginClick})}><Text style={{...styles.inputText, textAlign:"center", color:"#fff", marginBottom:undefined}}>Login</Text></Pressable>
    </View>)
}

const styles = StyleSheet.create({
    inputText:{
        marginBottom:"5%",
        fontSize:25
    },
    pressable:{
        height:50, 
        backgroundColor:"#593196", 
        borderRadius:20, 
        justifyContent:"center"}
});

export const backendAddress = 'https://wk-reimbursements-backend.azurewebsites.net';