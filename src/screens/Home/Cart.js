//import liraries
import React, {useRef} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {
  Button,
  Colors,
  Divider,
  List,
  Paragraph,
  Surface,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import CartList from '../../components/CartList';
import {create_order} from '../../services/products';
const AnimatedView = Animated.View;

let fall = new Animated.Value(1);

const height = Dimensions.get('screen').height;

const width = Dimensions.get('screen').width;

// create a component
const Cart = ({navigation, items, createOrder, loading}) => {
  const create = () => {
    createOrder(items.data).then(() => {
      navigation.navigate('success');
    });
  };

  const renderContent = () => (
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
      <Divider />
      <List.Item
        title="Delivery (fee may apply)"
        right={() => (
          <Text style={{marginTop: 10, fontSize: 14}}>
            {getsum() > 50000 ? currencyFormat(0) : currencyFormat(0)}
          </Text>
        )}
      />
      <Divider />
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
      <Divider />
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
      <Paragraph style={{textAlign: 'center', color: Colors.red500}}>
        Hi cnnnnnnnnnnnnnnnnnnn Pharmacy, you delivery location is currently out
        of DrugStoc free delivery zone. Shipment may attract delivery fee. Our
        Customer service will contact you when your orders has been confirmed
      </Paragraph>
      {/* <Paragraph style={{textAlign: 'center'}}>Your account is eligible for ”DrugStoc Credit"</Paragraph> */}
      <Button
        mode="contained"
        style={{borderRadius: 50, marginTop: 15}}
        onPress={() => {
          sheetRef.current.snapTo(2);
          create();
        }}>
        Pay Later
      </Button>
    </View>
  );

  const renderHeader = () => (
    <View>
      <List.Item
        title="Shipping Address"
        onPress={() => sheetRef.current.snapTo(2)}
      />
      <Divider />
    </View>
  );

  const sheetRef = useRef(null);
  const currencyFormat = (num) => {
    return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
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

  function getsum() {
    return getItems().reduce((a, b) => a + b.price * b.quantity, 0);
  }

  function handleOnRedirect(e) {
    console.log(e);
    sheetRef.current.snapTo(2);
    if (e.status == 'success') {
      create();
    }
  }

  const renderItem = (data) => (
    <CartList key={data.index} id={data.index} data={data.item} />
  );
  // const renderFooter = () => (

  // );
  const renderHeaderComp = () => (
    <View style={{backgroundColor: '#fff'}}>
      <List.Section>
        <List.Subheader style={{backgroundColor: '#F4F4F4'}}>
          {items.data.length} Items in your cart{' '}
          {getsum() > 0 ? 'Total Cost:' + currencyFormat(getsum()) : null}
        </List.Subheader>
      </List.Section>
    </View>
  );

  return (
    <Surface style={{flex: 1}}>
      <SafeAreaView>
        <View>
          <FlatList
            style={{marginBottom: 180}}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            data={items.data}
            renderItem={renderItem}
            ListHeaderComponent={renderHeaderComp}
            ItemSeparatorComponent={() => <Divider />}
          />
          <Surface
            style={{
              paddingHorizontal: 20,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              elevation: 0,
            }}>
            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              // disabled={getsum() == 0}
              style={{
                padding: 5,
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 40,
              }}
              // onPress={() => navigation.navigate('shipping')}
              onPress={() => navigation.navigate('checkout')}>
              Check Out
            </Button>
          </Surface>
        </View>
      </SafeAreaView>
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={sheetRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['80%', '70%', '0%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        onPress={() => sheetRef.current.snapTo(0)}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={renderHeader()}
        body={renderContent()}
      />
    </Surface>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart,
    loading: state.loading.uiloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (payload) => dispatch(create_order(payload)),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
