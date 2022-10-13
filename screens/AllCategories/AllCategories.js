import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import backbutton from '../../assets/back.png';
import * as CONSTANT from '../../constant/Constant';
import book from '../../assets/book.png';
import {useStateValue} from '../../store/stateProvider';

const AllCategories = ({navigation}) => {
  const [{allCategories}] = useStateValue();
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };
  const num = 2;

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <Header navigation={navigation} />
          <View style={styles.mainContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('92%'),
                paddingBottom: hp('1%'),
              }}>
              <Text style={styles.category}>Select Category</Text>
              <TouchableOpacity
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                <Image
                  source={backbutton}
                  style={{
                    height: hp('4%'),
                    width: wp('4%'),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{
                width: wp('100%'),
                marginBottom: hp('2%'),
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data={allCategories}
              keyExtractor={(x, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={num}
              ref={ref => {
                listViewRef = ref;
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('SubCategories', {
                        catname: item.name,
                        catID: item.id,
                      })
                    }>
                    <View style={styles.homeCard}>
                      <Image source={book} style={styles.image} />
                      <Text style={styles.titleText}>
                        {item.name.replace(/amp;/g, '')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 999,
                top: hp('75%'),
                left: wp('80%'),
              }}>
              <TouchableOpacity activeOpacity={0.8} onPress={pushToTop}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/toparrow.png')}
                    style={{
                      height: hp('5%'),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.whiteColor,
  },
  category: {
    color: CONSTANT.blackColor,
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
  },
  seeall: {
    color: CONSTANT.primaryColor,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  content: {
    paddingHorizontal: wp('6%'),
    width: wp('100%'),
    height: hp('7.5%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  homeCard: {
    borderColor: CONSTANT.lightgrayColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.05%'),
    height: hp('15%'),
    width: wp('45%'),
    marginVertical: hp('0.5%'),
    marginHorizontal: wp('1%'),
    elevation: 5,
    borderRadius: wp('2%'),
    backgroundColor: 'white',
  },
  image: {
    height: hp('8%'),
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: hp('1.65%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
