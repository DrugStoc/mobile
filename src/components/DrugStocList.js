//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';

// create a component
const DrugstocList = ({data, navigation, manufacturer}) => {
	return (
		<View>
			<List.Item
				title={data.item.name}
				titleStyle={{ color: 'grey' }}
				onPress={() => navigation.navigate('products', {id: manufacturer? data.item.name: data.item.id, comp: data.item, manufacturer: manufacturer})}
				right={() => <List.Icon color="grey" icon="chevron-right" />}
			/>
			<Divider />
		</View>
	);
};

//make this component available to the app
export default DrugstocList;
