import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import * as CONSTANT from '../../constant/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useStateValue} from '../../store/stateProvider';
import book from '../../assets/book.png';

const InterestScreen = ({navigation}) => {
  const [{allCategories}] = useStateValue();
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };
  const num = 2;

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: hp('2%'),
        }}>
        <Text
          style={{
            color: CONSTANT.primaryColor,
            fontSize: hp('2.5%'),
            fontWeight: 'bold',
          }}>
          Choose your Interest
        </Text>
      </View>
      <FlatList
        style={{
          width: wp('100%'),
          marginBottom: hp('2%'),
        }}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        data={allCategories}
        keyExtractor={(x, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        ref={ref => {
          listViewRef = ref;
        }}
        numColumns={num}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.replace('SubCategories', {
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
          top: hp('90%'),
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
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANT.whiteColor,
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
