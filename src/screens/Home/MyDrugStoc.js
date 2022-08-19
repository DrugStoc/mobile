//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import {
	Appbar,
	Divider,
	List,
	Surface,
	Button,
	Paragraph,
	Colors,
	IconButton,
	Caption,
	Title,
	Subheading,
	Avatar,
	Searchbar
} from 'react-native-paper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';

import MyDrugStocList from '../../components/MyDrugStocList';
import { get_user_order } from '../../services/products';

const width = Dimensions.get('screen').width;

// create a component
const MyDrugStoc = ({ order, navigation, order_id }) => {
	const [ type, setType ] = useState('all');
	const currencyFormat = (num) => {
		return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const switch_result = (payload) => {
		setType(payload);
	};

	const renderItem = () => {
		switch (type) {
			case 'all':
				return (
					<View style={{paddingHorizontal: 20}}>
					{order.draft_order.length > 0 ? (
						<TouchableOpacity
							onPress={() => navigation.navigate('mydrugstocdetail', { order: order.draft_order })}
						>
							<View
								style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}
							>
								<View style={{ width: '10%', justifyContent: 'center' }}>
									<Avatar.Icon
										style={{ backgroundColor: Colors.yellow200 }}
										size={40}
										color={Colors.yellow800}
										icon="autorenew"
									/>
								</View>
								<View style={{ width: '40%' }}>
									<Title style={{ fontSize: 16, fontWeight: 'bold' }}>Draft</Title>
									<Paragraph style={{ color: Colors.yellow800 }}>View Draft</Paragraph>
									<Caption>Edited</Caption>
								</View>
								<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
									<Subheading style={{ fontWeight: '500' }}></Subheading>
									<Button labelStyle={{fontSize: 8}} mode="contained" style={{ textAlign: 'right' }}>
										Continue
									</Button>
								</View>
							</View>
							<Divider />
						</TouchableOpacity>
					) : null}
					{order.data.map((data, i) => <MyDrugStocList key={i} data={data} navigation={navigation} />)}
				</View>
				)
			case 'draft':
				return (
					<View style={{paddingHorizontal: 20}}>
						{order.draft_order.length > 0 ? (
						<TouchableOpacity
							onPress={() => navigation.navigate('mydrugstocdetail', { order: order.draft_order })}
						>
							<View
								style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}
							>
								<View style={{ width: '10%', justifyContent: 'center' }}>
									<Avatar.Icon
										style={{ backgroundColor: Colors.yellow200 }}
										size={60}
										color={Colors.yellow800}
										icon="autorenew"
									/>
								</View>
								<View style={{ width: '40%' }}>
									<Title style={{ fontSize: 16, fontWeight: 'bold' }}>Draft</Title>
									<Paragraph style={{ color: Colors.yellow800 }}>View Draft</Paragraph>
									<Caption>Edited</Caption>
								</View>
								<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
									<Subheading style={{ fontWeight: '500' }}>{currencyFormat(0)}</Subheading>
									<Button mode="contained" style={{ textAlign: 'right' }}>
										Continue
									</Button>
								</View>
							</View>
							<Divider />
						</TouchableOpacity>
					) : null}
					</View>
				)
			case 'completed':
				return (
					<View style={{paddingHorizontal: 20}}>
						{order.data.map((data, i) => <MyDrugStocList key={i} data={data} navigation={navigation} />)}
					</View>
				)
			default:
				return;
		}
	}

	useEffect(() => {
		order_id()
	},[])
	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
			<ScrollView>
			{/* <Appbar.Header style={{ elevation: 0, backgroundColor: '#fff' }}> */}
			{/* <Searchbar
						style={{ elevation: 0, borderColor: Colors.grey300, borderWidth: 1, borderRadius: 40 }}
						numberOfLines={1}
						inputStyle={{ fontSize: 14 }}
						// iconColor="#fff"
						placeholder="Search for products here"
                        /> */}
				{/* <View
					style={{
						borderColor: Colors.grey400,
						borderWidth: 0.5,
						borderRadius: 30,
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '96%',
						// paddingHorizontal: 20,
						marginHorizontal: 10
					}}
				>
					<TextInput
						style={{ padding: 12, fontSize: 16 }}
						numberOfLines={1}
						placeholder="Search Products here"
					/>
					<IconButton color={Colors.grey400} icon="magnify" />
				</View> */}
			{/* </Appbar.Header> */}
			
			<List.Section>
				<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>RECENT ORDERS</List.Subheader>
				<View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10 }}>
					<Button
						style={{ marginRight: 20 }}
						mode={type == 'all' ? 'contained' : 'outlined'}
						onPress={() => switch_result('all')}
					>
						<Caption style={{ color: type == 'all' ? '#fff' : Colors.grey500 }}>All</Caption>
					</Button>
					<Button
						style={{ marginRight: 20 }}
						mode={type == 'completed'? 'contained' : 'outlined'}
						onPress={() => switch_result('completed')}
					>
						<Caption style={{ color: type == 'completed' ? '#fff' : Colors.grey500 }}>Completed</Caption>
					</Button>
					<Button
						style={{ marginRight: 20 }}
						mode={type == 'draft' ? 'contained' : 'outlined'}
						onPress={() => switch_result('draft')}
					>
						<Caption style={{ color: type == 'draft' ? '#fff' : Colors.grey500 }}>Draft</Caption>
					</Button>
				</View>
				{renderItem()}
			</List.Section>
			</ScrollView>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = (state) => {
	return {
		order: state.order
	};
};

const mapDispatchToProps = dispatch => {
    return {
        order_id: () => dispatch(get_user_order())
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MyDrugStoc);
