//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native';
import { Appbar, Button, Caption, Colors, Divider, IconButton, List, Searchbar, Surface } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { connect } from 'react-redux';
import ProductList from '../../components/ProductList';
import { search_products } from '../../services/products';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { FlatList } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

// create a component
const SearchResult = ({ navigation, search_data, result, user }) => {
	const [ search, setSearch ] = useState('');
	const [ type, setType ] = useState('all');
	const [ istyping, setTyping ] = useState(false);

	let { all, name, brand, composition } = result;

	const search_item = (data) => {
		setSearch(data);
		if(istyping){
			clearTimeout(istyping)
		}
		setTyping(setTimeout(function () {
			if(data.length >  0) {
				search_data(data)
			}
		}, 1000))
		// search_data(data);
	};

	const switch_result = (payload) => {
		setType(payload);
	};

	const Empty = () => (
		<View
			style={{
				height: 400,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<IconButton icon="magnify" color="#2C4DA7" size={100} onPress={null} />
			<Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 20 }}>No search result</Text>
			<Text>Sorry, we couldn’t find result for “{search}”</Text>
		</View>
	);

	// const all_result = () => {
	// 	if (all.length > 0) {
	// 		return (
	// 			<View>
	// 				{result.all.map((data, i) => (
	// 					<ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />
	// 				))}
	// 			</View>
	// 		);
	// 	} else {
	// 		return <Empty />;
	// 	}
	// };
	const name_result = () => {
		if (name.length > 0) {
			return (
				<View>
					{result.name.map((data, i) => (
						<ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />
					))}
				</View>
			);
		} else {
			return <Empty />;
		}
	};
	const brand_result = () => {
		if (brand.length > 0) {
			return (
				<View>
					{result.brand.map((data, i) => (
						<ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />
					))}
				</View>
			);
		} else {
			return <Empty />;
		}
	};
	const composition_result = () => {
		if (composition.length > 0) {
			return (
				<View>
					{result.composition.map((data, i) => (
						<ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />
					))}
				</View>
			);
		} else {
			return <Empty />;
		}
	};
	// const name_result = () => {}
	// 	<View>{result.name.map((data, i) => <ProductList key={i} data={data} navigation={navigation} />)}</View>
	// ;
	// const brand_result = () => (
	// 	<View>{result.brand.map((data, i) => <ProductList key={i} data={data} navigation={navigation} />)}</View>
	// );
	// const composition_result = () => (
	// 	<View>{result.composition.map((data, i) => <ProductList key={i} data={data} navigation={navigation} />)}</View>
	// );

	const render_result_type = () => {
		switch (type) {
			case 'all':
				return result.all;
			case 'name':
				return result.name;
			case 'brand':
				return result.brand;
			case 'composition':
				return result.composition;
			default:
				return all_result();
		}
	};

	const renderHeader = () => {

	}

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<View>
					<Searchbar
						style={{
							elevation: 0,
							borderColor: Colors.grey300,
							borderWidth: 1,
							borderRadius: 40,
							marginHorizontal: 10,
							marginBottom: 10
						}}
						numberOfLines={1}
						// onIconPress={navigation.goBack}
						inputStyle={{ fontSize: 14 }}
						// icon="arrow-left"
						onSubmitEditing={() => search_data(search)}
						// iconColor="#fff"
						placeholder="Search for products here"
						onChangeText={search_item}
						value={search}
					/>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 20, marginTop: 5, marginBottom: 2 }}
					>
						<Button
							style={{ marginRight: 20 }}
							mode={type == 'all' ? 'contained' : 'outlined'}
							onPress={() => switch_result('all')}
						>
							<Caption style={{ color: type == 'all' ? '#fff' : Colors.grey500, fontWeight: 'bold' }}>
								All
							</Caption>
						</Button>
						<Button
							style={{ marginRight: 20 }}
							mode={type == 'name' ? 'contained' : 'outlined'}
							onPress={() => switch_result('name')}
						>
							<Caption style={{ color: type == 'name' ? '#fff' : Colors.grey500, fontWeight: 'bold' }}>
								Product Name
							</Caption>
						</Button>
						<Button
							style={{ marginRight: 20 }}
							mode={type == 'brand' ? 'contained' : 'outlined'}
							onPress={() => switch_result('brand')}
						>
							<Caption style={{ color: type == 'brand' ? '#fff' : Colors.grey500, fontWeight: 'bold' }}>
								Brand Name
							</Caption>
						</Button>
						<Button
							style={{ marginRight: 20 }}
							mode={type == 'composition' ? 'contained' : 'outlined'}
							onPress={() => switch_result('composition')}
						>
							<Caption
								style={{
									color: type == 'composition' ? '#fff' : Colors.grey500,
									fontWeight: 'bold'
								}}
							>
								Composition
							</Caption>
						</Button>
					</ScrollView>
				</View>
				<List.Section>
					<Divider />
					<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>ALL SUGGESTED RESULT</List.Subheader>
					<SkeletonContent
						animationType="pulse"
						containerStyle={{
							// height: 1000,
							paddingHorizontal: 20,
							width: '100%',
							marginTop: 20
						}}
						isLoading={result.loading}
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
					>
						<FlatList
							data={render_result_type()}
							style={{height: height-270}}
							ListEmptyComponent={() => <Empty />}
							renderItem={(data) => (
								<ProductList
									key={data.index}
									verified={user.is_verified}
									data={data.item}
									navigation={navigation}
								/>
							)}
						/>
					</SkeletonContent>
				</List.Section>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = (state) => {
	return {
		result: state.search,
		user: state.user.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		search_data: (data) => dispatch(search_products(data))
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
