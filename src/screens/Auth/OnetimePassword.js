//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Caption, Card, Surface, TextInput, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { resend_otp_again, verify_a_new_user_has_a_valid_otp } from '../../services/authentication';
import { connect } from 'react-redux';

// create a component
const OnetimePassword = ({ navigation, verify, auth_data, phone_no, resend_otp }) => {
	const { control, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		let payload = {
			otp: data.otp,
			email: auth_data.email,
			phone_no: auth_data.phone_no,
			password: auth_data.password
		};
		verify(payload);
	};

	const [ min, setMin ] = useState('01');
	const [ sec, setSec ] = useState('00');
	const [ resend, setResend ] = useState(false);

	function startTimer() {
		var timer = 60,
			minutes,
			seconds;
		setInterval(function() {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			setMin(minutes);
			setSec(seconds);

			if (--timer < 0) {
				setMin('00');
				setSec('00');
				setResend(true);
			}
		}, 1000);
	}

	function resend_oneTp() {
		let payload = {
			old_phone: auth_data.phone_no,
			new_phone: auth_data.phone_no
		};
		resend_otp(payload).then(() => {
			startTimer();
			setResend(false);
		});
	}

	useEffect(() => {
		startTimer();
	}, []);

	function mask(number) {
		let x = number.toString().replace(/\D/g, '').match(/(\d{3})(\d{4})(\d{3})(\d{3})/);
		return `0${x[2]}${x[3]}***`;
	}

	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
				<View style={{ height: '100%', paddingHorizontal: 30 }}>
					<View>
						<Title style={{ fontWeight: 'bold', color: '#2C4DA7' }}>
							{'Please Enter\n OTP Verification'}
						</Title>
						<Caption>{`Code was sent to ${mask(phone_no == '' ? auth_data.phone_no : phone_no)}`}</Caption>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
						<Caption style={{ marginTop: 9, width: '60%', fontWeight: 'bold' }}>
							Didn’t receive an OTP?{' '}
							<Caption style={{ fontWeight: 'bold' }}>
								You can resend in{' '}
								<Caption style={{ color: '#EB5757', fontWeight: 'bold' }}>
									{min}:{sec}
								</Caption>
							</Caption>{' '}
						</Caption>
						<Button labelStyle={{fontSize: 12}} disabled={!resend} onPress={resend_oneTp}>
							Resend
						</Button>
					</View>
					<Controller
						control={control}
						render={({ onChange, onBlur, value }) => (
							<OTPInputView
								style={{ width: '80%', height: 70 }}
								pinCount={6}
								code={value}
								onBlur={onBlur}
								onCodeChanged={(value) => onChange(value)}
								onCodeFilled={(data) => {
									let payload = {
										otp: data,
										email: auth_data.email,
										phone_no: phone_no || auth_data.phone_no,
										password: auth_data.password
									};
									verify(payload);
								}}
								autoFocusOnLoad
								secureTextEntry
								codeInputFieldStyle={{ borderRadius: 15, marginRight: 7, color: '#000' }}
							/>
						)}
						name="otp"
						rules={{ required: true }}
						defaultValue=""
					/>
					{errors.phone_no && <Caption style={{ color: '#EB001B' }}>Phone number is required</Caption>}
					{/* <Button
						style={{ padding: 5, borderRadius: 50, marginTop: 20, marginBottom: 20 }}
						mode="contained"
						onPress={handleSubmit(onSubmit)}
					>
						verify
					</Button> */}
					<View style={{ flexDirection: 'row' }}>
						<Caption style={{ marginTop: 15, fontWeight: 'bold' }}>Wrong Phone No? </Caption>
						<TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
							<Caption style={{ marginTop: 15, color: '#4B70D6', fontWeight: 'bold' }}>
								Edit Phone number
							</Caption>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = (state) => {
	return {
		auth_data: state.authentication.verify_data,
		phone_no: state.authentication.phone_no
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verify: (payload) => dispatch(verify_a_new_user_has_a_valid_otp(payload)),
		resend_otp: (payload) => dispatch(resend_otp_again(payload))
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(OnetimePassword);
