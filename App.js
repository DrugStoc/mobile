/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MainNavigation from './src/navigations/Main';
import RNBootSplash from "react-native-bootsplash";

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
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);

	return (
		<PaperProvider theme={theme} >
			<MainNavigation />
		</PaperProvider>
	);
};

export default App;
