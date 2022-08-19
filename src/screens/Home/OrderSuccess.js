//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Surface } from 'react-native-paper';

// create a component
const OrderSuccess = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Avatar.Icon
				style={{ borderWidth: 2, marginBottom: 20, borderColor: '#fff' }}
				size={100}
				color="#fff"
				icon="check"
			/>
			<Text style={{ fontSize: 24, color: '#fff', textAlign: 'center' }}>Your Order has been Accepted</Text>
			<Text style={{ color: '#fff', textAlign: 'center', marginVertical: 30 }}>
			You can track the status of your order  at anytime in the "Orders" section
			</Text>
			<Button
				style={{ backgroundColor: '#fff', padding: 10, borderRadius: 30, width: '100%' }}
				onPress={() => navigation.navigate('Orders')}
			>
				Check Order status
			</Button>
			<Button mode="contained" style={{ marginTop: 20, elevation: 0 }} onPress={() => navigation.navigate('Home')}>
				Continue shopping
			</Button>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 30,
		alignItems: 'center',
		backgroundColor: '#2C4DA7'
	}
});

//make this component available to the app
export default OrderSuccess;
