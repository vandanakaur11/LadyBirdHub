import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import admob, {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const Banner = () => {
  // useEffect(() => {
  //   const showInterstitialAd = () => {
  //     // Create a new instance
  //     const interstitialAd = InterstitialAd.createForAdRequest(
  //       'ca-app-pub-9559337409792071/2369354992',
  //     );
  //     // Add event handlers
  //     interstitialAd.onAdEvent((type, error) => {
  //       if (type === AdEventType.LOADED) {
  //         interstitialAd.show();
  //       }
  //     });
  //     // Load a new advert
  //     interstitialAd.load();
  //   };

  //   showInterstitialAd();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <BannerAd
          size={BannerAdSize.ADAPTIVE_BANNER}
          unitId={'ca-app-pub-9559337409792071/6932498102'}></BannerAd>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  banner: {
    width: wp('85%'),
    height: hp('10%'),
    // borderWidth: wp('0.05%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Banner;
