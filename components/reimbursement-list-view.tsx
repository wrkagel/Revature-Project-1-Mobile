import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";


export default function ReimbursementViewList(props: { navigation: any}) {

    const navigation = props.navigation;

    function navigateToReimbursement() {
        navigation.push('Reimbursement');
    }

    return (<View>
        <Button title="GoToReimbursement" onPress={navigateToReimbursement} />
    </View>)
}