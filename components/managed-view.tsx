import { ParamListBase, Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Employee from "../models/employee";
import EmployeeView from "./employee-view";


export default function ManagedView(props:{navigation: any}) {

    const navigation = props.navigation;

    function navigateToReimburseList(id:string) {
        navigation.push('ReimbursementList', {id});
    }

    return(<FlatList keyExtractor={item => item.id} data={employees} renderItem={({item})=>(
        <Pressable style={styles.listItem} onPress={() => navigateToReimburseList(item.id)}>
            <EmployeeView {...item}/>
        </Pressable>)}/>
    )
}

const employees:Employee[] = [{
    fname:"Harvey", mname:"The", lname:"ghost", id:"test-test-test-test"
    }, {fname:"Casper", lname:"The Ghost", id:"test-test-test-test-test"}];

const styles = StyleSheet.create({
    listItem:{
        flex:1,
        padding:25, 
        backgroundColor:"cyan", 
        borderStyle:"solid", 
        borderWidth:3, 
        width:"100%"
    }
})