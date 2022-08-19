//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Appbar, Colors, IconButton, List, Searchbar, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import DrugstocList from '../../components/DrugStocList';
import { get_products_categories } from '../../services/products';
import { FlatList } from 'react-native-gesture-handler';

// create a component
const CategoryScreen = ({ all_categoties, get_categories, recommended, navigation }) => {
	const [ result, setResult ] = useState([]);

	useEffect(() => {
		get_categories();
	}, []);

	const searchCategories = (query) => {
		if (query.length > 0) {
			console.log(all_categoties);
			let res = all_categoties.data.filter((n) => n.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
			// console.log(res);
			setResult(res);
		} else {
			setResult([]);
		}
	};

	return (
		<Surface style={{ flex: 1 }}>
			<Appbar.Header style={{ elevation: 0, backgroundColor: '#fff' }}>
				<Searchbar
					style={{ elevation: 0, borderColor: Colors.grey300, borderWidth: 1, borderRadius: 40 }}
					numberOfLines={1}
					inputStyle={{ fontSize: 14 }}
					// iconColor="#fff"
					onChangeText={searchCategories}
					placeholder="Search for categories here"
				/>
			</Appbar.Header>
			<ParallaxScrollView
				backgroundColor="transparent"
				contentBackgroundColor="transparent"
				parallaxHeaderHeight={0}
			>
				<SafeAreaView>
					<List.Section>
						<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>ALL CATEGORIES</List.Subheader>
						{result.length === 0 ? (
							<FlatList
								data={all_categoties.data}
								renderItem={(data) => <DrugstocList data={data} navigation={navigation} />}
							/>
						) : (
							<FlatList
								data={result}
								renderItem={(data) => <DrugstocList data={data} navigation={navigation} />}
							/>
						)}
					</List.Section>
				</SafeAreaView>
			</ParallaxScrollView>
		</Surface>
	);
};

const MapStateToProps = (state) => {
	return {
		all_categoties: state.categories
	};
};

const MapDispatachToProps = (dispatch) => {
	return {
		get_categories: () => dispatch(get_products_categories())
	};
};

//make this component available to the app
export default connect(MapStateToProps, MapDispatachToProps)(CategoryScreen);
