//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {
	Appbar,
	Avatar,
	Button,
	Caption,
	Colors,
	List,
	Paragraph,
	Subheading,
	Surface,
	Title
} from 'react-native-paper';
import FastImage from 'react-native-fast-image'

// create a component
const OrderDetail = ({ navigation, route }) => {
	let { data } = route.params;

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
			return Colors.green700;
		} else {
			return Colors.yellow900;
		}
	};

	const get_status_color_background = (data) => {
		if (data == 'done') {
			return Colors.green100;
		} else {
			return Colors.yellow100;
		}
	};

	const get_status_icon = (data) => {
		if (data == 'done') {
			return 'check';
		} else {
			return 'autorenew';
		}
	};
	console.log(data);
	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<Appbar.Header style={{ backgroundColor: 'transparent' }}>
					<Appbar.BackAction onPress={navigation.goBack} />
					<Appbar.Content title="Track my orders" />
				</Appbar.Header>
					<List.Section>
						<List.Item
							title={`${data.name}`}
							right={() => (
								<Text style={{ fontSize: 18 }}>{currencyFormat(parseFloat(data.total_amount))}</Text>
							)}
						/>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingVertical: 15,
								paddingHorizontal: 20
							}}
						>
							<View style={{ width: '10%', justifyContent: 'center' }}>
								<Avatar.Icon
									style={{ backgroundColor: Colors.green100 }}
									size={40}
									color={Colors.green700}
									icon='check'
								/>
							</View>
							<View style={{width: '60%'}}>
								<Title style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Title>
								<Paragraph style={{ color: Colors.green700 }}>Order received</Paragraph>
								<Caption>{data.created_date}</Caption>
							</View>
							<View style={{width: "20%",  flexDirection: 'column', justifyContent: 'space-between' }}>
								<Subheading style={{ fontWeight: '500', fontSize: 12, textAlign: 'right' }}>Done</Subheading>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingVertical: 15,
								paddingHorizontal: 20
							}}
						>
							<View style={{ width: '10%', justifyContent: 'center' }}>
								<Avatar.Icon
									style={{ backgroundColor: get_status_color_background(data.status) }}
									size={40}
									color={get_status_color(data.status)}
									icon={data.status !== 'done' ? 'autorenew' : 'check'}
								/>
							</View>
							<View style={{width: '60%'}}>
								<Title style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Title>
								<Paragraph style={{ color: '#2C4DA7' }}>Order processed</Paragraph>
								{/* <Caption>{data.created_date}</Caption> */}
							</View>
							<View style={{ width: "20%", flexDirection: 'column', justifyContent: 'space-between' }}>
								<Subheading numberOfLines={1} style={{ fontWeight: '500', fontSize: 12, textAlign: 'right' }}>{data.status == 'sale' || data.status == 'done' ?"Done": "Waiting..."}</Subheading>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingVertical: 15,
								paddingHorizontal: 20
							}}
						>
							<View style={{ width: '10%', justifyContent: 'center' }}>
								<Avatar.Icon
									style={{ backgroundColor: get_status_color_background(data.status) }}
									size={40}
									color={get_status_color(data.status)}
									icon={data.status !== 'done' ? 'autorenew' : 'check'}
								/>
							</View>
							<View style={{width: '60%'}}>
								<Title style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Title>
								<Paragraph style={{ color: '#2C4DA7' }}>Order shipped</Paragraph>
								{/* <Caption>{data.created_date}</Caption> */}
							</View>
							<View style={{width: "20%",  flexDirection: 'column', justifyContent: 'space-between' }}>
								<Subheading numberOfLines={1} style={{ fontWeight: '500', fontSize: 12, textAlign: 'right' }}>{data.status == 'sale' || data.status == 'done'  ?"Done": "Waiting..."}</Subheading>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingVertical: 15,
								paddingHorizontal: 20
							}}
						>
							<View style={{ width: '10%', justifyContent: 'center' }}>
								<Avatar.Icon
									style={{ backgroundColor: get_status_color_background(data.status) }}
									size={40}
									color={get_status_color(data.status)}
									icon={data.status !== 'done' ? 'autorenew' : 'check'}
								/>
							</View>
							<View style={{width: '60%'}}>
								<Title style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Title>
								<Paragraph style={{ color: '#2C4DA7' }}>Order delivered</Paragraph>
								{/* <Caption>{data.created_date}</Caption> */}
							</View>
							<View style={{ width: "20%",  flexDirection: 'column', justifyContent: 'space-between' }}>
								<Subheading numberOfLines={1} style={{ fontWeight: '500', fontSize: 12, textAlign: 'right' }}>{data.status == 'done'  ?"Done": "Waiting..."}</Subheading>
							</View>
						</View>
					</List.Section>
					<Button mode="contained" style={{marginTop: 200, marginHorizontal: 60, paddingVertical: 10, borderRadius: 40}} onPress={navigation.goBack}>
						Continue Shopping
					</Button>
			</SafeAreaView>
		</Surface>
	);
};

//make this component available to the app
export default OrderDetail;
