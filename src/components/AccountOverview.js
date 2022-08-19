//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AccountOverview = () => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.title}>Via Bank Transfer</Text>
				<Text style={styles.badge}>Recommened</Text>
			</View>
			<Text style={{color: '#5B5B5B', fontSize: 12, marginBottom: 15}}>
				To add money to your Sterling Bank account, make a bank transfer to the account below. Funds reflect
				instantly.
			</Text>
            <View style={styles.account}>
                <Text style={styles.topic}>BANK NAME</Text>
                <Text style={styles.subtopic}>Parkway Readycash</Text>
                <Text style={styles.topic}>ACCOUNT NUMBER</Text>
                <Text style={styles.subtopic}>0600001329</Text>
                <Text style={styles.topic}>ACCOUNT NAME</Text>
                <Text style={styles.subtopic}>Payed  TEST PHARMACY</Text>
            </View>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
        padding: 20,
        borderRadius: 10,
		backgroundColor: '#EBF0FF',
	},
    title :{
        fontSize: 15,
        fontWeight: '600',
        color: "#4B70D6",
    },
    badge: {
        color: '#25AE88',
        paddingVertical:  5,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(37, 174, 136, 0.2)',
    },
    account: {
        backgroundColor: '#fff',
        padding: 20
    },
    topic: {
        color: '#B6B5B5',
        fontSize: 12,
        marginBottom: 3
    },
    subtopic: {
        color: '#757575',
        fontSize: 12,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    }
});

//make this component available to the app
export default AccountOverview;
