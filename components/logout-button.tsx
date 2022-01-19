import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, View } from "react-native";


export default function LogoutButton(props:{setManagerId:Function}) {

    async function logout() {
        await AsyncStorageLib.clear();
        props.setManagerId("");
    }

    return (<View>
        <Button color={"#593196"} title="Logout" onPress={logout}/>
    </View>)
}