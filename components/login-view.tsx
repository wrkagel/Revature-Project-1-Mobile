import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { backendAddress } from "../App";


export default function LoginView(props:{setIsAuthenticated:Function}) {

    const [nameInput, setNameInput] = useState<string>("");
    const [passInput, setPassInput] = useState<string>("");

    const testUser = ['username', 'password'];

    async function login() {
        if(!nameInput || !passInput) {
            alert('Both username and password must be non-empty.')
            return;
        }
        const response = await fetch(`${backendAddress}/loginMobile`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user:nameInput, pass:passInput})
        })
        if(!response) {
            alert('There was an error communicating with the server.');
            return;
        }
        if(response.status === 404) {
            alert('No matching username and password found.');
            return;
        } else if (response.status !== 200) {
            alert(await response.text());
            return;
        } else if (!response.ok) {
            alert('There was an error communicating with the server.');
            return;
        }
        if(nameInput === testUser[0] && passInput === testUser[1]) {
            await AsyncStorageLib.setItem("isAuthenticated", "true");
            props.setIsAuthenticated(true);
        }
    }

    return (<View>
        <TextInput placeholder="username" onChangeText={setNameInput} autoCapitalize="none"/>
        <TextInput placeholder="password" onChangeText={setPassInput} secureTextEntry={true} autoCapitalize="none"/>
        <Button title="Login" onPress={login}/>
    </View>)
}