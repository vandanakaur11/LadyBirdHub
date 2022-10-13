import React, {createRef, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as CONSTANT from '../../constant/Constant';
import bgimage from '../../assets/backgroundColor.png';
import Loader from '../../components/Loader';

const ActivationScreen = ({navigation, route}) => {
  //   const {email} = route.params;
  const [userCode, setUserCode] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const passwordInputRef = createRef();

  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const resetPassword = () => {
    setErrortext('');
    if (!userCode) {
      alert('Please fill Reset Code');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {code: userCode, new_password: userPassword, email: email};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //Fetching Token
    fetch(
      'https://www.ladybirdhub.com/?rest_route=/login/v1/user/set_password',
      {
        method: 'POST',
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson.success) {
          Alert.alert(
            'Password Reset Succesfully!',
            'Now you can login to your account.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('LoginScreen');
                },
              },
            ],
            {cancelable: false},
          );
        } else if (!responseJson.status) {
          setLoading(false);
          alert('Please enter correct email');
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Loader loading={loading} />
          <ImageBackground source={bgimage} style={styles.Backgroundimage}>
            <View style={styles.main}>
              <View>
                <Image
                  style={styles.logo}
                  source={require('../../assets/Logo.png')}
                />
              </View>
              <View style={{paddingTop: hp('10%')}}>
                <View style={styles.text}>
                  <TextInput
                    autoCapitalize="none"
                    autoCompleteType="name"
                    placeholder="Activation Code"
                    placeholderTextColor={CONSTANT.whiteColor}
                    style={styles.input}
                    onChangeText={userCode => setUserCode(userCode)}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <View style={{paddingTop: hp('2%')}}>
                  <View style={styles.text}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={CONSTANT.whiteColor}
                      minLength={8}
                      maxLength={15}
                      secureTextEntry={data.secureTextEntry ? true : false}
                      autoCompleteType="password"
                      style={styles.input}
                      onChangeText={UserPassword =>
                        setUserPassword(UserPassword)
                      }
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      returnKeyType="next"
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                      {data.secureTextEntry ? (
                        <Image
                          source={require('../../assets/eyeOff.png')}
                          style={styles.iconsText}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/eyeOn.png')}
                          style={styles.iconsText}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{paddingTop: hp('2%')}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('LoginScreen')}
                  //   onPress={resetPassword}
                >
                  <View style={styles.signIn}>
                    <Text style={styles.signInText}>Update Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('9%'),
    height: hp('9%'),
    resizeMode: 'contain',
    tintColor: CONSTANT.whiteColor,
  },
  accText: {
    color: 'white',
    fontSize: hp('1.6%'),
    fontFamily: 'HelveticaNeueLTStd-Th',
  },
  signinText: {
    color: CONSTANT.blackColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    backgroundColor: CONSTANT.whiteBlurColor,
    borderColor: CONSTANT.whiteColor,
    height: hp('6%'),
    borderBottomWidth: wp('0.25%'),
    paddingHorizontal: wp('3%'),
    display: 'flex',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: CONSTANT.whiteColor,
  },
  main: {
    alignItems: 'center',
  },
  Backgroundimage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: wp('45%'),
    resizeMode: 'contain',
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANT.whiteColor,
    borderRadius: wp('2%'),
    width: wp('70%'),
    height: hp('5%'),
    elevation: 25,
  },
  signInText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    color: CONSTANT.primaryColor,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivationScreen;
