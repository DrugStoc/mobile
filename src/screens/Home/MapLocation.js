import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { addToAddressBook } from '../../services/products';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    Geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
      // console.log(position);
    });
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation
          showsMyLocationButton
          zoomControlEnabled
          showsScale
          region={this.state.region}></MapView>
          {/* <View style={{padding: 0}}> */}
          <GooglePlacesAutocomplete
          placeholder="Search For Delivery Location"
          // currentLocation
          styles={{
            container:{
              padding: 20,
              shadowOpacity: .3,
              shadowRadius: 12
            }
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(details);
            let payload = {
              name: data.description,
              withLagos: true
            }
            // console.log(data);
            console.log(payload);
            this.props.addADD(payload);
            this.props.navigation.pop() 
          }}
          query={{
            key: 'AIzaSyBsfz_cNlv85hIspQlggF4hWjGGSYMp2BY',
            language: 'en', 
            components: 'country:NG'
          }}
        />
          {/* </View> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addADD: payload => dispatch(addToAddressBook(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapLocation)