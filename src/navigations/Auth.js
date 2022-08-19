//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Navbar from '../components/Navbar';
import Onboarding from '../screens/Auth/Onboarding';
import Register from '../screens/Auth/Register';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import OnetimePassword from '../screens/Auth/OnetimePassword';
import UpdateData from '../screens/Auth/UpdateData';
import { connect } from 'react-redux';
import { check_if_user_is_onboarded } from '../services/onboarding';
import Welcome from '../screens/Auth/Welcome';
import About from '../screens/Home/About';

const Stack = createStackNavigator();

// create a component
const Authentication = ({onboard, verify}) => {
	return (
		<Stack.Navigator>
			{!onboard ? (
				<Stack.Screen
					name="onboarding"
					component={Onboarding}
					options={{ header: (props) => <Navbar {...props} /> }}
				/>
			) : (
				<Stack.Screen
					name="welcome"
					component={Welcome}
					options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
				/>
			)}
			<Stack.Screen
				name="login"
				component={Login}
				options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
			/>
			<Stack.Screen
				name="register"
				component={!verify?Register:OnetimePassword}
				options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
			/>
			<Stack.Screen
				name="forgetpassword"
				component={ForgetPassword}
				options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
			/>
			<Stack.Screen
				name="otp"
				component={OnetimePassword}
				options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
			/>
			<Stack.Screen
				name="update"
				component={UpdateData}
				options={{ header: (props) => <Navbar {...props} transp="#fff" /> }}
			/>
		</Stack.Navigator>
	);
};

const mapStateTopProps = state => {
    return {
        onboard: state.loading.onboarded,
        verify: state.authentication.verify
    }
}

//make this component available to the app
export default connect(mapStateTopProps)(Authentication);
