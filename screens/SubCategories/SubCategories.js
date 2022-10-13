import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as CONSTANT from '../../constant/Constant';
import randomblog from '../../assets/randomblog.png';
import Header from '../../components/Header';
import Banner from '../../Banner';
import BlogDisplay from '../../components/BlogDisplay';

const SubCategories = ({navigation, route}) => {
  const {catname, catID} = route.params;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };

  // console.log(catID);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const category = await fetch(
        `https://www.ladybirdhub.com/wp-json/wp/v2/posts?categories=${catID}&_embed`,
      );
      const newCategory = await category.json();
      setCategories(newCategory);
      // console.log(newCategory);
      setLoading(false);
    };
    fetchCategory();
  }, []);

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
          <Header navigation={navigation} />
          <View style={styles.mainContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                width: wp('92%'),
                marginTop: hp('6%'),
              }}>
              <Text style={styles.rcblogs}>
                {catname.replace(/amp;/g, '')} Blogs
              </Text>
              <TouchableOpacity
                transparent
                style={{justifyContent: 'center', paddingRight: wp('1.5%')}}
                onPress={() => {
                  navigation.replace('Home');
                }}>
                <Text style={styles.seeall}>{CONSTANT.seeall}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: hp('1%'), marginBottom: hp('5%')}}>
              <View style={{paddingBottom: hp('0.5%')}}>
                <Banner />
              </View>
              <FlatList
                data={categories}
                keyExtractor={(x, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                ref={ref => {
                  listViewRef = ref;
                }}
                renderItem={({item, index}) => {
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
              <View style={{marginVertical: hp('0.25%')}}>
                <Banner />
              </View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  top: hp('73.25%'),
                  left: wp('78.5%'),
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

export default SubCategories;

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
  seeall: {
    color: CONSTANT.primaryColor,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});
