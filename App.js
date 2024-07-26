import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';

export default function App() {
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
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: 'https://www.gajrajbus.com/' }} style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}
