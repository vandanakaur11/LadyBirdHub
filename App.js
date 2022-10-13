import React, {useEffect, useState, createContext} from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FirstTimeRun from './screens/OnReloadScreens/FirstTimeRun';
import AfterTimeRun from './screens/OnReloadScreens/AfterTimeRun';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StateProvider} from './store/stateProvider';
import reducer, {initialState} from './store/reducer';
import {createStackNavigator} from '@react-navigation/stack';
import * as CONSTANT from './constant/Constant';

const Stack = createStackNavigator();
export const UserLauncher = createContext();

const App = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);
  const [jwtToken, jwtSetToken] = useState('');
  const [dataLaunch, setDataLaunch] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user_token').then(value => jwtSetToken(value));
  }, []);
  console.log(jwtToken);
  // console.log(jwtToken);

  useEffect(() => {
    AsyncStorage.getItem('AlreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('AlreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <UserLauncher.Provider value={{firstLaunch, setFirstLaunch}}>
        <NavigationContainer>
          {Platform.OS === 'android' ? (
            <StatusBar
              backgroundColor={CONSTANT.primaryColor}
              barStyle="light-content"
            />
          ) : (
            <StatusBar hidden />
          )}
          {firstLaunch == null ? null : firstLaunch == true ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="FirstTimeRun" component={FirstTimeRun} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="AfterTimeRun" component={AfterTimeRun} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </UserLauncher.Provider>
    </StateProvider>
  );
};

export default App;

// import React, {useEffect, useState, createContext} from 'react';
// import {StatusBar, Platform} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import FirstTimeRun from './screens/OnReloadScreens/FirstTimeRun';
// import AfterTimeRun from './screens/OnReloadScreens/AfterTimeRun';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {StateProvider} from './store/stateProvider';
// import reducer, {initialState} from './store/reducer';
// import {createStackNavigator} from '@react-navigation/stack';
// import * as CONSTANT from './constant/Constant';

// const Stack = createStackNavigator();
// export const UserLauncher = createContext();

// const App = () => {
//   const [firstLaunch, setFirstLaunch] = useState(null);
//   const [dataLaunch, setDataLaunch] = useState([]);

//   useEffect(() => {
//     AsyncStorage.getItem('AlreadyLaunched').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('AlreadyLaunched', 'true');
//         setFirstLaunch(true);
//       } else {
//         setFirstLaunch(false);
//       }
//     });
//   }, []);

//   if (firstLaunch == null) {
//     return null;
//   } else if (firstLaunch == true) {
//     return (
//       <StateProvider reducer={reducer} initialState={initialState}>
//         <UserLauncher.Provider value={{firstLaunch, setFirstLaunch}}>
//           <NavigationContainer>
//             {Platform.OS === 'android' ? (
//               <StatusBar
//                 backgroundColor={CONSTANT.primaryColor}
//                 barStyle="light-content"
//               />
//             ) : (
//               <StatusBar hidden />
//             )}
//             <Stack.Navigator
//               initialRouteName="FirstTimeRun"
//               screenOptions={{
//                 headerShown: false,
//               }}>
//               <Stack.Screen name="FirstTimeRun" component={FirstTimeRun} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </UserLauncher.Provider>
//       </StateProvider>
//     );
//   } else {
//     return (
//       <StateProvider reducer={reducer} initialState={initialState}>
//         <UserLauncher.Provider
//           value={{firstLaunch, setFirstLaunch, dataLaunch, setDataLaunch}}>
//           <NavigationContainer>
//             {Platform.OS === 'android' ? (
//               <StatusBar
//                 backgroundColor={CONSTANT.primaryColor}
//                 barStyle="light-content"
//               />
//             ) : (
//               <StatusBar hidden />
//             )}
//             <Stack.Navigator
//               initialRouteName="AfterTimeRun"
//               screenOptions={{
//                 headerShown: false,
//               }}>
//               <Stack.Screen name="AfterTimeRun" component={AfterTimeRun} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </UserLauncher.Provider>
//       </StateProvider>
//     );
//   }
// };

// export default App;
