//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';

const width = Dimensions.get('screen').width / 2.2;

// create a component
const PaymentCard = (props) => {
	return (
		<View style={{ ...styles.padding, backgroundColor: props.active ? '#EBFAF6' : Colors.grey200 }}>
			<Text style={styles.title}>{props.title}</Text>
			<Text style={styles.subtile}>{props.type}</Text>
			<Text style={styles.amount}>{props.amount}</Text>
			{props.accountNumber ? (
				<Text style={styles.number}>
					ACCOUNT NUMBER: <Text style={styles.textColor}>{props.accountNumber}</Text>
				</Text>
			) : null}
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	padding: {
		padding: 10,
		width: width,
		backgroundColor: Colors.grey300,
		borderRadius: 8
	},

	title: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 10
	},
	subtile: {
		fontSize: 10,
		fontWeight: '200',
		marginBottom: 10
	},
	amount: {
		fontWeight: '700',
		marginBottom: 7
	},
	number: {
		fontSize: 10
	},
	textColor: {
		color: Colors.green500
	}
});

//make this component available to the app
export default PaymentCard;
