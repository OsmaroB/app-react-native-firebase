import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
// import components
import UserList from './screens/Users/UserList';
import CreateUserScreen from './screens/Users/CreateUserScreen';
import UserDetailScreen from './screens/Users/UserDetailScreen';

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList}/>
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
