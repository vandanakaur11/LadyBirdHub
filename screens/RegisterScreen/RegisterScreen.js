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
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as CONSTANT from '../../constant/Constant';
import bgimage from '../../assets/backgroundColor.png';
import Loader from '../../components/Loader';

function RegisterScreen({navigation}) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const validateEmail = userEmail => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(String(userEmail).toLowerCase());
    return isValid;
  };

  const lastnameInputRef = createRef();
  const usernameInputRef = createRef();
  const emailInputRef = createRef();
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

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please enter First Name');
      return;
    }
    if (!userLastName) {
      alert('Please enter Last Name');
      return;
    }
    if (!userName) {
      alert('Please enter Name');
      return;
    }
    if (!userEmail) {
      alert('Please enter Email Address');
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
    //Show Loader
    setLoading(true);

    var dataToSend = {
      first_name: userFirstName,
      last_name: userLastName,
      user_login: userName,
      email: userEmail,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(
      'https://www.ladybirdhub.com/?rest_route=/login/v1/users&AUTH_KEY=softapps.io8080',
      {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        // console.log(responseJson);
        // If server response message same as Data Matched

        if (!responseJson.success) {
          alert('User already exist. Please try to use another Credentials.');
        } else if (responseJson.success) {
          Alert.alert(
            'Registration Successful.',
            'Please Login to proceed',
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
          setUserFirstName('');
          setUserLastName('');
          setUserName('');
          setUserEmail('');
          setUserPassword('');
        } else {
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
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
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        ...styles.text,
                        width: wp('40%'),
                      }}>
                      <TextInput
                        placeholder="First Name"
                        placeholderTextColor={CONSTANT.whiteColor}
                        style={styles.input}
                        onChangeText={UserFirstName =>
                          setUserFirstName(UserFirstName)
                        }
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          lastnameInputRef.current &&
                          lastnameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    </View>
                    <View
                      style={{
                        ...styles.text,
                        width: wp('40%'),
                      }}>
                      <TextInput
                        placeholder="Last Name"
                        placeholderTextColor={CONSTANT.whiteColor}
                        style={styles.input}
                        onChangeText={UserLastName =>
                          setUserLastName(UserLastName)
                        }
                        returnKeyType="next"
                        ref={lastnameInputRef}
                        onSubmitEditing={() =>
                          usernameInputRef.current &&
                          usernameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    </View>
                  </View>
                  <View style={{paddingTop: hp('2%')}}>
                    <View style={styles.text}>
                      <TextInput
                        placeholder="Username"
                        placeholderTextColor={CONSTANT.whiteColor}
                        style={styles.input}
                        onChangeText={UserName => setUserName(UserName)}
                        returnKeyType="next"
                        ref={usernameInputRef}
                        onSubmitEditing={() =>
                          emailInputRef.current && emailInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    </View>
                  </View>
                  <View style={{paddingTop: hp('2%')}}>
                    <View style={styles.text}>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor={CONSTANT.whiteColor}
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={UserEmail => setUserEmail(UserEmail)}
                        returnKeyType="next"
                        ref={emailInputRef}
                        onSubmitEditing={() =>
                          passwordInputRef.current &&
                          passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                      />
                    </View>
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
                    onPress={handleSubmitButton}
                    // onPress={() => navigation.navigate('LoginScreen')}
                  >
                    <View style={styles.signIn}>
                      <Text style={styles.signInText}>Register</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{paddingTop: hp('5%')}}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <View>
                      <Text style={styles.forgotText}>
                        I already have an account
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
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

export default RegisterScreen;
