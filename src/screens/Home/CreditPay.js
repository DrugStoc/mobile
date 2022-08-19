//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Button,
  Caption,
  Card,
  Surface,
  TextInput,
  Title,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  resend_otp_again,
  verify_a_new_user_has_a_valid_otp,
} from '../../services/authentication';
import {connect} from 'react-redux';
import {create_order} from '../../services/products';

// create a component
const CreditPay = ({
  navigation,
  verify,
  auth_data,
  createOrder,
  items,
  phone_no,
  resend_otp,
}) => {
  const {control, handleSubmit, errors} = useForm();

  const create = () => {
    createOrder(items.data).then(() => {
      navigation.navigate('success');
    });
  };

  const onSubmit = (data) => {
    let payload = {
      otp: data.otp,
    };
    // console.log(payload.);
    if (payload.otp !== '1234') {
      Alert.alert('Error', 'Invalid Pin');
    } else {
      createOrder(items.data).then(() => {
        navigation.navigate('success');
      });

      // create()
      // verify(payload);
    }
  }

  const [otp, setOtp] = useState(0);

  return (
      <Surface style={{flex: 1}}>
        <SafeAreaView>
          <View
            style={{
              height: '100%',
              paddingHorizontal: 30,
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <View>
                <Title style={{fontWeight: 'bold', color: '#2C4DA7'}}>
                  {'Enter you pin to Complete Purchase'}
                </Title>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Caption
                  style={{
                    marginTop: 9,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  By entering your secure pin, enable us confirm your purchase
                  using credit your available for.
                </Caption>
              </View>
            </View>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <OTPInputView
                  style={{width: '60%', height: 70}}
                  pinCount={4}
                  code={value}
                  onBlur={onBlur}
                  onCodeChanged={(value) => onChange(value)}
                  onCodeFilled={(data) => {
                    let payload = {
                      otp: data,
                      email: auth_data.email,
                      phone_no: phone_no || auth_data.phone_no,
                      password: auth_data.password,
                    };
                    //   verify(payload);
                  }}
                  autoFocusOnLoad
                  secureTextEntry
                  codeInputFieldStyle={{
                    borderRadius: 15,
                    marginRight: 7,
                    color: '#000',
                  }}
                />
              )}
              name="otp"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.phone_no && (
              <Caption style={{color: '#EB001B'}}>
                Phone number is required
              </Caption>
            )}
            <Button
              style={{
                padding: 5,
                borderRadius: 50,
                marginTop: 20,
                marginBottom: 20,
              }}
              mode="contained"
              onPress={handleSubmit(onSubmit)}>
              Make Payment
            </Button>
          </View>
        </SafeAreaView>
      </Surface>
    );
};

const mapStateToProps = (state) => {
  return {
    auth_data: state.authentication.verify_data,
    phone_no: state.authentication.phone_no,
    items: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (payload) => dispatch(verify_a_new_user_has_a_valid_otp(payload)),
    resend_otp: (payload) => dispatch(resend_otp_again(payload)),
    createOrder: (payload) => dispatch(create_order(payload)),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CreditPay);
