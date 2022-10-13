import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as CONSTANT from '../constant/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BlogDisplay = props => {
  const media = 'wp:featuredmedia';
  return (
    <View style={styles.card}>
      {props.blogImage?.[media] &&
      props.blogImageMedia?.[media][0]?.source_url != '' ? (
        <View style={styles.imgcontainer}>
          <Image
            source={{
              uri:
                props.blogImage?.[media] &&
                props.blogImageMedia?.[media][0]?.source_url,
            }}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.imgcontainer}>
          <Image source={props.randomMedia} style={styles.image} />
        </View>
      )}
      <View style={styles.content}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              {props.blogTitle
                .replace(/&#8211;/g, '–')
                .replace(/&#8216;/g, '‘')
                .replace(/&#8217;/g, "'")
                .replace(/&#8220;/g, '“')
                .replace(/&#8221;/g, '”')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('56%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{marginHorizontal: wp('0.75%')}}>
                  <Image
                    source={require('../assets/stopwatch.png')}
                    style={{
                      height: hp('3.5%'),
                      width: wp('3.5%'),
                      resizeMode: 'contain',
                      tintColor: CONSTANT.grayColor,
                    }}
                  />
                </View>
                <View>
                  {props.blogTimeFormat == 'a' ? (
                    <Text style={styles.duration}>{props.changeDuration}</Text>
                  ) : (
                    <Text style={styles.duration}>{props.correctDuration}</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginHorizontal: wp('0.75%'),
                  }}>
                  <Image
                    source={require('../assets/editor.png')}
                    style={{
                      height: hp('3.5%'),
                      width: wp('3.5%'),
                      resizeMode: 'contain',
                      tintColor: CONSTANT.grayColor,
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.duration}>{props.authorName}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BlogDisplay;

const styles = StyleSheet.create({
  card: {
    height: hp('18%'),
    width: wp('95%'),
    backgroundColor: CONSTANT.whiteColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    marginVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  image: {
    width: wp('30%'),
    height: wp('20%'),
    resizeMode: 'contain',
    borderRadius: wp('10%'),
  },
  imgcontainer: {
    marginHorizontal: wp('2%'),
    paddingVertical: hp('0.25%'),
    width: wp('30%'),
    height: hp('15%'),
    justifyContent: 'center',
  },
  content: {
    width: wp('60%'),
    marginRight: wp('2%'),
    height: hp('15%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {},
  titleText: {
    fontSize: hp('1.95%'),
    fontWeight: 'bold',
  },
  duration: {
    fontSize: hp('1.65%'),
    fontWeight: '400',
    color: CONSTANT.grayColor,
  },
});
