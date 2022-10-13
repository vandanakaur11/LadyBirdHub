import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../DrawerContent/DrawerContent';
import SplashScreen from '../SplashScreen/SplashScreen';
import OnboardingScreen from '../OnboardingScreen/OnboardingScreen';
import RootStackScreen from '../RootStackScreen/RootStackScreen';
import MainScreens from '../MainScreens/MainScreens';

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

const FirstTimeRun = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="RootStackScreen" component={RootStackScreen} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default FirstTimeRun;
