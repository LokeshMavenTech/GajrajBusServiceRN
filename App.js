import {View, Text, SafeAreaView, Button} from 'react-native';
import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';

export default function App() {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          const parameters = remoteConfig().getAll();
          console.log(
            'Configs were retrieved from the backend and activated.',
            parameters,
          );
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>App</Text>
        <Button title="Test Crash" onPress={() => crashlytics().crash()} />
      </View>
    </SafeAreaView>
  );
}
