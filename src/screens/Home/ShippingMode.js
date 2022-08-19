//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Button, Divider, IconButton, List} from 'react-native-paper';
import FastShipping from '../../assets/imgs/direct.png';
import PaidShipping from '../../assets/imgs/paid.png';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

// create a component
const ShippingMode = ({navigation, address, cart}) => {
  const [type, setType] = useState(0);

  const currencyFormat = (num) => {
    return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const totalKg = () => {
    return cart.map(item => item.quantity).reduce((prev, next) => prev + next);
  };

  return (
    <View style={styles.container}>
      <List.Item
        left={() => (
          <IconButton
            // color={Colors.red400}
            onPress={null}
            // onPress={minus_qty}
            // style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
            icon="pin"
          />
        )}
        right={() => (
          <Button
            labelStyle={{fontSize: 6}}
            style={{
              height: 25,
              borderRadius: 20,
              marginVertical: 20,
              backgroundColor: '#F4F4F4',
            }}
            mode="outlined">
            Change Address
          </Button>
        )}
        style={{marginVertical: 20}}
        title={address.name}
        description={address.withLagos ? 'within Lagos' : 'outside Lagos'}
        onPress={() => navigation.navigate('addressbook')}
        descriptionStyle={{fontSize: 10, paddingTop: 10}}
      />
      <Divider style={{marginBottom: 20}} />
      <View style={{paddingHorizontal: 15}}>
        {address.withLagos ? (
          <Text style={{fontSize: 16, color: '#7C7C7C'}}>
            Pick a delivery Option for you
          </Text>
        ) : (
          <Text style={{fontSize: 16, color: '#7C7C7C'}}>Package Details</Text>
        )}
        {!address.withLagos ? (
          <Text style={{fontSize: 14, color: '#7C7C7C', marginTop: 20}}>
            Total Delivery weight (kg): {totalKg() * 70 }kg
          </Text>
        ) : null}
      </View>
      {address.withLagos ? (
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View></View>
          <TouchableOpacity onPress={() => setType(0)}>
            <View
              style={{
                ...styles.Gridcontainer,
                backgroundColor: type == 0 ? '#ffffff' : '#FBFBFB',
                borderWidth: type == 0 ? 2 : 0,
              }}>
              <ImageBackground
                source={FastShipping}
                style={{width: 26, height: 20, marginBottom: 10}}
              />
              <Text style={styles.title}>Regular</Text>
              <Text style={styles.time}>Within 24 hours</Text>
              <Text style={styles.subtitle}>Free</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType(1)}>
            <View
              style={{
                ...styles.Gridcontainer,
                backgroundColor: type == 1 ? '#ffffff' : '#FBFBFB',
                borderWidth: type == 1 ? 2 : 0,
              }}>
              <ImageBackground
                source={PaidShipping}
                style={{width: 34, height: 20, marginBottom: 10}}
              />
              <Text style={styles.title}>Fast</Text>
              <Text style={styles.time}>Within 1-2 hours</Text>
              <Text style={styles.subtitle}>Paid</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            ...styles.Gridcontainer,
            // backgroundColor: 'red',
            borderWidth: type == 1 ? 2 : 0,
            marginHorizontal: 20,
            marginTop: 20,
            flexDirection: 'row',
            padding: 20,
          }}>
          <ImageBackground
            source={PaidShipping}
            style={{width: 34, height: 20, marginBottom: 10}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.title}>Outside Lagos</Text>
            <Text style={styles.time}>
              your delivery will take within 1-7 working days
            </Text>
          </View>
        </View>
      )}
      <View
        style={{marginTop: 30, paddingHorizontal: 20, alignItems: 'center'}}>
        <Text style={styles.price}>Estimated Delivery Cost</Text>
        {address.withLagos ?  <Text style={styles.cost}>{currencyFormat(type == 0 ? 0 : 1000)}</Text>
        : <Text style={styles.cost}>{currencyFormat(totalKg() * 3135 )}</Text>}
      </View>
      <View style={{padding: 20, marginTop: 40}}>
        <Button
          mode="contained"
          // loading={loading}
          // disabled={loading}
          // disabled={getsum() == 0}
          style={{
            padding: 5,
            borderRadius: 50,
            marginTop: 10,
            marginBottom: 40,
          }}
          onPress={() => navigation.navigate('checkout')}>
          Continue
        </Button>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Gridcontainer: {
    backgroundColor: '#FBFBFB',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4B70D6',
  },
  title: {
    fontSize: 14,
    color: '#4B70D6',
  },
  subtitle: {
    fontSize: 12,
    color: '#4B70D6',
  },
  time: {
    marginVertical: 10,
    fontSize: 8,
    fontWeight: '200',
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
  },
  cost: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: '500',
  },
});

const mapStateToProps = (state) => {
  return {
    address: state.address.defaultAddress,
    cart: state.cart.data,
  };
};

//make this component available to the app
export default connect(mapStateToProps)(ShippingMode);
