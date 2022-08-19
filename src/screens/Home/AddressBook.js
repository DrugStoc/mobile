//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Colors, Divider, IconButton, List} from 'react-native-paper';
import { connect } from 'react-redux';
import { setdefaultAddress } from '../../services/products';

// create a component
const Addressbook = ({navigation, address, setAdd}) => {
  const LocationsList = (params, index) => (
    <List.Item
        key={index}
        left={() => <IconButton
            // color={Colors.red400}
            // onPress={() => {setAdd(params.item)}}
            // onPress={minus_qty}
            // style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
            icon="pin"
        />}
      onPress={() => setAdd(params.item)}
      title={params.item.name}
      description={params.item.withLagos ? "with lagos" : 'outside Lagos'}
      descriptionStyle={{fontSize: 10, paddingTop: 10}}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={address}
        ItemSeparatorComponent={Divider}
        keyExtractor={address.name}
        renderItem={LocationsList}
      />
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <Button
            style={{padding: 5, borderRadius: 50, marginTop: 20}}
            mode="outlined"
            onPress={() => navigation.navigate('maplocation')}>
            Add Address
          </Button>
          <Button
            style={{padding: 5, borderRadius: 50, marginTop: 20}}
            mode="contained"
            onPress={() => navigation.pop()}>
            Save Changes
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#ffffff'
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    // flex: 1, // pushes the footer to the end of the screen
    height: 180,
  },
});

const mapStateToProps = state => {
    return {
        address: state.address.address
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdd: payload => dispatch(setdefaultAddress(payload))
    }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Addressbook);
