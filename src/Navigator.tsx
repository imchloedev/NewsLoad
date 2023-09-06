import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginStackParamList} from '@screens/types';
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ViewScreen from './screens/ViewScreen/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './screens/SearchScreen';
import {Button} from 'react-native';

const AuthStack = createNativeStackNavigator<LoginStackParamList>();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavi />
    </NavigationContainer>
  );
};

export default Navigator;

const AuthStackNavi = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const MainStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={({navigation}) => ({
          headerLeft: () => (
            <Button title="Open" onPress={() => navigation.openDrawer()} />
          ),
        })}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="Auth" component={AuthStackNavi} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DrawerNavi = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainStackNavi} />
      <Drawer.Screen name="Discover" component={SearchScreen} />
    </Drawer.Navigator>
  );
};
