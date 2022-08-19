//import liraries
import React, { Component } from 'react';
import Logo from '../../assets/imgs/Logo.png';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Caption, Surface, TextInput, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { login_user_to_app } from '../../services/authentication';
import { connect } from 'react-redux';

// create a component
const Login = ({ navigation, login_user, loading }) => {
	const { control, handleSubmit, errors } = useForm();
	const onSubmit = (data) => login_user(data);

	return (
		<Surface style={{flex: 1, shadowOpacity: 0 }}>
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<ScrollView contentContainerStyle={{ flex: 2, paddingBottom: 20 }}>
				<View style={{ paddingHorizontal: 20 }}>
					<View style={{ alignItems: 'center' }}>
						<Image
							source={Logo}
							style={{ height: '22%', resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
						/>
						<Title style={{ fontWeight: 'bold', color: '#2C4DA7' }}>Welcome Back!</Title>
						<Caption>Sign in to your DrugStoc account</Caption>
					</View>
					<Controller
						control={control}
						rules={{}}
						render={({ onChange, onBlur, value }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
								autoCapitalize="none"
								mode="outlined"
								label="Email Address"
							/>
						)}
						name="email"
						rules={{ required: true }}
						defaultValue=""
					/>
					{errors.email && <Caption style={{color: '#EB001B'}}>Email is required</Caption>}
					<Controller
						control={control}
						render={({ onChange, onBlur, value }) => (
							<TextInput
								style={{ marginTop: 10 }}
								mode="outlined"
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
								label="Password"
								secureTextEntry
							/>
						)}
						name="password"
						rules={{ required: true }}
						defaultValue=""
					/>
					{errors.password && <Caption style={{color: '#EB001B'}}>Password is required</Caption>}
					<Button loading={loading}  disabled={loading} style={{ padding: 5, borderRadius: 50, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)} >
						log in
					</Button>
					{/* <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
						<Caption style={{ marginTop: 15, color: '#4B70D6', textAlign: 'center' }}>
							Forgot Password?
						</Caption>
					</TouchableOpacity> */}
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Caption style={{ marginTop: 15 }}>DON'T HAVE AN ACCOUNT? </Caption>
					<TouchableOpacity onPress={() => navigation.navigate('register')}>
						<Caption style={{ marginTop: 15, color: '#4B70D6' }}>SIGN UP</Caption>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
		loading: state.loading.uiloading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login_user: payload => dispatch(login_user_to_app(payload))
	}
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login);
