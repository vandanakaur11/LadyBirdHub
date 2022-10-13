import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as CONSTANT from '../constant/Constant';

const InputText = ({text}) => {
  const [text, setText] = useState('');
  return <Text style={styles.Texts}>{text}</Text>;
};

const styles = StyleSheet.create({
  Texts: {
    fontSize: hp('2%'),
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    color: CONSTANT.whiteColor,
  },
});

export default InputText;
