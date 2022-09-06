/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import MainNavigation from './src/navigations/Main';

import VersionCheck from 'react-native-version-check';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2C4DA7',
    // accent: 'yellow',
  },
};

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });

    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded.isNeeded) {
      //Alert the user and direct to the app url
      Alert.alert(
        'Please Update',
        'you will need to update your app to the latest version to continue usng.',
        [
          {
            text: 'Update',
            onPress: () => {
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <PaperProvider theme={theme}>
      <MainNavigation />
    </PaperProvider>
  );
};

export default App;
