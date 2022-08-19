//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Button, Caption, Colors, Divider, List, Paragraph, Subheading, Title } from 'react-native-paper';

// create a component
const MyDrugStocList = (props) => {
	const currencyFormat = (num) => {
		return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const get_status = (data) => {
		if (data == 'done') {
			return 'Completed';
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
		<TouchableOpacity onPress={() => props.navigation.navigate('mydrugstocdetail', { data: props.data })}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
				<View style={{ width: '20%', justifyContent: 'center' }}>
					<Avatar.Icon
						style={{ backgroundColor: get_status_color_background(props.data.status) }}
						size={40}
						color={get_status_color(props.data.status)}
						icon={get_status_icon(props.data.status)}
					/>
				</View>
				<View style={{ width: '50%' }}>
					<Title numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 0 }}>{props.data.name}</Title>
					<Paragraph numberOfLines={1} style={{ marginBottom: 0, color: get_status_color(props.data.status) }}>
						{props.data.status == 'cancel' ? (
							'Cancelled'
						) : (
							`view item${props.data.total_product > 1 ? 's' : ''} (${props.data.total_product})`
						)}
					</Paragraph>
					<Caption numberOfLines={1} style={{marginBottom: 0}} numberOfLines={1}>{props.data.author}</Caption>
				</View>
				<View
					style={{
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '30%',
						alignItems: 'flex-end'
					}}
				>
					<Subheading numberOfLines={1} style={{ fontWeight: '500' }}>{currencyFormat(props.data.total_amount)}</Subheading>
					<Button mode="contained" labelStyle={{fontSize: 10}} style={{ textAlign: 'right', backgroundColor: Colors.green400 }}>
						Reorder
					</Button>
				</View>
			</View>
			<Divider />
		</TouchableOpacity>
	);
};

//make this component available to the app
export default MyDrugStocList;
