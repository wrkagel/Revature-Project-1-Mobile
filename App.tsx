import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Text, View } from 'react-native';
import LoginView from './components/login-view';
import LogoutButton from './components/logout-button';
import ManagedView from './components/managed-view';
import ReimbursementViewList from './components/reimbursement-list-view';
import ReimbursementView from './components/reimbursement-view';
import ReimbursementItem from './models/reimbursement-item'

export default function App() {

  const [managerId, setManagerId] = useState<string>("");
  const [reimbursementList, setReimbursementList] = useState<ReimbursementItem[]>([]);
  const [listIndex, setListIndex] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const storedId = await AsyncStorageLib.getItem("managerId");
      setManagerId(storedId ?? "");
      console.log(managerId);
    })()
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <View style={{flex:1, display:"flex"}}>
      <Text style={{fontSize:30, fontWeight:"bold"}}>Reimbursement System</Text>
      {!Boolean(managerId) ? 
        <LoginView setManagerId={setManagerId}/> :
        <NavigationContainer>
          <LogoutButton setManagerId={setManagerId}/>
          <Stack.Navigator initialRouteName='Managed' >
            <Stack.Screen name={"Managed"}>
              {(props) => <ManagedView {...props} managerId={managerId}/>}
            </Stack.Screen>
            <Stack.Screen name={"ReimbursementList"}>
              {(props) => <ReimbursementViewList {...props} setReimbursementList={setReimbursementList} setListIndex={setListIndex}/>}
            </Stack.Screen>
            <Stack.Screen name={"Reimbursement"}>
              {(props) => <ReimbursementView {...props} reimbursement={reimbursementList[listIndex]}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>}
      <StatusBar/>
    </View>
  );
}