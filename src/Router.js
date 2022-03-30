import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import Sign from './screens/auth/Sign';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Messages from './screens/MainStack/Messages';
import Rooms from './screens/MainStack/Rooms';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignScreen" component={Sign} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoomScreen"
        component={Rooms}
        options={{
          title: 'Odalar',
          headerTintColor: '#FF6F00',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              name="logout"
              size={30}
              color="#FF6F00"
              onPress={() => {
                auth().signOut();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MessagesScreen"
        component={Messages}
        options={({route}) => ({
          title: route.params.room_name,
          headerTintColor: '#FF6F00',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              name="logout"
              size={30}
              color="#FF6F00"
              onPress={() => {
                auth().signOut();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const Router = () => {
  const [userSession, setUserSession] = React.useState(null);
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userSession ? (
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
