import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as CONSTANT from '../../constant/Constant';
import randomblog from '../../assets/randomblog.png';
import {useStateValue} from '../../store/stateProvider';
import Banner from '../../Banner';

const Blog = ({navigation, route}) => {
  const {id, title, mediaID, authorID} = route.params;
  const [{blogs}] = useStateValue();
  const [media, setMedia] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usermedia = await fetch(CONSTANT.blogsMedia + mediaID);
      const newMedia = await usermedia.json();
      setMedia(newMedia);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userAuthor = await fetch(CONSTANT.blogsAuthor + authorID);
      const newAuthor = await userAuthor.json();
      setAuthor(newAuthor);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
              paddingBottom: hp('25%'),
              paddingRight: wp('80%'),
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}>
              <View
                style={{
                  backgroundColor: CONSTANT.lightColor,
                  width: wp('10%'),
                  height: hp('5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('3%'),
                  borderWidth: wp('0.2%'),
                  borderColor: CONSTANT.blackColor,
                }}>
                <Image
                  source={require('../../assets/back.png')}
                  style={{
                    marginRight: wp('0.45%'),
                    width: wp('6%'),
                    height: hp('6%'),
                    resizeMode: 'contain',
                    tintColor: CONSTANT.blackColor,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {!media.code ? (
            <Image
              source={{uri: media.source_url}}
              style={{
                width: wp('100%'),
                height: hp('45%'),
              }}
            />
          ) : (
            <Image
              source={randomblog}
              style={{
                width: wp('100%'),
                height: hp('45%'),
              }}
            />
          )}
        </View>
        {blogs.map((blog, indexes) => (
          <View key={indexes}>
            {blog.id === id ? (
              <View style={styles.htmlblog}>
                <View>
                  <Text style={styles.headerText}>
                    {title
                      .replace(/&#8211;/g, '–')
                      .replace(/&#8216;/g, '‘')
                      .replace(/&#8217;/g, "'")
                      .replace(/&#8220;/g, '“')
                      .replace(/&#8221;/g, '”')}
                  </Text>
                  <View>
                    <View
                      style={{
                        paddingVertical: hp('1%'),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: author.avatar_urls?.['96']}}
                        style={{
                          width: wp('10%'),
                          height: hp('10%'),
                          resizeMode: 'contain',
                          borderRadius: 90,
                        }}
                      />
                      <View style={{paddingHorizontal: wp('2%')}}>
                        <Text
                          style={{
                            ...styles.headerText,
                            fontSize: hp('2.5%'),
                            color: CONSTANT.grayColor,
                            fontWeight: 'normal',
                          }}>
                          {author.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{paddingBottom: hp('2%')}}>
                      <Banner />
                    </View>
                  </View>

                  <HTML
                    source={{
                      html: blog?.content.rendered,
                    }}
                    //   source={{
                    //     html: blog?.content.rendered.split(
                    //       '<div class="booster-block booster',
                    //     )[0],
                    //   }}
                    contentWidth={wp('80%')}
                  />
                  <View style={{paddingTop: hp('1%')}}>
                    <Banner />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // backgroundColor: CONSTANT.primaryColor,
    height: hp('35%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    color: CONSTANT.blackColor,
    textAlign: 'left',
    fontSize: hp('3%'),
  },
  headerTextContainer: {
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  htmlblog: {
    paddingTop: hp('5%'),
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: wp('100%'),
    backgroundColor: CONSTANT.whiteColor,
    borderTopRightRadius: wp('15%'),
    borderTopLeftRadius: wp('15%'),
  },
});
