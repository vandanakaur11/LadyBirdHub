import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import Animated, {Easing} from 'react-native-reanimated';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as CONSTANT from '../../constant/Constant';
import randomblog from '../../assets/randomblog.png';
import nodata from '../../assets/nodata.png';
import backbutton from '../../assets/back.png';
import searchIcon from '../../assets/searchIcon.png';
import ladybird from '../../assets/ladybird.png';
import Banner from '../../Banner';
import BlogDisplay from '../../components/BlogDisplay';

const {Value, timing} = Animated;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Search = ({navigation, route}) => {
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };
  //Search Bar

  const [focused, isFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [boxtranslatex, setboxtranslatex] = useState(new Value(width));
  const [buttonopacity, setbuttonopacity] = useState(new Value(0));
  const [contentopacity, setcontentopacity] = useState(new Value(0));
  const [contenttranslatey, setcontenttranslatey] = useState(new Value(height));

  const inputRefs = useRef();
  function focus() {
    inputRefs.current.focus();
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
    thisPress();
  };

  const onSearchHandler = () => {
    const fetchCategory = async () => {
      setLoading(true);
      const searches = await fetch(
        `https://www.ladybirdhub.com/wp-json/wp/v2/posts?search=${searchValue}&_embed`,
      );
      const newSearches = await searches.json();
      setSearch(newSearches);
      setLoading(false);
    };
    fetchCategory();
    setSearchValue('');
  };

  // Search Value

  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const {searchContent} = route.params;
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const searches = await fetch(
        `https://www.ladybirdhub.com/wp-json/wp/v2/posts?search=${searchContent}&_embed`,
      );
      const newSearches = await searches.json();
      setSearch(newSearches);
      setLoading(false);
    };
    fetchCategory();
  }, []);
  // console.log(search);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          {/* <Header navigation={navigation} style={{display: 'none'}} /> */}
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
              style={[
                styles.inbox,
                {transform: [{translateX: boxtranslatex}]},
              ]}>
              <Animated.View
                style={{
                  opacity: buttonopacity,
                }}>
                <TextInput
                  ref={inputRefs}
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
          <View style={styles.mainContainer}>
            {search.length ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: wp('92%'),
                  marginTop: hp('2%'),
                }}>
                <Text style={styles.rcblogs}>Search Results</Text>
                <TouchableOpacity
                  transparent
                  style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={backbutton}
                    style={{
                      height: hp('4%'),
                      width: wp('4%'),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {!search.length ? (
              <View
                style={{
                  marginTop: hp('43%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('92%'),
                    marginTop: hp('6%'),
                  }}>
                  <Text style={styles.rcblogs}>Search Results</Text>
                  <TouchableOpacity
                    transparent
                    style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Image
                      source={backbutton}
                      style={{
                        height: hp('4%'),
                        width: wp('4%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp('15%'),
                    // paddingTop: hp('65%'),
                    // marginBottom: hp('10%'),
                  }}>
                  <Image
                    source={nodata}
                    style={{
                      height: hp('30%'),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            ) : null}
            <View>
              {!search.length ? (
                <View style={{marginTop: hp('3%')}}>
                  <Banner />
                </View>
              ) : (
                <View>
                  <Banner />
                </View>
              )}
              <FlatList
                data={search}
                keyExtractor={(x, y) => y.toString()}
                showsVerticalScrollIndicator={false}
                ref={ref => {
                  listViewRef = ref;
                }}
                renderItem={({item, indexes}) => {
                  const media = 'wp:featuredmedia';
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Blog', {
                          id: item.id,
                          title: item.title.rendered,
                          mediaID: item.featured_media,
                          authorID: item.author,
                        })
                      }>
                      <BlogDisplay
                        blogImage={item?._embedded}
                        blogImageMedia={item?._embedded}
                        randomMedia={randomblog}
                        blogTitle={item.title.rendered}
                        blogTimeFormat={
                          moment(item.date).fromNow().replace(/ago/, '')[0]
                        }
                        changeDuration={moment(item.date)
                          .fromNow()
                          .replace(/ago/, '')
                          .replace(moment(item.date).fromNow()[0], '1')}
                        correctDuration={moment(item.date)
                          .fromNow()
                          .replace(/ago/, '')}
                        authorName={item?._embedded.author[0].name}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{marginBottom: hp('0.25%')}}>
                <Banner />
              </View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  top: hp('76%'),
                  left: wp('78.75%'),
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.whiteColor,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.whiteColor,
  },
  rcblogs: {
    color: CONSTANT.blackColor,
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
    textTransform: 'capitalize',
  },
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
