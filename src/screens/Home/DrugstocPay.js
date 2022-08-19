//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Divider, IconButton, Surface } from 'react-native-paper';
import PaymentCard from '../../components/PaymentCard';

// create a component
const DrugstocPay = ({ navigation }) => {
	const [ account, setAccount ] = useState(false);
	const List = () => (
		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 19 }}>
				<View>
					<Text style={{ marginBottom: 12 }}>NIP//98746678</Text>
					<Text style={{ fontSize: 10 }}>
						<View style={{ backgroundColor: Colors.green400, width: 6, height: 6, borderRadius: 6 }} />
						<View style={{ width: 6, height: 6, borderRadius: 6 }} />
						Transfer
					</Text>
				</View>
				<View style={{ alignItems: 'flex-end' }}>
					<Text style={{ marginBottom: 12, fontWeight: '600', color: '#FF647C' }}>N570,811</Text>
					<Text style={{ color: Colors.grey500, fontSize: 10 }}>Oct 3, 2021 11:00 PM</Text>
				</View>
			</View>
			<Divider />
		</View>
	);

	return (
		<Surface style={{ flex: 1, paddingHorizontal: 15 }}>
			<ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
				<SafeAreaView>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<PaymentCard
							title="YOUR ACCOUNT"
							amount="NGN 0"
							accountNumber="0600001329"
							type="ACCOUNT BALANCE"
							active={true}
						/>
						<PaymentCard title="DRUGSTOC CREDIT" amount="N 0" accountNumber="" type="AVAILABLE CREDIT" />
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 35 }}>
						<TouchableOpacity onPress={() => navigation.navigate('fundaccount')}>
							<View style={styles.buttonDiv}>
								<View style={styles.button}>
									<IconButton size={20} color={Colors.green400} onPress={null} icon="plus" />
								</View>
								<Text style={styles.textfont}>FUND ACCOUNT</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('applyLoan')}>
							<View style={styles.buttonDiv}>
								<View style={styles.button}>
									<IconButton size={20} color={Colors.red400} onPress={null} icon="send" />
								</View>
								<Text style={styles.textfont}>APPLY FOR LOAN</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('repayLoan')}>
							<View style={styles.buttonDiv}>
								<View style={styles.button}>
									<IconButton size={20} color={Colors.purple400} onPress={null} icon="download" />
								</View>
								<Text style={styles.textfont}>REPAY LOAN</Text>
							</View>
						</TouchableOpacity>
					</View>

					<Text style={{ marginTop: 40 }}>RECENT TRANSACTIONS</Text>

					<FlatList
						data={[]}
						showsVerticalScrollIndicator={false}
						style={{ marginTop: 20 }}
						ListHeaderComponentStyle={{ width: '100%' }}
						ListEmptyComponent={() => (
							<View
								style={{
									height: 300,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Text style={{color: Colors.grey600, fontSize: 10}}>No Transactions Yet</Text>
							</View>
						)}
						keyExtractor={(item) => item.id}
						renderItem={(data) => List(data)}
					/>
				</SafeAreaView>
			</ScrollView>
		</Surface>
	);
};

// define your j
const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		borderRadius: 50,
		width: 50,
		height: 50,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 5,
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 0,
			height: 0
		}
	},
	buttonDiv: {
		alignItems: 'center'
	},

	textfont: {
		fontSize: 10,
		marginTop: 12
	}
	// container: {
	//     flex: 1,
	//     justifyContent: 'center',
	//     alignItems: 'center',
	//     backgroundColor: '#2c3e50',
	// },
});

//make this component available to the app
export default DrugstocPay;
