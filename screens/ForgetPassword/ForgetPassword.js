import React, {useState} from 'react';
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

function ForgetPassword({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const setNewPassword = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Warning!', 'Please Enter Email to Reset Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //Fetching Token
    fetch(
      'https://www.ladybirdhub.com/?rest_route=/login/v1/user/reset_password',
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
            'A password reset email has been sent to your email address.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('ActivationScreen', {email: userEmail});
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
                    placeholder="Email"
                    placeholderTextColor={CONSTANT.whiteColor}
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={UserLogin => setUserLogin(UserLogin)}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
              </View>
              <View style={{paddingTop: hp('2%')}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ActivationScreen')}
                  // onPress={setNewPassword}
                >
                  <View style={styles.signIn}>
                    <Text style={styles.signInText}>Reset Password</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{paddingTop: hp('27%')}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <View>
                    <Text style={styles.forgotText}>Remember Password?</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
  forgotText: {
    color: CONSTANT.whiteColor,
    textDecorationLine: 'underline',
    fontSize: hp('1.6%'),
  },
});

export default ForgetPassword;
