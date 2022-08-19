//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import AccountOverview from '../../components/AccountOverview';
import Selection from '../../components/Selecttions';

// create a component
const FundAccount = () => {
	return (
		<Surface style={{ flex: 1, paddingHorizontal: 15 }}>
			<ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
				<SafeAreaView>
					<Text>FundAccount</Text>
					<AccountOverview />
					<Text style={{ textAlign: 'center', marginTop: 20 }}>OR</Text>
					<View style={styles.margin}>
						<Selection title="USSD" subtitle="Transfer using your other bank’s USSD" />
					</View>
					<View style={styles.margin}>
						<Selection
							title="Add money with Debit Card"
							subtitle="Fund your account with your debit card"
						/>
					</View>
					<Text style={{ textAlign: 'center', marginTop: 20 }}>OR</Text>
					<View style={styles.margin}>
						<Selection title="Apply for Sterling Bank Loan" subtitle="Low interest rates" />
					</View>
				</SafeAreaView>
			</ScrollView>
		</Surface>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	margin: {
		marginTop: 20
	}
});

//make this component available to the app
export default FundAccount;
