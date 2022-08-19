//import liraries
import React, { useEffect } from 'react';
import { BottomNavigation, Colors, DarkTheme, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import Home from '../screens/Home/Home';
import CategoryScreen from '../screens/Home/Category';
import AccountScreen from '../screens/Home/Account';
import MyDrugStocScreen from '../screens/Home/MyDrugStoc';
import { getting_users_profile } from '../services/authentication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import MyDrugStoc from '../assets/icons/mydrugstoc.png';
import Category from '../assets/icons/categories.png';
import Orders from '../assets/icons/orders.png';
import Account from '../assets/icons/account.png';
import HomeIcon from '../assets/icons/home.png';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MyOrders from '../screens/Home/Orders';
import OrderSuccess from '../screens/Home/OrderSuccess';
import Statement from '../screens/Home/Statement';
// import Home from '../screens/Main/Home';

const Tab = createBottomTabNavigator();

// create a component
const AppNavigations = ({ user }) => {

	useEffect(() => {
		user();
	}, []);

	return (
		<Tab.Navigator
			tabBarOptions={{
				inactiveTintColor: "#414141",
				activeTintColor: '#2C4DA7',
				style: { height: '10%', elevation: 15 },
				// showLabel: false
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}

				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ padding: 10, backgroundColor: focused ? '#2C4DA7' : '#fff', borderRadius: 30 }}>
							<Image
								source={HomeIcon}
								style={{
									height: focused ? 20 : size,
									width: focused ? 20 : size,
									resizeMode: 'contain',
									tintColor: focused ? '#fff' : color
								}}
							/>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="My DrugStoc"
				component={MyDrugStocScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ padding: 10, backgroundColor: focused ? '#2C4DA7' : '#fff', borderRadius: 30 }}>
							<Image
								source={MyDrugStoc}
								style={{
									height: focused ? 20 : size,
									width: focused ? 20 : size,
									resizeMode: 'contain',
									tintColor: focused ? '#fff' : color
								}}
							/>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="Drugstoc Pay"
				component={Statement}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ padding: 10, backgroundColor: focused ? '#2C4DA7' : '#fff', borderRadius: 30 }}>
							<Image
								source={Category}
								style={{
									height: focused ? 20 : size,
									width: focused ? 20 : size,
									resizeMode: 'contain',
									tintColor: focused ? '#fff' : color
								}}
							/>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="Orders"
				component={MyOrders}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ padding: 10, backgroundColor: focused ? '#2C4DA7' : '#fff', borderRadius: 30 }}>
							<Image
								source={Orders}
								style={{
									height: focused ? 20 : size,
									width: focused ? 20 : size,
									resizeMode: 'contain',
									tintColor: focused ? '#fff' : color
								}}
							/>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="Account"
				component={AccountScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ padding: 10, backgroundColor: focused ? '#2C4DA7' : '#fff', borderRadius: 30 }}>
							<Image
								source={Account}
								style={{
									height: focused ? 20 : size,
									width: focused ? 20 : size,
									resizeMode: 'contain',
									tintColor: focused ? '#fff' : color
								}}
							/>
						</View>
					)
				}}
			/>
		</Tab.Navigator>
	);

};

const mapDispatchToProps = (dispatch) => {
	return {
		user: () => dispatch(getting_users_profile())
	};
};

export default connect(null, mapDispatchToProps)(AppNavigations);
