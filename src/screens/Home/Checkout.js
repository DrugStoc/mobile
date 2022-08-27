//import liraries
import React, {useRef, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Colors,
  Divider,
  List,
  Paragraph,
  Surface,
  TextInput,
} from 'react-native-paper';

import BottomSheet from 'react-native-bottomsheet-reanimated';

import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {connect} from 'react-redux';
import {create_order} from '../../services/products';

// create a component
const ChechOut = ({navigation, user, createOrder, items, loading}) => {
  console.log(createOrder);
  const sheetRef = useRef(null);
  const payRef = useRef(null);
  const pay2Ref = useRef(null);
  const [ussd, setUssd] = useState(false);
  const [drugstocPayLoading, setDrugstocPayLoading] = useState(false);
  const [payNowLoading, setPayNowLoading] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [bankName, setbankNAme] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const getItems = () => {
    var mapData = items.data.map((ele, i) => ({
      id: ele.id,
      name: ele.name,
      image: ele.image,
      ids: ele.ids,
      quantity: ele.quantity > ele.inStore ? ele.inStore : ele.quantity,
      inStore: ele.inStore,
      price: ele.price,
    }));
    let resp = mapData.filter((e) => e.inStore > 0);
    return resp;
  };

  const create = (callback) => {
    createOrder(getItems()).then(() => {
      navigation.navigate('success');
      callback();
    });
  };

  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  function getsum() {
    let res = getItems().reduce((a, b) => a + b.price * b.quantity, 0);
    return res;
  }

  const ussd_dail = (bank) => {
    switch (bank) {
      case 'GTBank':
        navigation.navigate('paymentConfirm');
      // return Linking.openURL(`tel:*737*2*${getsum()}*0078495671#`)
      case 'First Bank':
        return Linking.openURL(`tel:*894*${getsum()}*0078495671#`);
      case 'Uba':
        return Linking.openURL(`tel:*919*4*0078495671*${getsum()}#`);
      case 'Access Bank':
        return Linking.openURL(`tel:*901*2*${getsum()}*0078495671#`);
      case 'Zenith Bank':
        return Linking.openURL(`tel:*966*${getsum()}*0078495671#`);
      case 'Union Bank':
        return Linking.openURL(`tel:*826*2*${getsum()}*0078495671#`);
      case 'Sterling Bank':
        return Linking.openURL(`tel:*822*5*${getsum()}*0078495671#`);
      default:
        return;
    }
  };

  const renderHeader = () => (
    <View>
      <Text
        style={{
          marginBottom: 30,
          marginTop: 10,
          fontSize: 16,
          fontWeight: '500',
        }}>{`How to make ussd Payment.

Step 1: Select your Bank
Step 2: Choose Access Bank
Step 3: Confirm Payment`}</Text>
      <List.Item title="GTBank" onPress={() => ussd_dail('GTBank')} />
      <Divider />
      <List.Item title="First Bank" onPress={() => ussd_dail('First Bank')} />
      <Divider />
      <List.Item title="Uba" onPress={() => ussd_dail('Uba')} />
      <Divider />
      <List.Item title="Access Bank" onPress={() => ussd_dail('Access Bank')} />
      <Divider />
      <List.Item title="Zenith Bank" onPress={() => ussd_dail('Zenith Bank')} />
      <Divider />
      <List.Item title="Union Bank" onPress={null} />
      <Divider />
      <List.Item
        title="Sterling Bank"
        onPress={() => ussd_dail('Sterling Bank')}
      />
      <Divider />
    </View>
  );

  const renderHeader3 = () => (
    <View style={{paddingHorizontal: 30}}>
      <Button
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={() => paystackWebViewRef.current.startTransaction()}>
        Pay with card
      </Button>
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={() => {
          setUssd(false);
          sheetRef.current.snapTo(1);
          payRef.current.snapTo(2);
        }}>
        Pay with Transfer
      </Button>
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={() => {
          setUssd(true);
          sheetRef.current.snapTo(1);
          payRef.current.snapTo(2);
        }}>
        Pay with Ussd
      </Button>
    </View>
  );
  const renderHeader4 = () => (
    <View style={{paddingHorizontal: 30}}>
      {/* <Button
				mode="contained"
				style={{ borderRadius: 50, marginTop: 15 }}
				onPress={() => paystackWebViewRef.current.startTransaction()}
			>
				Pay with card
			</Button> */}
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={create}>
        Pay with DrugStoc Credit
      </Button>

      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        // disabled
        style={{borderRadius: 50, marginTop: 15}}
        onPress={() => {
          setUssd(true);
          sheetRef.current.snapTo(1);
        }}>
        Pay with your wallet
      </Button>
      <Text
        style={{
          textAlign: 'center',
          padding: 5,
          color: Colors.red500,
          fontSize: 12,
        }}>
        Insufficient Fund In Your Wallet (NGN 0.00)
      </Text>
    </View>
  );

  const renderHeader2 = () => (
    <View style={{padding: 20}}>
      <Text
        style={{
          marginBottom: 30,
        }}>{`Kindly Transfer into the Drugstoc account number and fill the details below to verify your transaction.

DrugStoc E-hub Details

Account Number: 0078495671
Bank Name: Access Bank`}</Text>
      <TextInput
        value={accountName}
        onChangeText={setAccountName}
        label="Acount Name"
      />
      <TextInput
        value={bankName}
        onChangeText={setbankNAme}
        label="Bank Name"
      />
      <TextInput
        value={accountNumber}
        maxLength={11}
        onChangeText={setAccountNumber}
        label="Acount Number"
      />
      <Button
        loading={loading}
        disabled={
          loading |
          (accountNumber.length < 11) |
          (bankName == '') |
          (accountName == '')
        }
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={create}>
        Pay With Transfer
      </Button>
    </View>
  );

  const currencyFormat = (num) => {
    // return num;
    return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <Surface style={{flex: 1}}>
      <Paystack
        paystackKey="pk_live_45ee06a67470f003a29bacea44b2117e90c0fec9"
        billingEmail={user.email}
        amount={getsum()}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          create();
        }}
        ref={paystackWebViewRef}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View>
          <List.Item title="Shipping Address" />
          {user.location != 'lagos' ? (
            <View
              style={{
                margin: 16,
                padding: 10,
                borderRadius: 12,
                backgroundColor: Colors.red100,
              }}>
              <Paragraph style={{textAlign: 'justify'}}>
                Hi {user.name} Pharmacy, your delivery location is currently out
                of DrugStoc’s free delivery zone. Shipment may attract delivery
                fees. Our Customer service will contact you when your order has
                been confirmed.
              </Paragraph>
            </View>
          ) : null}
          <Divider />
          <List.Item
            // onPress={() => navigation.navigate('shipping')}
            title="Delivery"
            right={() => (
              <Text style={{marginTop: 15, fontSize: 14}}> Select Method </Text>
            )}
          />
          <Divider />
          <List.Item
            title="Promo Code"
            right={() => (
              <Text style={{marginTop: 15, fontSize: 14}}> Add Coupon </Text>
            )}
          />
          <Divider />
        </View>

        {/* 
          <List.Item title="Delivery Options" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.grey400,
                  borderRadius: 7,
                  width: 90,
                  height: 90,
                  alignItems: 'center'
                }}
              >
                <Image source={Logo1} style={{ width: '35%', height: 50, resizeMode: 'contain' }} />
                <Caption>3-5days</Caption>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.grey400,
                  borderRadius: 7,
                  width: 90,
                  height: 90,
                  alignItems: 'center'
                }}
              >
                <Image source={Logo2} style={{ width: '35%', height: 50, resizeMode: 'contain' }} />
                <Caption>3-5days</Caption>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.grey400,
                  borderRadius: 7,
                  width: 90,
                  height: 90,
                  alignItems: 'center'
                }}
              >
                <Image source={Logo3} style={{ width: '35%', height: 50, resizeMode: 'contain' }} />
                <Caption>3-5days</Caption>
              </View>
            </View>
          <Divider /> 
        */}
        <View
          style={{
            padding: 16,
            height: 450,
          }}>
          <List.Item
            title="Item"
            right={() => (
              <Text style={{marginTop: 15, fontSize: 14}}>
                {currencyFormat(getsum())}
              </Text>
            )}
          />
          {/* <Divider /> */}
          <List.Item
            title="Delivery (fee may apply)"
            right={() => (
              <Text style={{marginTop: 10, fontSize: 14}}>
                {getsum() > 50000 ? currencyFormat(0) : currencyFormat(0)}
              </Text>
            )}
          />
          {/* <Divider /> */}
          <List.Item
            title="Total Price"
            titleStyle={{fontWeight: '600', fontSize: 18}}
            right={() => (
              <Text style={{marginTop: 5, fontSize: 18, fontWeight: '600'}}>
                {getsum() > 50000
                  ? currencyFormat(0 + getsum())
                  : currencyFormat(0 + getsum())}
              </Text>
            )}
          />
          {/* <Divider /> */}
          {/* <PayWithFlutterwave
				onRedirect={handleOnRedirect}
				disabled
				options={{
					tx_ref: JSON.stringify(Date.now() + Math.random(10)),
					authorization: 'FLWPUBK-dac71dcb2884cfa4d397b2fbbc33abb7-X',
					customer: {
						email: 'customer-email@example.com'
					},
					amount: getsum() > 50000 ? getsum() : 1000 + getsum(),
					currency: 'NGN',
					payment_options: 'card'
				}}
				customButton={(props) => (
					<TouchableOpacity onPress={props.onPress} isBusy={props.isInitializing} disabled={props.disabled}>
						<Button mode="contained" style={{ padding: 5, borderRadius: 50, marginTop: 15 }} disabled>
							Pay now
						</Button>
					</TouchableOpacity>
				)}
			/> */}
          {/* <Paragraph style={{textAlign: 'center'}}>Your account is eligible for ”DrugStoc Credit"</Paragraph> */}
          {user.location != 'lagos' ? (
            <Button
              mode="contained"
              style={{borderRadius: 50, marginTop: 15}}
              onPress={() => payRef.current.snapTo(1)}>
              Pay Now
            </Button>
          ) : (
            <View>
              {/* <Button
							mode="contained"
							style={{ borderRadius: 50, marginTop: 15 }}
							// onPress={() => paystackWebViewRef.current.startTransaction()}
							onPress={() => pay2Ref.current.snapTo(1)}
						>
							Pay With DrugStocPay
						</Button> */}
              <Button
                loading={drugstocPayLoading}
                disabled={drugstocPayLoading}
                mode="outlined"
                uppercase={false}
                style={{borderRadius: 50, marginTop: 15}}
                // onPress={() => navigation.navigate('pinPay')}
                onPress={() => {
                  setDrugstocPayLoading(true);
                  create(() => {
                    setDrugstocPayLoading(false);
                  });
                }}>
                Pay With DrugStocPay
              </Button>
            </View>
          )}

          <View>
            <Button
              loading={loading}
              disabled={loading}
              // mode="contained"
              labelStyle={{color: '#FFF'}}
              color={'#ff0000'}
              style={{
                borderRadius: 50,
                marginTop: 15,
                backgroundColor: '#2C4DA7',
              }}
              onPress={() => {
                payRef.current.snapTo(1);
              }}>
              Pay Now
            </Button>
          </View>
        </View>
      </View>
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={sheetRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['75%', '90%', '0%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        onPress={() => sheetRef.current.snapTo(2)}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={ussd ? renderHeader() : renderHeader2()}
        // body={renderContent()}
      />
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={payRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['75%', '40%', '0%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        onPress={() => payRef.current.snapTo(2)}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        // header={renderHeader3()}
        body={renderHeader3()}
      />
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={pay2Ref}
        initialPosition={'0%'} //200, 300
        snapPoints={['75%', '40%', '0%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        onPress={() => pay2Ref.current.snapTo(2)}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        // header={renderHeader3()}
        body={renderHeader4()}
      />
    </Surface>
  );
};

// define your styles
const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#2c3e50',
  // },
});

const MapStateToProps = (state) => {
  return {
    items: state.cart,
    user: state.user.user,
    loading: state.loading.uiloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (payload) => dispatch(create_order(payload)),
  };
};

//make this component available to the app
export default connect(MapStateToProps, mapDispatchToProps)(ChechOut);
