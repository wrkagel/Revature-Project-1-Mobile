import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable} from "react-native";
import ReimbursementItem from "../models/reimbursement-item";
import { backendAddress } from "./login-view";
import ReimbursementListItem from "./reimbursement-list-item";


export default function ReimbursementViewList(props:{navigation:any, route: any, reimbursementList:ReimbursementItem[], setReimbursementList:Function, setListIndex:Function}) {

    const {navigation, route, reimbursementList, setReimbursementList, setListIndex} = props;
    const {id} = route.params;
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<ReimbursementItem[]>(`${backendAddress}/reimbursements/${id}`);
                if(!response || response.status !== 200) {
                    alert('There was an error fetching reimbursements form the server.');
                    return;
                }
                const reimbursementList:ReimbursementItem[] = response.data;
                setReimbursementList(reimbursementList);                
            } catch (error) {
                console.log(error);
                alert('There was an error communicating with the server.')              
            }
            setShow(true);
        })()
    },[]);

    function navigateToReimbursement(index:number) {
        setListIndex(index);
        navigation.push('Reimbursement');
    }

    return (show ? <FlatList data={reimbursementList} keyExtractor={item => item.id} renderItem={({item, index}) => (
        <Pressable style={{margin:"1.5%"}} onPress={() => navigateToReimbursement(index)}>
            <ReimbursementListItem {...item}/>
        </Pressable>
    )}/>:<></>)
}