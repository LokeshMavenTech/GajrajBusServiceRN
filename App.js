import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Button, Alert, Linking, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';

export default function App() {
  useEffect(() => {
    // Hide the splash screen when the app is ready
    // SplashScreen.hide();

    // Set up remote config
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          const parameters = remoteConfig().getAll();
          console.log('Configs were retrieved from the backend and activated.', parameters);
          checkAppVersion(parameters);
        } else {
          console.log('No configs were fetched from the backend, and the local configs were already activated');
        }
      });
  }, []);

  const checkAppVersion = async (remoteValues) => {
    try {
      const currentVersion = await VersionCheck.getCurrentVersion();
      const latestVersionString = remoteValues?.latest_version?._value;
      const latestVersion = parseFloat(latestVersionString);
      const updateMessage = remoteValues?.deprecation_message?._value;
      const appStoreUrl = remoteValues?.app_store_url?._value;
      const alertHeader = "Update Alert!";

      if (latestVersion > parseFloat(currentVersion)) {
        Alert.alert(
          alertHeader,
          updateMessage,
          [
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? appStoreUrl
                    : VersionCheck.getPlayStoreUrl({ packageName: 'com.ksrtc.awatar.new' })
                );
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error checking app version:', error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>App</Text>
        <Button title="Test Crash" onPress={() => crashlytics().crash()} />
      </View>
    </SafeAreaView>
  );
}
