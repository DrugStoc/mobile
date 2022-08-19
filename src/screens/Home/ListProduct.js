//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, SafeAreaView, Image } from 'react-native';
import { Appbar, Colors, IconButton, List, Searchbar, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import ProductList from '../../components/ProductList';
import { destroy, get_product_each_category, get_product_for_each_manufacturer } from '../../services/products';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const width = Dimensions.get('screen').width;

// create a component
const ListPage = ({ navigation, route, all_category_result, list, all_brand_result, user, destroy_leak }) => {
	let info = route.params;

	const [ result, setResult ] = useState([]);
	console.log(info);

	const currencyFormat = (num) => {
		return '₦' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const searchCategories = (query) => {
		if (query.length > 0) {
			// console.log(all_categoties);
			let res = list.data.filter((n) => n.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
			console.log(res);
			setResult(res);
		} else {
			setResult([]);
		}
	};

	useEffect(() => {
		if (info.manufacturer) {
			all_brand_result(info.id);
		} else {
			all_category_result(info.id);
		}
		return () => {
			destroy_leak()
		}
	}, []);

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
			{info.manufacturer ? (<Appbar.Header style={{ elevation: 0, backgroundColor: '#fff' }}>
					{/* {info.manufacturer ? <Appbar.BackAction onPress={navigation.goBack} /> : null} */}
					{/* {!info.manufacturer ? ( */}
						<Searchbar
							style={{ elevation: 0, borderColor: Colors.grey300, borderWidth: 1, borderRadius: 40 }}
							numberOfLines={1}
							// onIconPress={navigation.goBack}
							inputStyle={{ fontSize: 14 }}
							// icon="arrow-left"
							placeholder="Search for products here"
							onChangeText={searchCategories}
						/>
					
				</Appbar.Header>) : null}
			</SafeAreaView>
			<ImageHeaderScrollView
				maxHeight={info.manufacturer?90:0}
				minHeight={0}
				showsVerticalScrollIndicator={false}
				// minOverlayOpacity={0}
				// maxOverlayOpacity={0}
				renderForeground={() => (
					<View>
						{info.manufacturer ? (
							<List.Item
								title={info.id}
								descriptionNumberOfLines={3}
								style={{ paddingHorizontal: 20 }}
								description={`Buy genuine ${info.id} products directly from source. Avoid substandard and Counterfeit!`}
								left={(props) => (
									<View
										style={{
											width: 100,
											height: 70,
											borderWidth: 1,
											borderRadius: 10,
											padding: 4,
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: 10,
											borderColor: Colors.grey300
										}}
									>
										<Image
											source={{ uri: info.comp.image }}
											style={{
												height: 50,
												width: '100%',
												resizeMode: 'contain',
												borderRadius: 5
											}}
										/>
									</View>
								)}
							/>
						) : null}
					</View>
				)}
			>
				<TriggeringView
					onHide={() => console.log('ass')}
					onTouchBottom={() => navTitleView.fadeInUp(200)}
					onTouchTop={() => tnavTitleView.fadeOut(100)}
				>
				<List.Section>
					<List.Subheader style={{ backgroundColor: '#F4F4F4' }}>
						{!info.manufacturer ? (
							'ALL RESULTS'
						) : (
							`${info.id.toUpperCase()}'S PRODUCTS (${list.data.length} AVAILABLE)`
						)}
					</List.Subheader>
					<View>
					<SkeletonContent
								animationType="pulse"
								containerStyle={{
									// height: 1000,
									paddingHorizontal: 20,
									width: '100%',
									marginTop: 20
								}}
								isLoading={list.loading}
								layout={[
									{ key: 'someId', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId2', width: "80%", height: 15, marginBottom: 6, left: 100, top: 0, position: 'absolute' },
									{ key: 'someId3', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 20 },
									{ key: 'someId4', width: 30, height: 30, marginBottom: 6, left: 100, position: 'absolute', top: 40 },
									{ key: 'someId5', width: 30, height: 30, marginBottom: 6, left: 160, position: 'absolute', top: 40 },
									{ key: 'someId6', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId7', width: "80%", height: 15, marginBottom: 6, left: 100, top: 90, position: 'absolute' },
									{ key: 'someId8', width: "65%", height: 10, marginBottom: 6, left: 100,  position: 'absolute', top: 110 },
									{ key: 'someId9', width: 30, height: 30, marginBottom: 6, left: 100, position: 'absolute', top: 130 },
									{ key: 'someId10', width: 30, height: 30, marginBottom: 6, left: 160, position: 'absolute', top: 130 },
									{ key: 'someId11', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId212', width: "80%", height: 15, marginBottom: 6, left: 100, top: 180, position: 'absolute' },
									{ key: 'someId213', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 200 },
									{ key: 'someId314', width: 30, height: 30, marginBottom: 6, left: 100,  position: 'absolute', top: 220 },
									{ key: 'someId315', width: 30, height: 30, marginBottom: 6, left: 160, position: 'absolute', top: 220 },
									{ key: 'someId16', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId217', width: "80%", height: 15, marginBottom: 6, left: 100, top: 270, position: 'absolute' },
									{ key: 'someId218', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 290 },
									{ key: 'someId319', width: 30, height: 30, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 310 },
									{ key: 'someId320', width: 30, height: 30, marginBottom: 6, left: 160, top: 0, position: 'absolute', top: 310 },
									{ key: 'someId21', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId222', width: "80%", height: 15, marginBottom: 6, left: 100, top: 360, position: 'absolute' },
									{ key: 'someId223', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 380 },
									{ key: 'someId324', width: 30, height: 30, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 400 },
									{ key: 'someId325', width: 30, height: 30, marginBottom: 6, left: 160, top: 0, position: 'absolute', top: 400 },
									{ key: 'someId26', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId227', width: "80%", height: 15, marginBottom: 6, left: 100, top: 450, position: 'absolute' },
									{ key: 'someId228', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 470 },
									{ key: 'someId329', width: 30, height: 30, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 490 },
									{ key: 'someId330', width: 30, height: 30, marginBottom: 6, left: 160, top: 0, position: 'absolute', top: 490 },
									{ key: 'someId31', width: 70, height: 70, marginBottom: 20 },
									{ key: 'someId232', width: "80%", height: 15, marginBottom: 6, left: 100, top: 540, position: 'absolute' },
									{ key: 'someId233', width: "65%", height: 10, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 560 },
									{ key: 'someId334', width: 30, height: 30, marginBottom: 6, left: 100, top: 0, position: 'absolute', top: 580 },
									{ key: 'someId335', width: 30, height: 30, marginBottom: 6, left: 160, top: 0, position: 'absolute', top: 580 },
								]}
							>
								{ result.length == 0?<View>
						{list.data.map((data, i) => <ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />)}
								</View>:
								<View>
						{result.map((data, i) => <ProductList key={i} verified={user.is_verified} data={data} navigation={navigation} />)}
								</View>}
							</SkeletonContent>
					</View>
				</List.Section>
				</TriggeringView>
			</ImageHeaderScrollView>
		</Surface>
	);
};

const mapStateToProps = (state) => {
	return {
		list: state.product_list,
		user: state.user.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		all_category_result: (id) => dispatch(get_product_each_category(id)),
		all_brand_result: (name) => dispatch(get_product_for_each_manufacturer(name)),
		destroy_leak: () => dispatch(destroy())
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
