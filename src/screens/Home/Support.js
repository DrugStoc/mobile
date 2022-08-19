//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Caption, Surface, Colors } from 'react-native-paper';

// create a component
const Support = ({ navigation }) => {
	return (
		<Surface style={{ flex: 1 }}>
			<Appbar.Header style={{ backgroundColor: 'transparent' }}>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Contact us" />
			</Appbar.Header>
			<View style={{...styles.container, marginHorizontal: 40,}}>
				<Caption style={{textAlign: 'center', fontSize: 15, color: Colors.blue900}}>
					{'Our savvy customer service or/and sales representatives are here to help you.'}
				</Caption>
				<Caption style={{textAlign: 'center', fontSize: 12, marginTop: 20}}>
					{'CALL – 017005571 \nor \n08036879999 (WhatsApp Only)'}
				</Caption>
			</View>
		</Surface>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

//make this component available to the app
export default Support;
