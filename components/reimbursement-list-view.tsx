import { Button, View } from "react-native";


export default function ReimbursementViewList(props:{navigation:any, route: any}) {

    const {navigation, route} = props;
    const {id} = route.params;

    function navigateToReimbursement() {
        navigation.push('Reimbursement');
    }

    return (<View>
        <Button title={id.toLowerCase()} onPress={navigateToReimbursement} />
    </View>)
}