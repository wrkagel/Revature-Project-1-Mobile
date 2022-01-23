import { Text, View } from "react-native";
import Employee from "../models/employee";


export default function EmployeeView(props:Employee) {

    const {fname, mname, lname, id} = props;

    return (<View><Text style={{flex:1, textAlign:"center", fontSize:20, fontWeight:"bold", color:"white"}}>{fname}{mname ? ` ${mname}`:""}{lname ? ` ${lname}`:""}</Text>
    <Text style={{textAlign:"center", color:"white"}}>ID: {id}</Text></View>)
}
