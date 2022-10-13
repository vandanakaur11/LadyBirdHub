import React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as CONSTANT from '../constant/Constant';
import art from '../assets/art.jpg';
import animals from '../assets/animals.png';
import careers from '../assets/careers.jpg';
import confession from '../assets/confession.jpg';
import entertainment from '../assets/entertainment.jpg';
import fashion from '../assets/fashion.jpg';
import food from '../assets/food.jpg';
import lifestyle from '../assets/lifestyle.jpg';
import news from '../assets/news.jpg';
import movies from '../assets/movies.jpg';
import outdoors from '../assets/outdoors.jpg';
import science from '../assets/science.jpg';

const CategoriesHeader = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: wp('1%'),
          }}>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Art &amp; Culture',
                  catID: 18,
                })
              }>
              <Image source={art} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Animals',
                  catID: 557,
                })
              }>
              <Image source={animals} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Confession',
                  catID: 78,
                })
              }>
              <Image source={confession} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Entertainment',
                  catID: 8,
                })
              }>
              <Image source={entertainment} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Fashion and Beauty',
                  catID: 3,
                })
              }>
              <Image source={fashion} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Food',
                  catID: 16,
                })
              }>
              <Image source={food} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Lifestyle',
                  catID: 4,
                })
              }>
              <Image source={lifestyle} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Movies and TV',
                  catID: 5,
                })
              }>
              <Image source={movies} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'News',
                  catID: 4,
                })
              }>
              <Image source={news} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Outdoors',
                  catID: 2,
                })
              }>
              <Image source={outdoors} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
          <View style={styles.catimgcontainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  catname: 'Science',
                  catID: 9,
                })
              }>
              <Image source={science} style={styles.imagecat} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('10.75%'),
    backgroundColor: CONSTANT.whiteColor,
  },
  imagecat: {
    width: wp('31.70%'),
    resizeMode: 'contain',
    borderRadius: wp('0.65%'),
  },
  catimgcontainer: {
    paddingHorizontal: wp('0.5%'),
    paddingVertical: hp('0.25%'),
  },
});

export default CategoriesHeader;
