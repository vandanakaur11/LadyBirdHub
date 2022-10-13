import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import ActivationScreen from '../ActivationScreen/ActivationScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
    <RootStack.Screen name="ActivationScreen" component={ActivationScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
