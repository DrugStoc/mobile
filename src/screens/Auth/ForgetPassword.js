//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Button, Caption, Card, Surface, TextInput, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { resend_otp_again } from '../../services/authentication';

const height = Dimensions.get('screen').height;

// create a component
const ForgetPassword = ({ navigation, resend_otp, phone, phone_no  }) => {
	const { control, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		let dat = {
			old_phone: phone_no == ''?phone.phone_no:phone_no,
			new_phone: data.phone_no
		}
		resend_otp(dat).then(resp => {
			console.log(resp)
			navigation.navigate('register');
		})
	};

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<View style={{ height: '100%', marginTop: height / 20, paddingHorizontal: 30 }}>
					<Card style={{ padding: 20, borderRadius: 10, borderWidth: 0.3, borderColor: '#C9C9C9' }}>
						<View style={{ alignItems: 'center' }}>
							<Title style={{ fontWeight: 'bold', color: '#2C4DA7' }}>Enter Phone Number</Title>
							<Caption style={{ marginBottom: 30 }}>Enter your correct phone number</Caption>
						</View>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<TextInput
									style={{ marginTop: 10 }}
									mode="outlined"
									maxLength={11}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
									label="Enter Phone Number"
									placeholder="08012345678"
									keyboardType="phone-pad"
								/>
							)}
							name="phone_no"
							rules={{ required: true }}
							defaultValue=""
						/>
						{errors.phone_no && <Caption style={{ color: '#EB001B' }}>Phone number is required</Caption>}
						<Button
							style={{ padding: 5, borderRadius: 50, marginTop: 30, marginBottom: 50 }}
                            mode="contained"
                            onPress={handleSubmit(onSubmit)}
						>
							Continue
						</Button>
					</Card>
				</View>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = state => {
	return {
		phone: state.authentication.verify_data,
		phone_no: state.authentication.phone_no
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resend_otp: payload => dispatch(resend_otp_again(payload))
	}
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
