//import liraries
import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import { Button, Caption, Card, Surface, TextInput, Title } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import DropDown from 'react-native-paper-dropdown';
import { advert, location } from '../../utils/data';
import { skip_update_document_for_now } from '../../services/onboarding';
import { connect } from 'react-redux';
import { getting_users_profile, upload_user_licences } from '../../services/authentication';

// create a component
const UpdateData = ({ navigation, skip, upload, user, loading }) => {
	const [ showDropDown1, setShowDropDown1 ] = useState(false);
	const [ showDropDown2, setShowDropDown2 ] = useState(false);
	const [ premisePreview, setPremise ] = useState(null);
	const [ lisencePreview, setLicence ] = useState(null);
	const [ premiseData, setPremiseData ] = useState(null);
	const [ lisenceData, setLicenceDate ] = useState(null);
	const [ locations, setLocation ] = useState('');
	const [ discover, setDiscover ] = useState('');
	const { control, handleSubmit, errors } = useForm();

	const options = {
		title: 'Select Document',
		storageOptions: {
			skipBackup: true,
			path: 'images'
		}
	};

	const formdata = new FormData();

	useEffect(() => {
		user();
	}, []);

	const upload_practice_license = () => {
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				return;
			} else if (response.error) {
				return;
			} else if (response.customButton) {
				return;
			} else {
				ImageResizer.createResizedImage(
					response.uri,
					600,
					600,
					"JPEG",
					40
				)
					.then((res) => {
						setLicenceDate(res);
						setLicence(res.uri);
						console.log(res);
					})
					.catch((err) => {
						console.log(err)
					});
			}
		});
	};

	const upload_premise_license = () => {
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				return;
			} else if (response.error) {
				return;
			} else if (response.customButton) {
				return;
			} else {
				ImageResizer.createResizedImage(
					response.uri,
					600,
					600,
					"JPEG",
					40
				)
					.then((res) => {
						setPremiseData(res);
						setPremise(res.uri);
					})
					.catch((err) => {
						console.log(err)
					});
			}
		});
	};

	const onSubmit = () => {
		formdata.append('location', locations);
		formdata.append('discover', discover);
		formdata.append('practice_license', {
			name: lisenceData.name,
			type: "image/jpeg",
			uri: Platform.OS === 'android' ? lisenceData.uri : lisenceData.uri.replace('file://', '')
		});
		formdata.append('premise_license', {
			name: premiseData.name,
			type: "image/jpeg",
			uri: Platform.OS === 'android' ? premiseData.uri : premiseData.uri.replace('file://', '')
		});
		upload(formdata);
		// NavigationContainer.naviagte('update');
	};

	const skippForNow = () =>
		Alert.alert(
			'Please Note!',
			'Your licenses must be uploaded and approved to access Discounted prices, Promos, Offers and Credit facilities ',
			[
				{
					text: 'Continue',
					style: 'default',
					onPress: () => skip()
				},
				{
					text: 'Cancel',
					style: 'destructive',
					onPress: null
				}
			]
		);

	return (
		<Surface style={{ flex: 1, shadowOpacity: 0 }}>
			<ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
				<View style={{ paddingHorizontal: 20 }}>
					<Title style={{ fontWeight: 'bold', color: '#2C4DA7', marginBottom: 20 }}>
						{'Final step, let’s verify you'}
					</Title>
					<Controller
						control={control}
						render={({ onChange, onBlur, value }) => (
							<DropDown
								label={'Location'}
								mode={'outlined'}
								onBlur={onBlur}
								setValue={(value) => {
									onChange(value);
									setLocation(value);
								}}
								value={value}
								list={location}
								visible={showDropDown1}
								showDropDown={() => setShowDropDown1(true)}
								onDismiss={() => setShowDropDown1(false)}
								inputProps={{
									right: <TextInput.Icon name={'menu-down'} />
								}}
							/>
						)}
						name="location"
						rules={{ required: true }}
						defaultValue=""
					/>
					{errors.category && <Caption style={{ color: '#EB001B' }}>Please where is your location</Caption>}
					<View style={{ marginTop: 10 }}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<DropDown
									label={'How did you hear about us?'}
									mode={'outlined'}
									onBlur={onBlur}
									setValue={(value) => {
										onChange(value);
										setDiscover(value);
									}}
									value={value}
									list={advert}
									visible={showDropDown2}
									showDropDown={() => setShowDropDown2(true)}
									onDismiss={() => setShowDropDown2(false)}
									inputProps={{
										right: <TextInput.Icon name={'menu-down'} />
									}}
								/>
							)}
							name="category"
							rules={{ required: false }}
							defaultValue=""
						/>
						{errors.category && (
							<Caption style={{ color: '#EB001B' }}>Please tell us how you heard about us</Caption>
						)}
						{!lisencePreview ? (
							<TouchableOpacity onPress={upload_practice_license}>
								<Card
									style={{
										marginTop: 20,
										borderRadius: 1,
										borderWidth: 1.2,
										borderStyle: 'dashed',
										borderColor: 'grey',
										elevation: 0,
										alignItems: 'center'
									}}
								>
									<Button icon="upload">Upload</Button>
									<Caption style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
										Attach your Practicing License
									</Caption>
									<Caption style={{ textAlign: 'center', marginBottom: 10 }}>
										{'Upload (jpg or png image) or pdf\nMax upload size: 10MB'}
									</Caption>
								</Card>
							</TouchableOpacity>
						) : (
							<Card style={{ marginTop: 20 }}>
								<Card.Title title="Practicing License" titleStyle={{ fontSize: 16 }} />
								<Card.Cover source={{ uri: lisencePreview }} />
								<Card.Actions>
									<Button onPress={() => setLicence(null)}>Delete</Button>
									<Button onPress={upload_practice_license}>Edit</Button>
								</Card.Actions>
							</Card>
						)}
						{!premisePreview ? (
							<TouchableOpacity onPress={upload_premise_license}>
								<Card
									style={{
										marginTop: 20,
										borderRadius: 1,
										borderWidth: 1.2,
										borderStyle: 'dashed',
										borderColor: 'grey',
										elevation: 0,
										alignItems: 'center'
									}}
								>
									<Button icon="upload">Upload</Button>
									<Caption style={{ fontSize: 16, fontWeight: 'bold' }}>
										Attach your Premise License
									</Caption>
									<Caption style={{ textAlign: 'center', marginBottom: 10 }}>
										{'Upload (jpg or png image) or pdf\nMax upload size: 10MB'}
									</Caption>
								</Card>
							</TouchableOpacity>
						) : (
							<Card style={{ marginTop: 20 }}>
								<Card.Title title="Premise License" />
								<Card.Cover source={{ uri: premisePreview }} />
								<Card.Actions>
									<Button onPress={() => setPremise(null)}>Delete</Button>
									<Button onPress={upload_premise_license}>Edit</Button>
								</Card.Actions>
							</Card>
						)}

						<Caption
							style={{
								textAlign: 'center',
								marginTop: 30,
								paddingHorizontal: '3%',
								fontSize: 10,
								letterSpacing: 0
							}}
						>
							By creating an account, I confirm that I have read and understood the DrugStoc’s{' '}
							<Caption
								onPress={() => alert('hello')}
								style={{
									fontWeight: 'bold',
									textDecorationLine: 'underline',
									fontSize: 10,
									letterSpacing: 0
								}}
							>
								Privacy Policy{' '}
							</Caption>and{' '}
							<Caption
								onPress={() => alert('hello')}
								style={{
									fontWeight: 'bold',
									textDecorationLine: 'underline',
									fontSize: 10,
									letterSpacing: 0
								}}
							>
								Terms of Use.
							</Caption>
						</Caption>
					</View>
					<Button
						style={{ padding: 5, borderRadius: 50, marginTop: 20 }}
						mode="contained"
						loading={loading}
						disabled={loading}
						onPress={handleSubmit(onSubmit)}
					>
						complete
					</Button>
					<Button style={{ padding: 5 }} onPress={skippForNow}>
						skip for now
					</Button>
				</View>
			</ScrollView>
		</Surface>
	);
};
 
const mapStateToProps = (state) => {
	return {
		loading: state.loading.uiloading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		skip: () => dispatch(skip_update_document_for_now()),
		upload: (payload) => dispatch(upload_user_licences(payload)),
		user: () => dispatch(getting_users_profile())
	};
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(UpdateData);
