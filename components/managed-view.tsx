import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Employee from "../models/employee";
import EmployeeView from "./employee-view";
import { backendAddress } from "./login-view";


export default function ManagedView(props:{navigation: any, route:any, managerId:string}) {

    const {navigation, managerId:id} = props;

    const [employees, setEmployees] = useState<Employee[]>();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${backendAddress}/employees/managed/${id}`)
                if(!response || response.status !== 200) {
                    alert('Failure retrieving list of managed employees from server.')
                    return;
                }
                const returnedEmployees = response.data;
                setEmployees(returnedEmployees)                
            } catch (error) {
                console.log(error);
                alert('There was an error communication with the server.');
            }
        })()
    }, []);

    function navigateToReimburseList(id:string, title:string) {
        navigation.push('ReimbursementList', {id, title});
    }

    return(<FlatList style={{flex:1}} keyExtractor={item => item.id} data={employees} renderItem={({item})=>(
        <Pressable style={styles.listItem} onPress={() => navigateToReimburseList(item.id, `${item.fname}${item.mname ? ` ${item.mname}`:""}${item.lname ? ` ${item.lname}`:""}`)}>
            <EmployeeView {...item}/>
        </Pressable>)}/>
    )
}

const styles = StyleSheet.create({
    listItem:{
        flex:1,
        backgroundColor:"cyan",  
        borderWidth:3, 
        width:"100%",
        borderStyle:"solid",
        borderRadius:20,
        margin:"1.5%",
        padding:"5%"
    }
})