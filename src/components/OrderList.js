//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Badge, Caption, Colors, Divider, List, Paragraph, Subheading, Title } from 'react-native-paper';

// create a component
const OrderList = (props) => {
	const currencyFormat = (num) => {
		return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const get_status = (data) => {
		if (data == 'done') {
			return 'Completed';
		} else if (data == 'cancel') {
			return 'Order Cancelled';
		} else {
			return 'Order received';
		}
	};

	const get_status_color = (data) => {
		if (data == 'done') {
			return Colors.green500;
		} else if (data == 'cancel') {
			return Colors.red600;
		} else {
			return Colors.yellow900;
		}
	};

	const get_status_color_background = (data) => {
		if (data == 'done') {
			return Colors.green100;
		} else if (data == 'cancel') {
			return Colors.red100;
		} else {
			return Colors.yellow100;
		}
	};

	const get_status_icon = (data) => {
		if (data == 'done') {
			return 'check';
		} else if (data == 'cancel') {
			return 'window-close';
		} else {
			return 'autorenew';
		}
	};

	return (
		<TouchableOpacity onPress={() => props.navigation.navigate('orderdetails', { data: props.data })}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
				<View style={{ width: '10%', justifyContent: 'center' }}>
					<Avatar.Icon
						style={{ backgroundColor: get_status_color_background(props.data.status)}}
						size={40}
						color={get_status_color(props.data.status)}
						icon={get_status_icon(props.data.status)}
					/>
				</View>
				<View style={{ width: '50%' }}>
					<Title style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 0 }}>
						{props.data.name}
					</Title>
					<Caption
						style={{
							// marginBottom: 0,
							// backgroundColor: ,
							// alignSelf: 'flex-start',
                            color: get_status_color(props.data.status),
							// paddingHorizontal: 20
						}}
					>
						{get_status(props.data.status)}
					</Caption>
					<Caption numberOfLines={1}>{props.data.author}</Caption>
				</View>
				<View
					style={{
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '30%',
						alignItems: 'flex-end'
					}}
				>
					<Subheading numberOfLines={1} style={{ fontWeight: '500', fontSize: 12 }}>
						{currencyFormat(props.data.total_amount)}
					</Subheading>
					<Caption style={{ textAlign: 'right' }}>See summary</Caption>
				</View>
			</View>
			<Divider />
		</TouchableOpacity>
	);
};

//make this component available to the app
export default OrderList;
