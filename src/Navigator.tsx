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
import auth from '@react-native-firebase/auth';
import {
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  ProfileScreen,
  ViewScreen,
  DiscoverScreen,
  SearchScreen,
  WebViewScreen,
  BookmarkScreen,
  ChannelScreen,
} from '~/screens';
import {MainStackParamList} from '@screens/@types';
import {CustomHeader} from '@components/common';
import useThemeColors from '~/hooks/useThemeColors';
import {
  handleFirebaseAuthError,
  isFirebaseAuthError,
  onSignOut,
} from '~/apis/auth';
import {showAlert} from '~/utils';

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
            ...commonOptions,
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
                    : navigation.navigate('SignIn')
                }
              />
            ),
          })}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({navigation}) => ({
            header: () => <CustomHeader navigation={navigation} />,
          })}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="View"
          component={ViewScreen}
          options={({navigation}) => ({
            headerTitle: '',
            headerTransparent: true,
            headerLeft: () => (
              <Icon
                name="arrow-back-outline"
                size={22}
                color={theme.colors.text}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{
            ...commonOptions,
          }}
        />
        <Stack.Screen
          name="Channel"
          component={ChannelScreen}
          options={({navigation}) => ({
            ...commonOptions,
            headerLeft: () => (
              <Icon
                name="arrow-back-outline"
                size={22}
                color={theme.colors.text}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={22}
              color={theme.colors.text}
              onPress={() => navigation.goBack()}
            />
          ),
        })}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DiscoverStackNavi = () => {
  const theme = useThemeColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={({navigation}) => ({
          ...commonOptions,
          headerLeft: () => (
            <Icon
              name="menu-outline"
              size={20}
              color={theme.colors.text}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({navigation}) => ({
          header: () => <CustomHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="View"
        component={ViewScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={22}
              color={theme.colors.text}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          ...commonOptions,
        }}
      />
    </Stack.Navigator>
  );
};

const BookmarkStackNavi = () => {
  const theme = useThemeColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={({navigation}) => ({
          ...commonOptions,
          headerLeft: () => (
            <Icon
              name="menu-outline"
              size={20}
              color={theme.colors.text}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const user = auth().currentUser;

  const handleLogout = async () => {
    try {
      await onSignOut();
      props.navigation.navigate('Home');
    } catch (err: unknown) {
      if (isFirebaseAuthError(err)) {
        const message = handleFirebaseAuthError(err);
        showAlert('Failed', message);
      }
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <DrawerItemList {...props} />
        {user ? (
          <DrawerItem
            label="Sign out"
            labelStyle={{fontFamily: 'Poppins-Regular'}}
            onPress={handleLogout}
          />
        ) : (
          <DrawerItem
            label="Sign In"
            labelStyle={{fontFamily: 'Poppins-Regular'}}
            onPress={() => props.navigation.navigate('SignIn')}
          />
        )}
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
        drawerLabelStyle: {
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Drawer.Screen
        name="MainNavi"
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
        name="DiscoverNavi"
        component={DiscoverStackNavi}
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
      <Drawer.Screen
        name="BookmarkNavi"
        component={BookmarkStackNavi}
        options={{
          drawerLabel: 'BOOKMARKS',
          drawerIcon: ({focused}) => (
            <Icon
              name="bookmark-outline"
              size={20}
              color={focused ? theme.colors.primary : theme.colors.text}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const commonOptions = {
  headerTitle: '',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: 'transparent',
  },
};
