import React, {useState, useEffect, useContext, createContext} from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UserLauncher} from '../../App';
import Splash from '../../assets/Splash.jpg';
import * as CONSTANT from '../../constant/Constant';
import {useStateValue} from '../../store/stateProvider';

const SplashScreen = ({navigation}) => {
  const {firstLaunch, setFirstLaunch} = useContext(UserLauncher);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(CONSTANT.BaseURL);
        const newData = await data.json();
        dispatch({
          type: 'ALL_BLOGS',
          payload: newData,
        });
        // setLoading(false);
        if (firstLaunch == null) {
          return null;
        } else if (firstLaunch == true) {
          setLoading(false);
          navigation.replace('OnboardingScreen');
        } else {
          // navigation.replace('RootStackScreen');
          AsyncStorage.getItem('user_token').then(values =>
            fetch(
              `https://www.ladybirdhub.com/?rest_route=/login/v1/auth/validate&JWT=${values}`,
            )
              .then(response => response.json())
              .then(responseJson => {
                console.log('logined:', responseJson);
                setLoading(false);
                dispatch({
                  type: 'GET_USER',
                  payload: responseJson,
                });
              }),
          );
          AsyncStorage.getItem('user_token').then(value =>
            navigation.replace(
              value === null ? 'RootStackScreen' : 'MainNavigator',
            ),
          );
        }
      } catch (err) {
        // console.log({err});
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await fetch(CONSTANT.blogCategories);
      const newCategory = await category.json();
      dispatch({
        type: 'ALL_CATEGORIES',
        payload: newCategory,
      });
    };
    fetchCategory();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={styles.splash} source={Splash} />
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
              paddingTop: hp('25%'),
            }}>
            <ActivityIndicator
              size="large"
              color={CONSTANT.primaryColor}
              style={{
                height: hp('6%'),
                width: wp('6%'),
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image style={styles.splash} source={Splash} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    height: hp('100%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
