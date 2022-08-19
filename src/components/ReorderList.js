//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Button, Colors, Divider, IconButton, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { delete_item_from_previous_orders, edit_previous_orders, make_draft_from_previous_orders } from '../services/products';

// create a component
const ReorderList = (props) => {
    const [count, setCount ] = useState(props.data.quantity)
	const currencyFormat = (num) => {
		return '₦' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

    const add_qty = () => {
		let num =+ count + 1
        setCount(num)
		let payload = {
			id:  props.id,
			quantity: count + 1
		}
		props.edit_data(payload)
		save_to_draft()
    }

    const minus_qty = () => {
		if (count > 1) {
			let num =+ count - 1
            setCount(num)
			let payload = {
				id:  props.id,
				quantity: count - 1
			}
			props.edit_data(payload)
        }
		save_to_draft()
    }

	const save_to_draft = () => {
		// console.log(props.order)
		props.update_draft(props.order)
	}

	const delete_item = () => {

		props.delete_data(props.data)
		save_to_draft()
	}


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
					<Image
						source={{ uri: props.data.image }}
						style={{ height: 100, width: '90%', resizeMode: 'contain' }}
					/>
				</TouchableOpacity>
				<View style={{ width: '75%' }}>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
							<Text style={{ width: '50%', fontSize: 15 }}>{props.data.name}</Text>
                            <IconButton
									color={Colors.red400}
									onPress={delete_item}
									// onPress={minus_qty}
									// style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
									icon="window-close"
								/>
						</View>
						<Text style={{ marginTop: 5, color: Colors.grey500, fontSize: 12 }}>
							{props.data.created_date}
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
							<View style={{ flexDirection: 'row' }}>
								<IconButton
									color={Colors.grey800}
									onPress={minus_qty}
									size={15}
									style={{ borderWidth: 1, borderRadius: 20, borderColor: Colors.grey800 }}
									icon="minus"
								/>
								{/* <TextInput
									disable
									style={{ paddingHorizontal: 10, paddingVertical: 2 }}
									placeholder={JSON.stringify(count)}
								/> */}
								<Title style={{paddingHorizontal: 5}}>{JSON.stringify(count)}</Title>
								<IconButton
									color={Colors.grey800}
									onPress={add_qty}
									size={15}
									style={{ borderWidth: 1, borderRadius: 20, borderColor: Colors.grey800 }}
									icon="plus"
								/>
							</View>
							<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
								<Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>
									{currencyFormat(parseFloat(props.data.price * count))}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
			<Divider />
		</View>
	);
};

const mapstateToProps = state => {
	return {
		order: state.order.order_details,
		draft: state.order.draft_order,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		edit_data: payload => dispatch(edit_previous_orders(payload)),
		delete_data: payload => dispatch(delete_item_from_previous_orders(payload)),
		update_draft: payload => dispatch(make_draft_from_previous_orders(payload))
	}
}

//make this component available to the app
export default connect(mapstateToProps, mapDispatchToProps)(ReorderList);
