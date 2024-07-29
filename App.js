import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Platform, Text } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';



export default function App() {

  const getPlatform = () => Platform.OS === 'ios' ? "ios" : "android";

  const getAppConfig = () => {
    return `?appPage=true&platform=${getPlatform()}`;
  }

  const webViewUri =`https://www.gajrajbus.com/${getAppConfig()}`;
  console.log(webViewUri);

  useEffect(() => {
    SplashScreen.hide();

    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          const parameters = remoteConfig().getAll();
          console.log('Configs were retrieved from the backend and activated.', parameters.Account_deletaion_url._value);
        } else {
          console.log('No configs were fetched from the backend, and the local configs were already activated');
        }
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {webViewUri ? (
        <WebView source={{ uri: webViewUri }} style={{ flex: 1 }} />
      ) : (
       null
      )}
    </SafeAreaView>
  );
}