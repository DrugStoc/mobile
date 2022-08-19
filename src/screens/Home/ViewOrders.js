//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView } from 'react-native';
import { Appbar, Button, Colors, Divider, IconButton, List, Searchbar, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import ReorderList from '../../components/ReorderList';
import { add_item_to_cart, get_user_order_item } from '../../services/products';

const width = Dimensions.get('screen').width;

const height = Dimensions.get('screen').height;

// create a component
const ViewMydrugStoc = ({ navigation, route, order_details, orders_list, add_cart }) => {
    let data = route.params.data
	let order = route.params.order
	const [hasPlacedOrder, setReorder] = useState(false)

	const reorder = () => {
		setReorder(true)
		let data = orders_list.map((order) => ({
			name: order.name,
			image: order.image,
			ids: order.id,
			quantity: order.quantity,
			price: order.price
		}))
		// let data2 = order.map((order) => ({
		// 	name: order.name,
		// 	image: order.image,
		// 	ids: order.id,
		// 	quantity: order.quantity,
		// 	price: order.price
		// }))
		add_cart(data)
		navigation.navigate('cart')
	}

    useEffect(() => {
		if (data) {
			order_details(data.id)
		}
    },[])
	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<Searchbar
							style={{ elevation: 0, backgroundColor: Colors.grey200 }}
							numberOfLines={1}
							onIconPress={navigation.goBack}
							inputStyle={{ fontSize: 14 }}
							icon="arrow-left"
							// iconColor="#fff"
							placeholder="Search for products here"
					/>
                <List.Section>
					<Divider />
					<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>REORDER {data?data.name:'DRAFT'}</List.Subheader>
					<View style={{height: height / 1.52 }}>
					<ScrollView  style={{ marginBottom: 20}}>
                        {data ? orders_list.map((data, i) => <ReorderList key={i} id={i} data={data} />) : order.map((data, i) => <ReorderList key={i} id={i} data={data} isDraft={true} />) }
					</ScrollView>
					</View>
					<View style={{paddingHorizontal: 30}}>
						<Button mode="contained" style={{borderRadius: 50, padding: 10}} onPress={reorder} disabled={hasPlacedOrder || orders_list.length == 0}>{hasPlacedOrder?"AlREADY REORDERED":"REORDER"}</Button>
						{/* <Button style={{borderRadius: 50, padding: 10}} onPress={reorder} disabled={hasPlacedOrder || orders_list.length == 0}>Save to Draft</Button> */}
					</View>
				</List.Section>
			</SafeAreaView>
		</Surface>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});


const mapStateToProps = state => {
    return {
        orders_list: state.order.order_details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        order_details: payload => dispatch(get_user_order_item(payload)),
		add_cart: payload => dispatch(add_item_to_cart(payload))
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ViewMydrugStoc);
