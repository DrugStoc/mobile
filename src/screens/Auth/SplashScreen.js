//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Logo from '../../assets/imgs/Logo.png';

// create a component
const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Image source={Logo} style={{ height: '5%', resizeMode: 'contain', alignSelf: 'center'}} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default SplashScreen;
