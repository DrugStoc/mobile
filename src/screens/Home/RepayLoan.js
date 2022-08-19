//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

// create a component
const RepayLoan = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Sorry You do Not have an Existing loan run</Text>
            <Button onPress={() => navigation.navigate('applyLoan')}>Apply Now</Button>
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
export default RepayLoan;
