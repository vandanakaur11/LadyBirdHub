import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DrawerActions} from '@react-navigation/native';
import * as CONSTANT from '../../constant/Constant';
import {useStateValue} from '../../store/stateProvider';

function DrawerContent({navigation, props}) {
  const [{userData}] = useStateValue();

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: CONSTANT.whiteColor,
          height: hp('12%'),
          width: '100%',
        }}>
        <View>
          <Image
            source={require('../../assets/ladybird.png')}
            style={{
              height: hp('7%'),
              width: wp('45%'),
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
              style={{
                height: hp('4.5%'),
                resizeMode: 'contain',
                tintColor: CONSTANT.blackColor,
              }}
              source={require('../../assets/navIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.drawerContainer}>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp('1%'),
            }}>
            <Avatar.Image
              source={require('../../assets/Profile1.png')}
              style={{backgroundColor: CONSTANT.whiteColor}}
              size={60}
            />

            {!userData.success ? (
              <View
                style={{
                  marginLeft: wp('2%'),
                  flexDirection: 'column',
                  width: wp('45%'),
                }}>
                <Title style={styles.title}>User</Title>
                <Caption style={styles.caption}>user@gmail.com</Caption>
              </View>
            ) : (
              <View
                style={{
                  marginLeft: wp('2%'),
                  flexDirection: 'column',
                  width: wp('45%'),
                }}>
                <Title style={styles.title}>
                  {userData.data.user.user_login}
                </Title>
                <Caption style={styles.caption}>
                  {userData.data.user.user_email}
                </Caption>
              </View>
            )}
          </View>
        </View>
        <DrawerContentScrollView>
          <Drawer.Section style={styles.drawerContainer}>
            <DrawerItem
              label="Home"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <DrawerItem
              label="News"
              onPress={() => {
                navigation.navigate('SubCategories', {
                  catname: 'News',
                  catID: 4,
                });
              }}
            />
            <DrawerItem
              label="Careers"
              onPress={() => {
                navigation.navigate('SubCategories', {
                  catname: 'Careers',
                  catID: 6,
                });
              }}
            />
            <DrawerItem
              label="Fashion and Beauty"
              onPress={() => {
                navigation.navigate('SubCategories', {
                  catname: 'Fashion and Beauty',
                  catID: 3,
                });
              }}
            />
            <DrawerItem
              label="Science"
              onPress={() => {
                navigation.navigate('SubCategories', {
                  catname: 'Science',
                  catID: 9,
                });
              }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({focused}) => (
            <View>
              <Image
                source={require('../../assets/SignOut.png')}
                resizeMode="contain"
                style={{
                  width: wp('10%'),
                  height: hp('5%'),
                  resizeMode: 'contain',
                  tintColor: focused
                    ? CONSTANT.primaryColor
                    : CONSTANT.blackColor,
                }}
              />
            </View>
          )}
          label="Sign Out"
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.removeItem('user_token');
                    navigation.navigate('RootStackScreen');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    marginVertical: hp('1.5%'),
    marginRight: wp('1%'),
  },
  userInfoSection: {
    justifyContent: 'center',
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  caption: {
    fontSize: hp('1.5%'),
    lineHeight: hp('2%'),
  },
  bottomDrawerSection: {
    marginBottom: hp('3%'),
    borderTopColor: CONSTANT.whiteBlurColor,
    borderTopWidth: 1,
  },
});

export default DrawerContent;
