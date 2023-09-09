import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginStackParamList, MainStackParamList} from '~/screens/@types';
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ViewScreen from './screens/ViewScreen/index';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './screens/SearchScreen';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AuthStack = createNativeStackNavigator<LoginStackParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
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
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            // headerTransparent: true,
            headerLeft: () => (
              <Icon
                name="menu-outline"
                size={20}
                color={'black'}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <Icon name="person-outline" size={20} color={'black'} />
            ),
          })}
        />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="Auth" component={AuthStackNavi} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SearchStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitle: '',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={20}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerStyle: {
          backgroundColor: 'transparent',
        },
      })}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => console.log('out')} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavi = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#FB5839',
        drawerActiveBackgroundColor: 'transparent',
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
          width: '70%',
        },
      }}>
      <Drawer.Screen
        name="Main"
        component={MainStackNavi}
        options={{
          drawerLabel: 'HOME',
          drawerIcon: ({focused}) => (
            <Icon
              name="home-outline"
              size={20}
              color={focused ? '#FB5839' : 'black'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Discover"
        component={SearchStackNavi}
        options={{
          drawerLabel: 'DISCOVER',
          drawerIcon: ({focused}) => (
            <Icon
              name="rocket-outline"
              size={20}
              color={focused ? '#FB5839' : 'black'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
