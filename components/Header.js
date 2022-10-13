import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as CONSTANT from '../constant/Constant';
import ladybird from '../assets/ladybird.png';
import searchIcon from '../assets/searchIcon.png';

const {Value, timing} = Animated;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Header = ({navigation}) => {
  const inputRef = useRef();
  const [focused, isFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [boxtranslatex, setboxtranslatex] = useState(new Value(width));
  const [buttonopacity, setbuttonopacity] = useState(new Value(0));
  const [contentopacity, setcontentopacity] = useState(new Value(0));
  const [contenttranslatey, setcontenttranslatey] = useState(new Value(height));

  function focus() {
    inputRef.current.focus();
  }

  const thisPress = () => {
    isFocused(true);
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };

    timing(boxtranslatex, input_box_translate_x_config).start();
    timing(buttonopacity, back_button_opacity_config).start();
    timing(contentopacity, content_translate_y_config).start();
    timing(contenttranslatey, content_opacity_config).start();
    focus();
  };

  const thisBlur = () => {
    isFocused(false);
    onSearchHandler();
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    timing(boxtranslatex, input_box_translate_x_config).start();
    timing(buttonopacity, back_button_opacity_config).start();
    timing(contentopacity, content_translate_y_config).start();
    timing(contenttranslatey, content_opacity_config).start();
  };

  const onSearchHandler = () => {
    navigation.navigate('Search', {searchContent: searchValue});
    setSearchValue('');
  };

  return (
    <View style={styles.header}>
      <View
        style={{
          width: wp('60%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: wp('15%'),
            resizeMode: 'contain',
          }}
          source={ladybird}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: wp('4%'),
        }}>
        <TouchableOpacity onPress={thisPress}>
          <Image
            style={{
              width: wp('6%'),
              resizeMode: 'contain',
            }}
            source={searchIcon}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.inbox, {transform: [{translateX: boxtranslatex}]}]}>
        <Animated.View
          style={{
            opacity: buttonopacity,
          }}>
          <TextInput
            ref={inputRef}
            style={{
              width: wp('87.35%'),
              fontSize: hp('1.8%'),
              color: 'black',
              paddingHorizontal: wp('4.5%'),
            }}
            value={searchValue}
            placeholder="Type to search..."
            placeholderTextColor={CONSTANT.grayColor}
            keyboardType="default"
            returnKeyType="search"
            onSubmitEditing={thisBlur}
            onChangeText={searchValue => {
              setSearchValue(searchValue);
            }}
          />
        </Animated.View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: wp('6%'),
          }}>
          {/* <TouchableOpacity onPress={thisBlur}>
            <Image
              style={{
                width: wp('6%'),
                resizeMode: 'contain',
              }}
              source={searchIcon}
            />
          </TouchableOpacity> */}
          {!searchValue.length ? (
            <TouchableOpacity>
              <Image
                style={{
                  width: wp('6%'),
                  resizeMode: 'contain',
                }}
                source={searchIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={thisBlur}>
              <Image
                style={{
                  width: wp('6%'),
                  resizeMode: 'contain',
                }}
                source={searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp('2%'),
    backgroundColor: CONSTANT.whiteColor,
    height: hp('12%'),
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inbox: {
    height: hp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: wp('99%'),
    backgroundColor: 'white',
    borderColor: 'black',
  },
});

export default Header;
