import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Text, View } from 'react-native';
import LoginView from './components/login-view';
import LogoutButton from './components/logout-button';
import ReimbursementView from './components/reimbursement-view';
import ReimbursementItem, { ReimbursementStatus } from './models/reimbursement-item';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storageAuthentication = await AsyncStorageLib.getItem("isAuthenticated");
      if(storageAuthentication) setIsAuthenticated(true);
    })()
    setIsAuthenticated(true);
  }, []);

  return (
    <View style={{flex:1, display:"flex"}}>
      <Text style={{fontSize:30, fontWeight:"bold"}}>Reimbursement System</Text>
      {!isAuthenticated ? 
        <LoginView setIsAuthenticated={setIsAuthenticated}/> :
        <View style={{flex:1}}>
          <ReimbursementView {...testItem}/>
          <LogoutButton setIsAuthenticated={setIsAuthenticated}/>
        </View>}
      <StatusBar/>
    </View>
  );
}

const testItem:ReimbursementItem = {
  id:"test-test-test-test-test", 
  employeeId:"test-test-test-test-test",
  type:"Testing",
  desc:"This is for testing.",
  amount:1000000.99,
  date:Date.now(),
  status:ReimbursementStatus.pending
};