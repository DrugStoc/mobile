//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {
  Appbar,
  Badge,
  Button,
  Caption,
  Colors,
  Divider,
  IconButton,
  List,
  Surface,
  Title,
} from 'react-native-paper';
import connect from 'react-redux/lib/connect/connect';
import {add_item_to_cart} from '../../services/products';
import * as Animatable from 'react-native-animatable';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import ProductList from '../../components/ProductList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { urlendPoint } from '../../utils/api';

// create a component
const DetailProduct = ({navigation, route, add_cart, cartItem, user}) => {
  let data = route.params.data;

  const already_in_cart = () => {
    let item = cartItem.data.filter((e) => e.ids == data.id);
    if (item.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const Empty = () => (
    <View
      style={{
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconButton icon="magnify" color="#2C4DA7" size={100} onPress={null} />
      <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 20}}>
        No Alternative result
      </Text>
      <Text>Sorry, we couldn’t find result</Text>
    </View>
  );

  const [expanded, setExpanded] = useState(true);
  const [count, setCount] = useState(1);
  const [alt, setAlt] = useState([]);

  const handlePress = () => setExpanded(!expanded);

  const currencyFormat = (num) => {
    return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const add_qty = () => {
    let num = +count + 1;
    if (data.quantity >= num) {
      setCount(num);
    }
    if (data.quantity <= num) {
      Alert.alert(
        'Alert!',
        `Sorry, you cannot add more than ${data.quantity} ${
          data.quantity > 1 ? 'units' : 'unit'
        } of this selected product to your cart`,
      );
    }
  };

  const minus_qty = () => {
    if (count > 1) {
      let num = +count - 1;
      console.log(num);
      setCount(num);
    }
  };

  const add_to_cart = () => {
    let payload = {
      name: data.name,
      image: data.image,
      ids: data.id,
      quantity: count,
      price: data.price,
    };
    add_cart(payload);
  };

  

  const search_alternative = async () => {
    let logged_in_user = await AsyncStorage.getItem('token');
    await axios
      .get(`${urlendPoint}/api/products/alternate-products?products=${data.composition}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${logged_in_user}`,
        },
      })
      .then((resp) => {
        setAlt(resp.data.results)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
	  search_alternative()
  }, [])

  return (
    <Surface style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'transparent'}}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="" subtitle={''} />
        <View>
          {cartItem.data.length > 0 ? (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                position: 'absolute',
                right: 5,
                top: 0,
                zIndex: 20,
              }}>
              <Badge>{cartItem.data.length}</Badge>
            </View>
          ) : null}
          <IconButton
            size={25}
            onPress={() => navigation.navigate('cart')}
            icon="cart-outline"
          />
        </View>
      </Appbar.Header>
      <ImageHeaderScrollView
        maxHeight={300}
        minHeight={20}
        showsVerticalScrollIndicator={false}
        // minOverlayOpacity={0}
        // maxOverlayOpacity={0}
        renderHeader={() => (
          <SharedElement
            id={`item.${data.id}.photo`}
            style={{
              height: 300,
              width: '100%',
              marginTop: 0,
              resizeMode: 'contain',
            }}>
            <FastImage
              source={{uri: data.image}}
              style={{height: 300, width: '100%', paddingVertical: 50}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </SharedElement>
        )}>
        <TriggeringView onHide={() => console.log('ass')}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            <Animatable.View
              animation="slideInUp"
              style={{paddingHorizontal: 12}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Title>{data.name}</Title>
                  <Caption>{data.description}</Caption>
                </View>
                <IconButton
                  icon="heart-outline"
                  color={Colors.grey600}
                  size={28}
                  onPress={() => console.log('Pressed')}
                />
              </View>
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 30,
                }}>
                {data.quantity > 0 ? (
                  <View style={{flexDirection: 'row'}}>
                    <IconButton
                      color={Colors.grey900}
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: Colors.grey900,
                      }}
                      icon="minus"
                      onPress={minus_qty}
                    />
                    {/* <TextInput
										style={{ paddingHorizontal: 10, paddingVertical: 2 }}
										placeholder={JSON.stringify(count)}
									/> */}
                    <Title style={{paddingHorizontal: 5, paddingVertical: 8}}>
                      {JSON.stringify(count)}
                    </Title>
                    <IconButton
                      color={Colors.grey900}
                      onPress={add_qty}
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: Colors.grey900,
                      }}
                      icon="plus"
                    />
                  </View>
                ) : (
                  <Badge style={{paddingHorizontal: 20}}>Out of stock</Badge>
                )}
                <View
                  style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      fontSize: 19,
                    }}>
                    {user.is_verified
                      ? currencyFormat(parseFloat(data.price))
                      : `₦ XXX.XX`}
                  </Text>
                </View>
              </View>
              <Divider />
              <List.Accordion
                style={{paddingHorizontal: 0}}
                title="Compostition"
                expanded={expanded}
                onPress={handlePress}>
                <Caption style={{paddingHorizontal: 10}}>
                  {data.composition}
                </Caption>
              </List.Accordion>
              <Divider />
              <List.Accordion style={{paddingHorizontal: 0}} title="Category">
                <Caption style={{paddingHorizontal: 10}}>
                  {data.category}
                </Caption>
              </List.Accordion>
              <Divider />
              <List.Accordion
                style={{paddingHorizontal: 0}}
                title="Manufacturer">
                <Caption style={{paddingHorizontal: 10}}>
                  {data.manufacturer}
                </Caption>
              </List.Accordion>
              <Divider style={{marginBottom: 30}} />
              <List.Subheader style={{backgroundColor: '#F4F4F4'}}>
                ALL SUGGESTED RESULT
              </List.Subheader>
              <FlatList
                data={alt.filter((item) => item.id !== data.id)}
                // style={{height: height-270}}
                ListEmptyComponent={() => <Empty />}
                renderItem={(data) => (
                  <ProductList
                    key={data.index}
                    verified={user.is_verified}
                    data={data.item}
                    navigation={navigation}
                  />
                )}
              />
            </Animatable.View>
          </ScrollView>
        </TriggeringView>
      </ImageHeaderScrollView>
      {data.quantity > 0 ? (
        <Surface style={{height: 80, paddingHorizontal: 12, elevation: 0}}>
          <Button
            disabled={!user.is_verified || already_in_cart()}
            mode="contained"
            style={{marginTop: 20, borderRadius: 50, padding: 5}}
            onPress={add_to_cart}>
            {!user.is_verified
              ? 'DISABLED'
              : already_in_cart()
              ? 'Added to cart'
              : 'Add to Cart'}
          </Button>
        </Surface>
      ) : null}
      <SafeAreaView />
      {/* <SafeAreaView>
				<Appbar.Header style={{ backgroundColor: 'transparent' }}>
					<Appbar.BackAction onPress={navigation.goBack} />
					<Appbar.Content title="" subtitle={''} />
					<Appbar.Action icon="share-variant" onPress={() => {}} />
				</Appbar.Header>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ paddingHorizontal: 12 }}>
					<SharedElement id={`item.${data.id}.photo`} style={{ height: 300, width: '100%', resizeMode: 'contain' }}>
						<FastImage
							source={{ uri: data.image }}
							style={{ height: 300, width: '100%', resizeMode: 'contain' }}
							resizeMode={FastImage.resizeMode.contain}
						/>
					</SharedElement>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View>
								<Title>{data.name}</Title>
								<Caption>{data.description}</Caption>
							</View>
							<IconButton
								icon="heart-outline"
								color={Colors.grey600}
								size={28}
								onPress={() => console.log('Pressed')}
							/>
						</View>
						<View
							style={{
								paddingTop: 20,
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginBottom: 30
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<IconButton
									color={Colors.grey400}
									style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
									icon="minus"
									onPress={minus_qty}
								/>
								<TextInput
									style={{ paddingHorizontal: 10, paddingVertical: 2 }}
									placeholder={JSON.stringify(count)}
								/>
								<IconButton
									color={Colors.grey400}
									onPress={add_qty}
									style={{ borderWidth: 1, borderRadius: 0, borderColor: Colors.grey400 }}
									icon="plus"
								/>
							</View>
							<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
								<Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 19 }}>
									{currencyFormat(parseFloat(data.price))}
								</Text>
							</View>
						</View>
						<Divider />
						<List.Accordion
							style={{ paddingHorizontal: 0 }}
							title="Indication"
							expanded={expanded}
							onPress={handlePress}
						>
							<Caption style={{ paddingHorizontal: 10 }}>{data.composition}</Caption>
						</List.Accordion>
						<Divider />
						<List.Accordion style={{ paddingHorizontal: 0 }} title="Category">
							<Caption style={{ paddingHorizontal: 10 }}>{data.category}</Caption>
						</List.Accordion>
						<Divider />
						<List.Accordion style={{ paddingHorizontal: 0 }} title="Manufacturer">
							<Caption style={{ paddingHorizontal: 10 }}>{data.manufacturer}</Caption>
						</List.Accordion>
						<Divider />
						<Button
							disabled={already_in_cart()}
							mode="contained"
							style={{ marginTop: 20, borderRadius: 50, padding: 5 }}
							onPress={add_to_cart}
						>
							{already_in_cart() ? 'Added to cart' : 'Add to Cart'}
						</Button>
					</View>
				</ScrollView>
			</SafeAreaView> */}
    </Surface>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_cart: (payload) => dispatch(add_item_to_cart(payload)),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
