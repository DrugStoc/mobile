//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Button, Caption, Colors, List, Surface, Title } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { connect } from 'react-redux';
import OrderList from '../../components/OrderList';
import { get_user_order } from '../../services/products';
import { Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs';

// create a component
const MyOrders = ({ order, my_order, navigation }) => {
	const [ type, setType ] = useState('all');
	const [data, setData] = useState([])

	useEffect(() => {
		order();
	}, []);

	const switch_result = (payload) => {
		setType(payload);
		switch(payload) {
			case 'processing':
				let dat2 = my_order.data.filter((e) => e.status != 'cancel' && e.status != 'done' );
				setData(dat2)
				break;
			case 'cancel':
				let date = my_order.data.filter((e) => e.status == 'cancel');
				setData(date)
				break;
			case 'completed':
				let dat = my_order.data.filter((e) => e.status == 'done');
				setData(dat)
				break;
			default:
				setData(my_order.data)
		}
		console.log(data);
	};

	const renderItem = (data) => <OrderList key={data.index} data={data.item} navigation={navigation} />;

	const renderHeader = () => (
		<View style={{ width: '100%', backgroundColor: '#fff' }}>
			{/* <Title style={{ marginBottom: 10 }}>Order Summary</Title> */}
			<List.Section>
				<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>ORDER SUMMARY</List.Subheader>
			</List.Section>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 20, marginTop: 5, marginBottom: 10, width: '110%' }}
			>
				<Button
					style={{ marginRight: 20 }}
					
					mode={type == 'all' ? 'contained' : 'outlined'}
					onPress={() => switch_result('all')}
				>
					<Caption style={{ color: type == 'all' ? '#fff' : Colors.grey500, fontSize: 10 }}>All</Caption>
				</Button>
				<Button
					style={{ marginRight: 20, padding: 0 }}
					mode={type == 'processing' ? 'contained' : 'outlined'}
					onPress={() => switch_result('processing')}
				>
					<Caption style={{ color: type == 'processing' ? '#fff' : Colors.grey500, fontSize: 10 }}>Processing</Caption>
				</Button>
				<Button
					style={{ marginRight: 20 }}
					mode={type == 'completed' ? 'contained' : 'outlined'}
					onPress={() => switch_result('completed')}
				>
					<Caption style={{ color: type == 'completed' ? '#fff' : Colors.grey500, fontSize: 10 }}>Completed</Caption>
				</Button>
				<Button
					style={{ marginRight: 20 }}
					mode={type == 'cancel' ? 'contained' : 'outlined'}
					onPress={() => switch_result('cancel')}
				>
					<Caption style={{ color: type == 'cancel' ? '#fff' : Colors.grey500, fontSize: 10 }}>Cancelled</Caption>
				</Button>
			</ScrollView>
		</View>
	);

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<FlatList
					showsVerticalScrollIndicator={false}
					onRefresh={() => order()}S
					data={type === 'all'?my_order.data:data}
					ListHeaderComponent={renderHeader}
					ListHeaderComponentStyle={{ width: '100%' }}
					keyExtractor={(item) => item.id}
					stickyHeaderIndices={[ 0 ]}
					renderItem={(data) => renderItem(data)}
					contentContainerStyle={{ paddingHorizontal: 20 }}
				/>
				<SkeletonContent
				animationType="pulse"
				containerStyle={{
					// height: 1000,
					paddingHorizontal: 20,
					width: '100%',
					marginTop: 20
				}}
				isLoading={my_order.loading}
				layout={[
					{ key: 'someId', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId2',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute'
					},
					{
						key: 'someId3',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 20
					},
					{
						key: 'someId4',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						position: 'absolute',
						top: 40
					},
					{
						key: 'someId5',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						position: 'absolute',
						top: 40
					},
					{ key: 'someId6', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId7',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 90,
						position: 'absolute'
					},
					{
						key: 'someId8',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						position: 'absolute',
						top: 110
					},
					{
						key: 'someId9',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						position: 'absolute',
						top: 130
					},
					{
						key: 'someId10',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						position: 'absolute',
						top: 130
					},
					{ key: 'someId11', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId212',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 180,
						position: 'absolute'
					},
					{
						key: 'someId213',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 200
					},
					{
						key: 'someId314',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						position: 'absolute',
						top: 220
					},
					{
						key: 'someId315',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						position: 'absolute',
						top: 220
					},
					{ key: 'someId16', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId217',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 270,
						position: 'absolute'
					},
					{
						key: 'someId218',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 290
					},
					{
						key: 'someId319',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 310
					},
					{
						key: 'someId320',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						top: 0,
						position: 'absolute',
						top: 310
					},
					{ key: 'someId21', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId222',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 360,
						position: 'absolute'
					},
					{
						key: 'someId223',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 380
					},
					{
						key: 'someId324',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 400
					},
					{
						key: 'someId325',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						top: 0,
						position: 'absolute',
						top: 400
					},
					{ key: 'someId26', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId227',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 450,
						position: 'absolute'
					},
					{
						key: 'someId228',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 470
					},
					{
						key: 'someId329',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 490
					},
					{
						key: 'someId330',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						top: 0,
						position: 'absolute',
						top: 490
					},
					{ key: 'someId31', width: 70, height: 70, marginBottom: 20 },
					{
						key: 'someId232',
						width: '80%',
						height: 15,
						marginBottom: 6,
						left: 100,
						top: 540,
						position: 'absolute'
					},
					{
						key: 'someId233',
						width: '65%',
						height: 10,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 560
					},
					{
						key: 'someId334',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 100,
						top: 0,
						position: 'absolute',
						top: 580
					},
					{
						key: 'someId335',
						width: 30,
						height: 30,
						marginBottom: 6,
						left: 160,
						top: 0,
						position: 'absolute',
						top: 580
					}
				]}
			/>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = (state) => {
	return {
		my_order: state.order
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		order: () => dispatch(get_user_order())
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
