import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import * as CONSTANT from '../constant/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={CONSTANT.primaryColor}
        style={{
          // height: hp('5%'),
          // width: wp('5%'),
          // borderRadius: wp('2.5%'),
          height: 40,
          width: 40,
          borderRadius: 50,
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: CONSTANT.whiteColor,
          elevation: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANT.whiteColor,
  },
});

export default LoadingIndicator;
