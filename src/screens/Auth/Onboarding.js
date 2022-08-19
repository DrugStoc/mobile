//import liraries
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Image,
	ImageBackground
} from 'react-native';
import { Button, Caption, Surface, Appbar } from 'react-native-paper';
import Logo from '../../assets/imgs/Logo.png';
import Background from '../../assets/imgs/background.png';
import Onboarding1 from '../../assets/imgs/onboarding1.png';
import Onboarding2 from '../../assets/imgs/onboarding2.png';
import Onboarding3 from '../../assets/imgs/onboarding3.png';
import AppIntroSlider from 'react-native-app-intro-slider';
import { get_started } from '../../services/onboarding';
import { connect } from 'react-redux';


// create a component
const Onboarding = ({ navigation, login }) => {
	const slides = [
		{
			key: '1',
			text: 'Source all your Pharmaceutical\nneeds from the palm of your hand',
			image: Onboarding1
		},
		{
			key: '2',
			text: 'Experience seamless procurement\nwith excellent customer service',
			image: Onboarding2
		},
		{
			key: '3',
			text: 'We deliver within 24 hours all\norders purchased within Lagos',
			image: Onboarding3
		}
	];

	const _renderItem = ({ item, index }) => {
		return (
			<View key={index} style={{ flex: 1, }}>
				<View style={{ height: '70%', alignItems: 'center' }}>
					<Image source={item.image} style={{ height: '75%', resizeMode: 'contain' }} />
				</View>
				<View style={{ alignItems: 'center', marginTop: 40 }}>
					<Text style={styles.text}>{item.text}</Text>
				</View>
			</View>
		);
	};


		return (
			<Surface style={{flex: 1}}>
				<StatusBar backgroundColor="#2C4DA7" barStyle="light-content" />
				<SafeAreaView>
					<View style={{ height: '80%'}}>
						<ImageBackground
							source={Background}
							resizeMethod="scale"
							resizeMode="stretch"
							style={{ width: '100%', height: '90%', position: 'absolute', zIndex: 0 }}
						/>
						<Image source={Logo} style={{ height: '8%', resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }} />
						<AppIntroSlider
							data={slides}
							renderItem={_renderItem}
							showDoneButton={false}
							showNextButton={false}
							activeDotStyle={{ backgroundColor: '#2C4DA7', marginTop: 60 }}
							dotStyle={{ marginTop: 60, backgroundColor: '#C1C1C1' }}
						/>
					</View>
					<View style={{ marginHorizontal: 30, marginTop: 10 }}>
						<Button style={{ padding: 5, borderRadius: 50 }} mode="contained" onPress={login}>
							Get started
						</Button>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Caption style={{ marginTop: 15 }}>ALREADY HAVE AN ACCOUNT? </Caption>
							<TouchableOpacity onPress={login}>
								<Caption style={{ marginTop: 15, color: '#4B70D6' }}>LOG IN</Caption>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</Surface>
		);
	
};

// define your styles
const styles = StyleSheet.create({
	wrapper: {},
	slide1: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5'
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9'
	},
	text: {
		// color: '#fff',
		fontSize: 16,
		width: '70%',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

const mapDispatchToProps = dispatch => {
	return{
		login: () => dispatch(get_started())
	}
}

//make this component available to the app
export default connect(null, mapDispatchToProps)(Onboarding);
