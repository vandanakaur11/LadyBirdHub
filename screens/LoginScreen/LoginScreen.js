import React, {useState, createRef, createContext} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../components/Loader';
import * as CONSTANT from '../../constant/Constant';
import {useStateValue} from '../../store/stateProvider';
import bgimage from '../../assets/backgroundColor.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  const validateEmail = userEmail => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(String(userEmail).toLowerCase());
    return isValid;
  };
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [jwtToken, jwtSetToken] = useState('');
  const [, dispatch] = useStateValue();

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

  const handleSubmitPress = () => {
    if (!userEmail) {
      alert('Please enter Email');
      return;
    }
    if (!validateEmail(userEmail)) {
      alert('Please enter valid Email');
      return;
    }
    if (!userPassword) {
      alert('Please enter Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //Fetching Token
    fetch('https://www.ladybirdhub.com/?rest_route=/login/v1/auth/', {
      method: 'POST',
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson.success === true) {
          AsyncStorage.setItem('user_token', responseJson.data.jwt);
          jwtSetToken(responseJson.data.jwt);
          fetch(
            `https://www.ladybirdhub.com/?rest_route=/login/v1/auth/validate&JWT=${responseJson.data.jwt}`,
          )
            .then(response => response.json())
            .then(responseJson => {
              console.log('login:', responseJson);
              dispatch({
                type: 'GET_USER',
                payload: responseJson,
              });
              responseJson.data.user.ID && setLoading(false);
              navigation.replace('MainNavigator');
            });
        } else {
          setLoading(false);
          alert(responseJson.data.message);
          AsyncStorage.setItem('user_token', null);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(responseJson.data.message);
        alert(responseJson.data.message);
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
              <View style={{paddingTop: hp('2.5%')}}>
                <View style={styles.text}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor={CONSTANT.whiteColor}
                    autoCompleteType="email"
                    style={styles.input}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
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
                  // onPress={() => navigation.navigate('MainNavigator')}
                  onPress={handleSubmitPress}>
                  <View style={styles.signIn}>
                    <Text style={styles.signInText}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: hp('2%')}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <View>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: hp('25%')}}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  <View>
                    <Text style={styles.forgotText}>
                      I don't have an account
                    </Text>
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
    // shadowColor: CONSTANT.blackColor,
    // shadowOpacity: 0.75,
    // shadowRadius: 13.5,
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

export default LoginScreen;
