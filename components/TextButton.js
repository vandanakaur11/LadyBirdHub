import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as CONSTANT from '../constant/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TextButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.button]}>
      <Text style={[textStyle, styles.Text]}> {title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp('5%'),
    width: wp('40%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('0.5%'),
    borderColor: CONSTANT.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: hp('1.5%'),
  },
});

export default TextButton;
