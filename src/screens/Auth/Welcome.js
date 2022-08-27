//import liraries
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Caption, Surface} from 'react-native-paper';
import Logo from '../../assets/imgs/Logo.png';
import WelcomeDesign from '../../assets/imgs/welcome.png';

// create a component
const Welcome = ({navigation}) => {
  return (
    <Surface style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView>
        <View style={{height: '80%'}}>
          <Image
            source={Logo}
            style={{
              height: '6%',
              resizeMode: 'contain',
              alignSelf: 'center',
              marginBottom: 10,
            }}
          />
          <Image
            source={WelcomeDesign}
            style={{
              height: '80%',
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <View style={{alignItems: 'center', marginTop: -20}}>
            <Text style={styles.text}>
              Welcome to Nigeria's Largest Pharmacy Partner
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 30, marginTop: 10}}>
          <Button
            style={{padding: 5, borderRadius: 50}}
            mode="contained"
            onPress={() => navigation.navigate('login')}>
            Log in
          </Button>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Caption style={{marginTop: 15}}>NEW TO DRUGSTOC? </Caption>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Caption
                style={{marginTop: 15, color: '#4B70D6', fontWeight: 'bold'}}>
                REGISTER
              </Caption>
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
    justifyContent: 'space-between',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    // color: '#fff',
    fontSize: 16,
    width: '70%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//make this component available to the app
export default Welcome;
