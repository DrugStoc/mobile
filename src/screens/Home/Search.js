//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { Appbar, Colors, Divider, IconButton, List, Searchbar, Surface } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import DrugstocList from '../../components/DrugStocList';
import Navbar from '../../components/Navbar';
import { FlatList } from 'react-native-gesture-handler';
import { destroy_manufacturer_leaks, get_manufacturer, load_more_manufacturer, search_products } from '../../services/products';

const width = Dimensions.get('screen').width;

const height = Dimensions.get('window').height

// create a component
const Search = ({ navigation, route, user, destroy, brands, brand, page, search }) => {
	let info = route.params;
	const [query, setQuery] = useState('')
	useEffect(() => {
		brands(page)
		return () => {
			destroy()
		}
	}, [])

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<View style={{maxHeight: '20%'}}>
						<Searchbar
							style={{ elevation: 0, borderColor: Colors.grey300, borderWidth: 1, borderRadius: 40 }}
							numberOfLines={1}
							// onIconPress={navigation.goBack}
							inputStyle={{ fontSize: 14 }}
							// icon="arrow-left"
							onSubmitEditing={() => search(query)}
							// iconColor="#fff"
							placeholder="Search for Manufacturers here"
							onChangeText={setQuery}
						/>
					<List.Section>
						<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>ALL MANUFACTURERS</List.Subheader>
					</List.Section>
				</View>
						<FlatList
							onEndReachedThreshold={1}
							initialNumToRender={40}
							onEndReached={() => brands(page)}
							data={brand}
							style={{height: '80%' }}
							keyExtractor={(item)=>item.id}
							renderItem={(data) => <DrugstocList data={data} key={data.index} navigation={navigation} manufacturer={info.manufacturer} />}
						/>
						{/* {page != null ? <ActivityIndicator /> : null} */}
			</SafeAreaView>
		</Surface>
	);
};

const MapStateToProps = (state) => {
	return {
		user: state.user.user,
		brand: state.brand.data,
		page: state.brand.page
	};
};

const mapDispatchToProps = dispatch => {
	return {
		brands: (page) => dispatch(load_more_manufacturer(page)),
		destroy: () => dispatch(destroy_manufacturer_leaks()),
		search: (query) => dispatch(get_manufacturer(query)),
	}
}

//make this component available to the app
export default connect(MapStateToProps, mapDispatchToProps)(Search);
