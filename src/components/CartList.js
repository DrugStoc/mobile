//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Touchable } from 'react-native';
import { Button, Colors, Divider, IconButton, Title } from 'react-native-paper';
import connect from 'react-redux/lib/connect/connect';
import { edit_cart_items, remove_item_from_cart } from '../services/products';

// create a component
const CartList = (props) => {

	const [quantity, setQty] = useState(props.data.quantity)

	const already_in_cart = () => {
		let item = props.cartItem.data.filter(e => e.ids == props.data.id)
		if (item.length > 0) {
			return true
		} else {
			return false
		}
	}

	const add_qty = () => {
        let num =+ quantity + 1
        setQty(num)
		let payload = {
			data: props.data,
			id:  props.id,
			quantity: quantity + 1
		}
		props.edit_cart(payload)
		
    }

    const minus_qty = () => {
        if (quantity > 1) {
            let num =+ quantity - 1
            setQty(num)
			let payload = {
				data: props.data,
				id:  props.id,
				quantity: quantity - 1
			}
			props.edit_cart(payload)
        }
    }

	const remove_from_cart = () => {
		let payload = {
			id: props.data.id,
			name: props.data.name,
			image: props.data.image,
			ids: props.data.ids,
			quantity: quantity,
			price: props.data.price,
		}
        props.remove_cart(payload)
	}

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
					paddingVertical: 20,
					backgroundColor: props.data.inStore < quantity || props.data.inStore == 0 ? Colors.red50 : Colors.white
				}}
			>
				<TouchableOpacity style={{width: '25%'}}>
					<Image
						source={{ uri: props.data.image }}
						style={{ height: 100, width: '90%', resizeMode: 'contain' }}
					/>
				</TouchableOpacity>
				<View style={{ width: '75%' }}>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
							<Text style={{ width: '50%', fontSize: 15 }}>{props.data.name}</Text>
							<Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
								{currencyFormat(parseFloat(props.data.inStore == 0 ? null : props.data.inStore < quantity ? props.data.price * props.data.inStore : props.data.price * quantity ))}
							</Text>
						</View>
						<Text style={{ marginTop: 5, color: Colors.grey500, fontSize: 12 }}>
							{props.data.composition}
						</Text>
					</View>
					<View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '100%',
								marginTop: 5
							}}
						>
							{props.data.inStore !== 0 ? <View style={{ flexDirection: 'row' }}>
								<IconButton
									color={Colors.grey900}
									onPress={minus_qty}
									size={15}
									style={{ borderWidth: 1, borderRadius: 20, borderColor: Colors.grey900 }}
									icon="minus"
								/>
								{/* <TextInput editable={false} style={{ paddingHorizontal: 10, paddingVertical: 2 }} placeholder={JSON.stringify(quantity)} /> */}
								<Title style={{paddingHorizontal: 5, marginTop: 3}}>{props.data.inStore > quantity ? JSON.stringify(quantity) : JSON.stringify(props.data.inStore)}</Title>
								<IconButton
									color={Colors.grey900}
									onPress={add_qty}
									size={15}
									style={{ borderWidth: 1, borderRadius: 20, borderColor: Colors.grey900 }}
									icon="plus"
								/>
							</View> : <Text style={{ fontWeight: '800', color: Colors.red900}}>Out Of Stock</Text> }
							<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
							{/* <IconButton
									color={Colors.red500}
									onPress={remove_from_cart}
									icon="trash-can-outline"
								/> */}
								{/* <Button mode="outlined" labelStyle={{fontSize: 8}}  style={{ borderColor: Colors.red400 }} onPress={remove_from_cart}>
									REMOVE ITEM
								</Button> */}
								<IconButton
									color={Colors.red400}
									onPress={remove_from_cart}
									// onPress={minus_qty}
									// style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
									icon="window-close"
								/>
							</View>
						</View>
					</View>
							{props.data.inStore == 0 ? null : props.data.inStore < quantity ? <Text style={{ color: Colors.red900, fontWeight: '700', fontSize: 9}}>Only {props.data.inStore} is available for express delivery.</Text> : null}
				</View>
			</View>
			<Divider />
		</View>
	);
};

const mapStateToProps = state => {
	return {
		cartItem: state.cart
	}
}

const mapDispatchToProps = dispatch => {
	return {
		add_cart: payload => dispatch(add_item_to_cart(payload)),
        remove_cart: payload => dispatch(remove_item_from_cart(payload)),
        edit_cart: payload => dispatch(edit_cart_items(payload))
	}
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CartList);
