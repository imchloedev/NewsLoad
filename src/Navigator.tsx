import React from 'react';
import {View, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  ProfileScreen,
  ViewScreen,
  SearchScreen,
} from '~/screens';
import {LoginStackParamList, MainStackParamList} from '@screens/@types';
import useThemeColors from '~/hooks/useThemeColors';
import auth from '@react-native-firebase/auth';

const AuthStack = createNativeStackNavigator<LoginStackParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DrawerNavi />
    </NavigationContainer>
  );
};

export default Navigator;

const AuthStackNavi = () => {
  const theme = useThemeColors();

  return (
    <AuthStack.Navigator
      screenOptions={({navigation}) => ({
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: () => (
          <Icon
            name="arrow-back-outline"
            size={22}
            color={theme.colors.text}
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={({navigation}) => ({
          // headerShown: false,
        })}
      />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const MainStackNavi = () => {
  const theme = useThemeColors();
  const user = auth().currentUser;

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
            headerLeft: () => (
              <Icon
                name="menu-outline"
                size={22}
                color={theme.colors.text}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <Icon
                name="person-outline"
                size={22}
                color={theme.colors.text}
                onPress={() =>
                  user
                    ? navigation.navigate('Profile')
                    : navigation.navigate('Auth', {screen: 'SignIn'})
                }
              />
            ),
          })}
        />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen
          name="Auth"
          component={AuthStackNavi}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SearchStackNavi = () => {
  const theme = useThemeColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <Icon
              name="menu-outline"
              size={20}
              color={theme.colors.text}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: 'transparent',
          },
        })}
      />
      <Stack.Screen name="View" component={ViewScreen} />
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
  const theme = useThemeColors();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerActiveBackgroundColor: 'transparent',
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
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
              color={focused ? theme.colors.primary : theme.colors.text}
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
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
