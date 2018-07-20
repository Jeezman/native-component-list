import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../constants/Colors';

const {
  NativeAdsManager,
  AdSettings,
  InterstitialAdManager,
  BannerView,
  withNativeAd,
  MediaView,
  AdIconView,
  TriggerableFragment,
} = Expo.FacebookAds;

AdSettings.addTestDevice(AdSettings.currentDeviceHash);

const adsManager = new NativeAdsManager('629712900716487_629713604049750');

const FullNativeAd = withNativeAd(({ nativeAd }) => (
  <View style={styles.fullad}>
    <View style={styles.nativeRow}>
      <AdIconView style={styles.iconView} />
      <View style={styles.nativeColumn}>
        <TriggerableFragment>
          {nativeAd.advertiserName && <Text style={styles.title}>{nativeAd.advertiserName}</Text>}
          {nativeAd.sponsoredTranslation && (
            <Text style={styles.description}>{nativeAd.sponsoredTranslation}</Text>
          )}
          {nativeAd.headline && <Text style={styles.title}>{nativeAd.headline}</Text>}
        </TriggerableFragment>
      </View>
    </View>

    <View style={styles.nativeRow}>
      <MediaView style={styles.mediaView} />
    </View>

    <View style={styles.nativeRow}>
      <View style={styles.nativeColumn}>
        {nativeAd.socialContext && <Text style={styles.description}>{nativeAd.socialContext}</Text>}
        {nativeAd.bodyText && <Text style={styles.description}>{nativeAd.bodyText}</Text>}
      </View>

      <View style={styles.adButton}>
        <TriggerableFragment>
          <Text>{nativeAd.callToActionText}</Text>
        </TriggerableFragment>
      </View>
    </View>
  </View>
));

export default class App extends React.Component {
  static navigationOptions = {
    title: 'FacebookAds',
  };

  showFullScreenAd = () => {
    InterstitialAdManager.showAd('629712900716487_662948944059549')
      .then(didClick => {
        console.log(didClick);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBannerAdPress = () => console.log('Ad clicked!');
  onBannerAdError = event => console.log('Ad error :(', event.nativeEvent);

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.header}>Native Ad</Text>
        <FullNativeAd adsManager={adsManager} />
        <Text style={styles.header}>Banner Ad</Text>
        <BannerView
          type="large"
          placementId="629712900716487_662949307392846"
          onPress={this.onBannerAdPress}
          onError={this.onBannerAdError}
        />
        <Text style={styles.header}>Interstitial ad</Text>
        <TouchableOpacity style={styles.button} onPress={this.showFullScreenAd}>
          <Text style={styles.buttonText}>Show interstitial ad</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  p: {
    marginBottom: 10,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  fullad: {
    flexDirection: 'column',
  },
  nativeRow: {
    flexDirection: 'row',
  },
  nativeColumn: {
    flexDirection: 'column',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginTop: 5,
  },
  adButton: {
    borderColor: '#CDCDCD',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: Colors.tintColor,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
  iconView: {
    width: 50,
    height: 50,
  },
  mediaView: {
    width: 400,
    height: 100,
  },
});
