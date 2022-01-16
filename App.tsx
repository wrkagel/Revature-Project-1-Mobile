import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Text, View } from 'react-native';
import LoginView from './components/login-view';
import LogoutButton from './components/logout-button';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storageAuthentication = await AsyncStorageLib.getItem("isAuthenticated");
      if(storageAuthentication) setIsAuthenticated(true);
    })()
  }, []);

  return (
    <View>
      <Text>Reimbursement System</Text>
      {!isAuthenticated ? 
        <LoginView setIsAuthenticated={setIsAuthenticated}/> :
        <LogoutButton setIsAuthenticated={setIsAuthenticated}/>}
      <StatusBar/>
    </View>
  );
}