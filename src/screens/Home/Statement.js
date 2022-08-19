//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Caption, Title, Surface, Appbar, Badge, Colors, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import { getting_users_profile_account } from '../../services/authentication';
import { customer_statement } from '../../services/products';
import moment from 'moment';

// create a component
const Statement = ({ statement, statement_list, account }) => {

	const currencyFormat = (num) => {
		return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};


	const renderHeader = () => (
		<Surface style={{ alignItems: 'center', marginBottom: 20, elevation: 0 }}>
			<Title style={{ fontWeight: '900', fontSize: 28 }}>{currencyFormat(Math.abs(statement_list.credit))}</Title>
			<Caption style={{color: statement_list.credit > 0 ? Colors.red600 : Colors.green600}}>{statement_list.credit > 0 ? 'DUE BALANCE' : "ACCOUNT BALANCE"}</Caption>
		</Surface>
	);

	const renderList = ({ item, index }) => (
		<View style={{ backgroundColor: '#fff' }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingVertical: 10,
					paddingHorizontal: 10
				}}
			>
				<View style={{ maxWidth: '60%' }}>
					<Title numberOfLines={1} style={styles.title}>
						{item.ref_title}
					</Title>
					<View style={{ flexDirection: 'row' }}>
						<Badge
							size={10}
							style={{
								marginBottom: 7,
								marginRight: 10,
								backgroundColor: item.status !== 'debit' ? Colors.green600 : Colors.red400
							}}
						>
							{''}
						</Badge>
						<Caption>{item.status !== 'debit' ? 'PAID' : `INVOICED (Due ${moment(item.due_date).endOf('day').fromNow()})`}</Caption>
					</View>
				</View>
				<View>
					<Title
						style={{
							...styles.title,
							textAlign: 'right',
							color: item.status !== 'debit' ? Colors.green600 : Colors.red400
						}}
					>
						{currencyFormat(item.amount)}
					</Title>
					<Caption style={{ textAlign: 'right' }}>{item.date}</Caption>
				</View>
			</View>
			<Divider />
		</View>
	);

	useEffect(() => {
		statement();
        account();
	}, []);
	return (
		<Surface style={styles.container}>
			<SafeAreaView>
				<Appbar.Header style={{ backgroundColor: 'transparent' }} />
				<View style={{marginBottom: 30}}>
					<View style={{backgroundColor: Colors.blue100, borderRadius: 20, padding: 20}}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
							<Text style={{fontSize: 20, fontWeight: '500'}}>Your Account</Text>
							<Text>Account No:</Text>
						</View>
						<Divider style={{height: 2, marginVertical: 10, color: '#000000'}} />
						<View style={{ marginTop: 20, marginBottom: 5}}>
							<Text style={{fontSize: 16, fontWeight: '500'}}>Total Outstanding</Text>
							<Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>{currencyFormat(Math.abs(statement_list.credit))}</Text>
						</View>
						<View style={{ marginTop: 5, marginBottom: 10}}>
							<Text style={{fontSize: 12, fontWeight: '500'}}>Amount Overdue Today</Text>
							<Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>{currencyFormat(Math.abs(statement_list.credit))}</Text>
						</View>
					</View>
				</View>
				<FlatList
					// stickyHeaderIndices={[ 0 ]}
					data={statement_list.statement}
					showsVerticalScrollIndicator={false}
					// ListHeaderComponent={renderHeader}
					renderItem={renderList}
				/>
			</SafeAreaView>
		</Surface>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	title: {
		fontSize: 17
	}
});

const mapStateToProps = (state) => {
	return {
		statement_list: state.statement
	};
};

// sale_rep_customer_statement
const mapDispatchToProps = (dispatch) => {
	return {
		statement: () => dispatch(customer_statement()),
        account: () => dispatch(getting_users_profile_account())
	};
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Statement);
