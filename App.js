import React, { useEffect } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';

const App = () => {
  const getPlatform = () => Platform.OS === 'ios' ? "ios" : "android";
  const getAppConfig = () => {
    return `?appPage=true&platform=${getPlatform()}`;
  }
  const webViewUri = `https://www.gajrajbus.com/${getAppConfig()}`;
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


  const SCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
  meta.setAttribute('name', 'viewport');
  document.head.appendChild(meta);
  true;
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: webViewUri }} javaScriptEnabled onMessage={(event) => { }}
        injectedJavaScript={SCRIPT} />
    </SafeAreaView>
  );
}

export default App;
