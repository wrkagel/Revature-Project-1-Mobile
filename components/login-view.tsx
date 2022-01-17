import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
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

    return (<View>
        <TextInput placeholder="username" onChangeText={setNameInput} autoCapitalize="none"/>
        <TextInput placeholder="password" onChangeText={setPassInput} secureTextEntry={true} autoCapitalize="none"/>
        <Button title="Login" onPress={login}/>
    </View>)
}

export const backendAddress = 'https://wk-revature-vm.eastus.cloudapp.azure.com'