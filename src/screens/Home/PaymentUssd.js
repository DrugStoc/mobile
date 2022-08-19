//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
	Appbar,
	Colors,
	IconButton,
	List,
	Searchbar,
	Surface,
	Divider,
	Paragraph,
	Button,
	Caption,
	TextInput
} from 'react-native-paper';
import { connect } from 'react-redux';
import Onboarding3 from '../../assets/imgs/onboarding3.png';

// create a component
const PaymentUssd = ({navigation, user, createOrder, items, loading}) => {
    const create = () => {
		createOrder(items.data).then(() => {
			navigation.navigate('success');
		});
	};
	return (
		<Surface style={{ flex: 1 }}>
            <View style={{alignItems: 'center' }}>
					<Image source={Onboarding3} style={{ width: '100%', height: 300, resizeMode: 'contain' }} />
				</View>
			<View style={styles.container}>
				<Text style={{ color: Colors.green600, marginBottom: 20 }}>Pay Successful?</Text>
				<Button onPress={create} mode="contained" style={{ backgroundColor: Colors.green600, marginBottom: 20 }}>
					Submit Order
				</Button>
				<Text style={{ color: Colors.red900, marginBottom: 20 }}>Pay failed?</Text>
				<Button onPress={() => navigation.pop()} mode="contained" style={{ backgroundColor: Colors.red900 }}>
					Retry Payment
				</Button>
			</View>
		</Surface>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center'
	}
});

const MapStateToProps = (state) => {
	return {
		items: state.cart,
		user: state.user.user,
		loading: state.loading.uiloading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createOrder: (payload) => dispatch(create_order(payload))
	};
};

//make this component available to the app
export default connect(MapStateToProps, mapDispatchToProps)(PaymentUssd);
