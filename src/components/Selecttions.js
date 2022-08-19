//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Selection = ({ title, subtitle }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
				<Text>{subtitle}</Text>
			</View>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
        paddingHorizontal: 20,
		borderRadius: 10,
		backgroundColor: '#EBF0FF'
	},
	title: {
        color: "#4B70D6",
        fontWeight: '600',
        marginBottom: 5
    }
});

//make this component available to the app
export default Selection;
