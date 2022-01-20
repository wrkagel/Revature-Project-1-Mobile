import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { Text, Pressable, StyleSheet, TextInput, View } from "react-native";
import Employee from "../models/employee";


export default function LoginView(props:{setManagerId:Function}) {

    const [nameInput, setNameInput] = useState<string>("");
    const [passInput, setPassInput] = useState<string>("");

    async function login() {
        if(!nameInput || !passInput) {
            alert('Both username and password must be non-empty.')
            return;
        }
        try {
            const response = await axios.patch<Employee>(`${backendAddress}/loginMobile`, {user:nameInput, pass:passInput});
            if (response.status !== 200) {
                alert(String(response.data));
                return;
            }
            const manager:Employee = response.data;
            await AsyncStorageLib.setItem("managerId", manager.id);
            props.setManagerId(manager.id);
        } catch (error) {
            console.log(error);
            if(error instanceof Error && error.message.includes("404")) {
                alert("No matching username and password found.");
            } else {
                alert('There was an error communicating with the server.');
            }
        }
    }

    return (<View style={{padding:"5%"}}>
        <TextInput style={styles.inputText} placeholder="username" onChangeText={setNameInput} autoCapitalize="none"/>
        <TextInput style={styles.inputText} placeholder="password" onChangeText={setPassInput} secureTextEntry={true} autoCapitalize="none"/>
        <Pressable style={{height:50, backgroundColor:"#593196", borderRadius:20, justifyContent:"center"}} onPress={login}><Text style={{...styles.inputText, textAlign:"center", color:"#fff", marginBottom:undefined}}>Login</Text></Pressable>
    </View>)
}

const styles = StyleSheet.create({
    inputText:{
        marginBottom:"5%",
        fontSize:25
    }
});

export const backendAddress = 'https://wk-reimbursements-backend.azurewebsites.net';