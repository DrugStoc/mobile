//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

// create a component
const Navbar = ({navigation, previous, transp}) => {
    
    return (
        <Appbar.Header style={{elevation: 0, backgroundColor: transp }}>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content />
        </Appbar.Header>
    );
};

//make this component available to the app
export default Navbar;
