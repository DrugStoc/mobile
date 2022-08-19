/**
 * @format
 */

require('react-native').unstable_enableLogBox()

import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox, YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/configureStore';
LogBox.ignoreAllLogs(true)
LogBox.ignoreLogs(['Require cycle:'])

const store = configureStore();

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
