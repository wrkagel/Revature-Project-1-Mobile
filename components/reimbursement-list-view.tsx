import axios from "axios";
import { useEffect } from "react";
import { Button, View } from "react-native";
import ReimbursementItem from "../models/reimbursement-item";
import { backendAddress } from "./login-view";


export default function ReimbursementViewList(props:{navigation:any, route: any, setReimbursementList:Function, setListIndex:Function}) {

    const {navigation, route, setReimbursementList, setListIndex} = props;
    const {id} = route.params;

    useEffect(() => {
        (async () => {
            console.log(id);
            const response = await axios.get<ReimbursementItem[]>(`${backendAddress}/reimbursements/${id}`);
            if(!response || response.status !== 200) {
                alert('There was an error fetching reimbursements form the server.');
                return;
            }
            const reimbursementList:ReimbursementItem[] = response.data;
            setReimbursementList(reimbursementList);
        })
    },[]);

    async function navigateToReimbursement() {

        navigation.push('Reimbursement');
    }

    return (<View>
        <Button title={id} onPress={() => navigateToReimbursement} />
    </View>)
}