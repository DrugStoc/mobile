//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Touchable, Alert } from 'react-native';
import { Button, Caption, Colors, Divider, IconButton, Title } from 'react-native-paper';
import connect from 'react-redux/lib/connect/connect';
import { add_item_to_cart } from '../services/products';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import { Badge } from 'react-native-paper';

// create a component
const ProductList = (props) => {
	const [ quantity, setQty ] = useState(1);

	const already_in_cart = () => {
		let item = props.cartItem.data.filter((e) => e.ids == props.data.id);
		if (item.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	const add_qty = () => {
		let num = +quantity + 1;
		console.log(props.data.quantity)
		if(props.data.quantity >= num) {
			setQty(num);
		}
		if(props.data.quantity <= num) {
			Alert.alert('Alert!', `Sorry, you cannot add more than ${props.data.quantity} ${props.data.quantity>1?"units":"unit"} of this selected product to your cart`)
		}
	};

	const minus_qty = () => {
		if (quantity > 1) {
			let num = +quantity - 1;
			setQty(num);
		}
	};

	const add_to_cart = () => {
		let payload = {
			name: props.data.name,
			image: props.data.image,
			ids: props.data.id,
			quantity: quantity,
			price: props.data.price
		};
		props.add_cart(payload);
	};

	const currencyFormat = (num) => {
		return '₦' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};
	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderWidth: 0,
					paddingHorizontal: 15,
					paddingVertical: 20
				}}
			>
				<TouchableOpacity
					style={{ width: '25%' }}
					onPress={() => props.navigation.navigate('detail', { data: props.data })}
				>
					<SharedElement
						id={`item.${props.data.id}.photo`}
						style={{ height: 100, width: '100%', resizeMode: 'contain' }}
					>
						<FastImage
							source={{ uri: props.data.image }}
							style={{ height: 100, width: '100%', resizeMode: 'contain' }}
							resizeMode={FastImage.resizeMode.contain}
						/>
					</SharedElement>
				</TouchableOpacity>
				<View style={{ width: '75%' }}>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
							<Title numberOfLines={1} style={{ width: '50%', fontSize: 15 }}>{props.data.name}</Title>
							<Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
								{props.verified ? currencyFormat(parseFloat(props.data.price)) : `₦ XXX.XX`}
							</Text>
						</View>
						<Text style={{ marginTop: 0, color: Colors.grey500, fontSize: 12 }}>
							{props.data.composition}
						</Text>
					</View>
					<View>
						{props.data.quantity > 0 ? (
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									marginTop: 5
								}}
							>
								{!already_in_cart() ? (
									<View style={{ flexDirection: 'row' }}>
										<IconButton
											color={Colors.grey800}
											onPress={minus_qty}
											size={15}
											style={{ borderWidth: 1, borderRadius: 15, borderColor: Colors.grey800 }}
											icon="minus"
										/>
										<Title style={{paddingHorizontal: 5}}>{JSON.stringify(quantity)}</Title>
										<IconButton
											color={Colors.grey800}
											onPress={add_qty}
											size={15}
											style={{ borderWidth: 1, borderRadius: 15, borderColor: Colors.grey800  }}
											icon="plus"
										/>
									</View>
								) : null}
								<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
									{/* <IconButton
									color={Colors.blue800}
									onPress={add_to_cart}
									disabled={already_in_cart()}
									icon="cart-arrow-right"
								/> */}
									<Button
										disabled={!props.verified || already_in_cart()}
										mode="contained"
										// icon="cart"
										labelStyle={{fontSize: 9, color: "#fff"}}
										style={{ borderColor: '#2C4DA7', }}
										onPress={add_to_cart}
									>
										{!props.verified ? (
											'DISABLED'
										) : already_in_cart() ? (
											'ADDED TO CART'
										) : (
											'ADD TO CART'
										)}
									</Button>
								</View>
							</View>
						) : (
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									marginTop: 5
								}}
							>
								<Caption  style={{color: Colors.red200}}>Out of stock</Caption>
								{!props.noalter ? <Button
										disabled={!props.verified || already_in_cart()}
										mode='text'
										// icon="cart"
										labelStyle={{fontSize: 11 }}
										uppercase={false}
										style={{ borderColor: '#2C4DA7', }}
										onPress={() => props.navigation.navigate('alternative', { data: props.data })}
									>
										{!props.verified ? (
											'DISABLED'
										) :(
											'View alternative'
										)}
									</Button> : null}
							</View>
						)}
					</View>
				</View>
			</View>
			<Divider />
		</View>
	);
};

const mapStateToProps = (state) => {
	return {
		cartItem: state.cart
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		add_cart: (payload) => dispatch(add_item_to_cart(payload))
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
