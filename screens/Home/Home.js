import React, {useEffect, useState, useContext} from 'react';
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
import randomblog from '../../assets/randomblog.png';
import Banner from '../../Banner';
import Header from '../../components/Header';
import CategoriesHeader from '../../components/CategoriesHeader';
import * as CONSTANT from '../../constant/Constant';
import {useStateValue} from '../../store/stateProvider';
import moment from 'moment';
import BlogDisplay from '../../components/BlogDisplay';

const Home = ({navigation}) => {
  const [{blogs}] = useStateValue();
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <Header navigation={navigation} />
          <CategoriesHeader navigation={navigation} />
          <View style={styles.mainContainer}>
            <View
              style={{
                left: wp('30%'),
                alignItems: 'center',
                paddingVertical: hp('0.5%'),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllCategories')}>
                <Text
                  style={{
                    ...styles.seeall,
                    color: CONSTANT.blackColor,
                  }}>
                  See all Categories
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                width: wp('92%'),
                // paddingBottom: hp('1%'),
              }}>
              <Text style={styles.rcblogs}>{CONSTANT.RecentBlogs}</Text>
            </View>
            <View>
              <Banner />
            </View>
            <FlatList
              data={blogs}
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
            <View
              style={{
                position: 'absolute',
                zIndex: 999,
                top: hp('68%'),
                left: wp('80%'),
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  seeall: {
    color: CONSTANT.primaryColor,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});

export default Home;
