//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Linking } from 'react-native';
import { Appbar, Avatar, Button, Divider, List, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import Logo from '../../assets/imgs/Profile_icon.png';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { getting_users_profile_account, logout_user_from_app } from '../../services/authentication';
// create a component
const Account = ({navigation, logout, user}) => {

    const privacy_policy = async () => {
        try {
          const url = 'https://www.drugstoc.com/terms-and-conditions/'
          if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url)
          }
          else Linking.openURL(url)
        } catch (error) {
          Alert.alert(error.message)
        }
}
    const about_us = async () => {
        try {
          const url = 'https://www.drugstoc.com/about-us/'
          if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url)
          }
          else Linking.openURL(url)
        } catch (error) {
          Alert.alert(error.message)
        }
}

// useEffect(() => {
//   account()
//   return () => {
//     null
//   }
// }, [])



	return (
		<Surface style={{ flex: 1 }}>
			<SafeAreaView>
            <Appbar.Header style={{ elevation: 0, backgroundColor: 'transparent' }} />
				<List.Item
                    style={{paddingHorizontal: 30, marginBottom: 20}}
					title={user.name}
                    description="Elite"
					left={() => <Avatar.Image size={50} source={Logo} />}
				/>
                {/* <Divider />
                <List.Item onPress={() => navigation.navigate('statement') } title="Statement of acccount" left={props => <List.Icon {...props} icon="folder" />} right={props => <List.Icon {...props} icon="chevron-right" />}/> */}
                <Divider />
                <List.Item onPress={() => navigation.navigate('Orders')} title="Orders" left={props => <List.Icon {...props} icon="basket-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider />
                {/* <List.Item title="My Details" left={props => <List.Icon {...props} icon="card-account-details-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider /> */}
                {/* <List.Item title="Delivery Address" left={props => <List.Icon {...props} icon="map-marker-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider /> */}
                {/* <List.Item title="Payment Method" left={props => <List.Icon {...props} icon="credit-card-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider /> */}
                {/* <List.Item title="Redeem Shopping Voucher" left={props => <List.Icon {...props} icon="ticket-percent-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider /> */}
                <List.Item onPress={() => navigation.navigate('document')} title="Document Upload" left={props => <List.Icon {...props} icon="folder" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider />
                <List.Item onPress={() => navigation.navigate('setpin')} title="Set Transaction Pin" left={props => <List.Icon {...props} icon="pin" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider />
                <List.Item onPress={() => navigation.navigate('support')} title="Contact us" left={props => <List.Icon {...props} icon="help-circle-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider />
                <List.Item onPress={() => navigation.navigate('about')} title="Terms and Condition" left={props => <List.Icon {...props} icon="information-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider />
                {/* <List.Item onPress={() => navigation.navigate('drugstocpay')} title="Drugstoc Pay" left={props => <List.Icon {...props} icon="information-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/>
                <Divider /> */}
                {/* <List.Item title="About" onPress={() => navigation.navigate('about')}  left={props => <List.Icon {...props} icon="information-outline" />} right={props => <List.Icon {...props} icon="chevron-right" />}/> */}
                <Divider />
                <Button mode="contained" style={{marginTop: 150, marginHorizontal: 60, paddingVertical: 10, borderRadius: 40}} onPress={logout}>Log Out</Button>
			</SafeAreaView>
		</Surface>
	);
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout_user_from_app()),
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Account);
