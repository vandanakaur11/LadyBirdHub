import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InterestScreen from '../InterestScreen/InterestScreen';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import SubCategories from '../SubCategories/SubCategories';
import AllCategories from '../AllCategories/AllCategories';
import Search from '../Search/Search';

const MainStack = createStackNavigator();

const MainScreens = ({navigation}) => {
  return (
    <MainStack.Navigator
      initialRouteName="InterestScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="InterestScreen" component={InterestScreen} />
      <MainStack.Screen name="Blog" component={Blog} />
      <MainStack.Screen name="AllCategories" component={AllCategories} />
      <MainStack.Screen name="SubCategories" component={SubCategories} />
      <MainStack.Screen name="Search" component={Search} />
    </MainStack.Navigator>
  );
};

export default MainScreens;
