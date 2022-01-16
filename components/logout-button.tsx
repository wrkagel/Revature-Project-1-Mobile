import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, View } from "react-native";


export default function LogoutButton(props:{setIsAuthenticated:Function}) {

    async function logout() {
        await AsyncStorageLib.clear();
        props.setIsAuthenticated(false);
    }

    return (<View>
        <Button title="Logout" onPress={logout}/>
    </View>)
}