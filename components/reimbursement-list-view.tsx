import axios from "axios";
import { useEffect } from "react";
import { FlatList, Pressable} from "react-native";
import ReimbursementItem from "../models/reimbursement-item";
import { backendAddress } from "./login-view";
import ReimbursementListItem from "./reimbursement-list-item";


export default function ReimbursementViewList(props:{navigation:any, route: any, reimbursementList:ReimbursementItem[], setReimbursementList:Function, setListIndex:Function}) {

    const {navigation, route, reimbursementList, setReimbursementList, setListIndex} = props;
    const {id} = route.params;

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

        })()
    },[]);

    async function navigateToReimbursement(index:number) {

        setListIndex(index);
        navigation.push('Reimbursement');
    }

    return (<FlatList data={reimbursementList} keyExtractor={item => item.id} renderItem={({item, index}) => (
        <Pressable onPress={() => navigateToReimbursement(index)}>
            <ReimbursementListItem {...item}/>
        </Pressable>
    )}/>)
}