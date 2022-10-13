import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as CONSTANT from '../constant/Constant';

const InputText = ({placeHolder, value, onTextChange, onTextSubmit}) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.TextFieldView}>
      <TextInput
        autoCorrect={false}
        style={styles.TextField}
        placeholder={placeHolder}
        value={text}
        onChangeText={onTextChange}
        onEndEditing={onTextSubmit}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: hp('2%'),
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
  },
  TextFieldView: {
    borderWidth: 1,
    height: hp('5%'),
    width: wp('80%'),
    borderRadius: wp('1%'),
    borderColor: CONSTANT.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputText;
