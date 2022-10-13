import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../SplashScreen/SplashScreen';
import RootStackScreen from '../RootStackScreen/RootStackScreen';
import MainScreens from '../MainScreens/MainScreens';
import DrawerContent from '../DrawerContent/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      drawerPosition="left">
      <Drawer.Screen name="MainScreens" component={MainScreens} />
    </Drawer.Navigator>
  );
};

const AfterTimeRun = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="RootStackScreen" component={RootStackScreen} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AfterTimeRun;
