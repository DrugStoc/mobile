//import liraries
import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import FastImage from 'react-native-fast-image';
import {
  Badge,
  Button,
  Caption,
  Chip,
  Colors,
  Divider,
  IconButton,
  List,
  Paragraph,
  Searchbar,
  Surface,
  Title,
} from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {SharedElement} from 'react-navigation-shared-element';
import {connect} from 'react-redux';
import Logo from '../../assets/imgs/Logo.png';
import {
  get_manufacturer,
  get_more_products,
  get_products_categories,
  get_recommended_products,
  get_user_cart_item,
} from '../../services/products';

const height = Dimensions.get('screen').height;

let HEADER_MAX_HEIGTH = 50;
let HEADER_MIN_HEIGTH = 0;

// create a component
const Home = ({
  user,
  navigation,
  categories,
  recommended,
  products,
  category,
  manufacturer,
  brand,
  cart,
  load_more,
  cart_data,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const sheetRef = useRef(null);

  const currencyFormat = (num) => {
    return '₦' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const greetings = () => {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      return 'Good Morning ⛅';
    } else if (hours >= 12 && hours < 18) {
      return 'Good Afternoon 🔆';
    } else if (hours >= 18 && hours < 24) {
      return 'Good Evening 🌒';
    } else {
      return;
    }
  };
  const renderHeader = () => (
    <View>
      <List.Item
        title="Account Not Yet Verified"
        description="Please upload your licenses for your account to be verified"
        onPress={() => sheetRef.current.snapTo(2)}
      />
      <Divider />
    </View>
  );

  const ref = React.useRef(null);

  useScrollToTop(ref);

  const renderItem = (data) => (
    <View
      key={data.index}
      style={{width: '49%', marginBottom: 30, paddingStart: 5}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('detail', {data: data.item})}>
        <SharedElement
          id={`item.${data.item.id}.photo`}
          style={{height: 100, width: '100%'}}>
          <FastImage
            source={{uri: data.item.image}}
            style={{height: 100, width: '100%'}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SharedElement>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#F9F8F8',
          padding: 10,
          paddingHorizontal: 20,
          height: 80,
        }}>
        <Text numberOfLines={1} style={{fontSize: 12}}>
          {data.item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{fontSize: 12, fontWeight: '800', marginTop: 10}}>
          {user.is_verified ? currencyFormat(data.item.price) : `₦ XXX.XX`}
        </Text>
        <View>
          {data.item.quantity > 0 ? null : (
            <Text style={{fontSize: 12, marginTop: 7, color: Colors.red300}}>
              Out of stock
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderHeaderItem = () => (
    <View>
      <View style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 0}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>
                Shop by Manufacturers
              </Paragraph>
              <Caption>Swipe to discover all manufacturers</Caption>
            </View>
            <TouchableOpacity
              style={{marginTop: 3}}
              onPress={() =>
                navigation.navigate('search', {
                  name: 'brand',
                  data: brand,
                  manufacturer: true,
                })
              }>
              <Caption style={{color: '#2C4DA7', fontSize: 14}}>
                See All
              </Caption>
            </TouchableOpacity>
          </View>
          <SkeletonContent
            animationType="pulse"
            containerStyle={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 10,
            }}
            isLoading={brand.loading}
            layout={[
              {
                key: 'someId',
                width: 70,
                height: 70,
                marginBottom: 6,
                borderRadius: 70,
              },
              {
                key: 'someId2',
                width: 70,
                height: 70,
                marginBottom: 6,
                borderRadius: 70,
              },
              {
                key: 'someId3',
                width: 70,
                height: 70,
                marginBottom: 6,
                borderRadius: 70,
              },
              {
                key: 'someId4',
                width: 70,
                height: 70,
                marginBottom: 6,
                borderRadius: 70,
              },
              {
                key: 'someId5',
                width: 70,
                height: 70,
                marginBottom: 6,
                borderRadius: 70,
              },
            ]}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              // pagingEnabled={true}
              style={{marginTop: 10}}>
              {brand.data.map((comp, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    navigation.navigate('products', {
                      id: comp.name,
                      comp,
                      manufacturer: true,
                    })
                  }>
                  <View
                    key={i}
                    style={{
                      width: 70,
                      height: 70,
                      borderWidth: 1,
                      borderRadius: 70,
                      padding: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                      borderColor: Colors.grey300,
                    }}>
                    <FastImage
                      source={{uri: comp.image}}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'contain',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SkeletonContent>
        </View>
        <View style={{marginTop: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>
                Shop by Categories
              </Paragraph>
              <Caption>Swipe to discover all categories</Caption>
            </View>
            <TouchableOpacity
              style={{marginTop: 3}}
              onPress={() =>
                navigation.navigate('Categories', {
                  name: 'Categories',
                  data: category,
                })
              }>
              <Caption style={{color: '#2C4DA7', fontSize: 14}}>
                See All
              </Caption>
            </TouchableOpacity>
          </View>
          <SkeletonContent
            animationType="pulse"
            containerStyle={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 10,
            }}
            isLoading={category.loading}
            layout={[
              {key: 'someId6', width: '32%', height: 40, marginBottom: 6},
              {key: 'someId7', width: '32%', height: 40, marginBottom: 6},
              {key: 'someId8', width: '32%', height: 40, marginBottom: 6},
            ]}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled={true}
              style={{marginTop: 10}}>
              {category.data.map((name, i) => (
                <Button
                  key={i}
                  mode="outlined"
                  style={{
                    marginRight: 20,
                  }}
                  onPress={() =>
                    navigation.navigate('products', {id: name.id})
                  }>
                  <Caption>{name.name.toUpperCase()}</Caption>
                </Button>
              ))}
            </ScrollView>
          </SkeletonContent>
        </View>
        <View style={{marginTop: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '70%'}}>
              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>
                All Products
              </Paragraph>
              <Caption>Scroll down to discover all available products</Caption>
            </View>
            {/* <TouchableOpacity
              style={{marginTop: 3}}
              onPress={() =>
                navigation.navigate('products', {
                  name: 'recommended',
                  data: products,
                })
              }>
              <Caption style={{color: '#2C4DA7', fontSize: 14}}>
                See All
              </Caption>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );

  // const renderAppBar = () =>  ()

  useEffect(() => {
    categories();
    recommended();
    manufacturer();
    cart_data();
  }, []);

  return (
    <Surface style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView>
        {/* <View style={{ height: header }}>
					<Appbar.Header style={{ elevation: 0, backgroundColor: 'transparent' }} />
				</View> */}
        <View style={{paddingHorizontal: 20}}>
          <View style={{marginBottom: 20}}>
            {/* <TouchableOpacity
              onPress={() => {
                console.log('clicked');
              }}>
              <Text>Here</Text>
            </TouchableOpacity> */}
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',

                // opacity: opacity,
                // height: headerdisplay
              }}>
              <View style={{width: '60%'}}>
                <Image
                  source={Logo}
                  style={{width: '25%', height: 35, resizeMode: 'contain'}}
                />
                <Paragraph style={{fontWeight: 'bold'}}>
                  {greetings()}
                </Paragraph>
                <Title
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    color: '#2C4DA7',
                    marginBottom: 0,
                  }}>
                  {user.name}
                </Title>
              </View>
              {user.is_verified ? (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {/* <View>
									<View
										style={{
											backgroundColor: 'red',
											width: 10,
											height: 10,
											borderRadius: 10,
											position: 'absolute',
											right: 15,
											top: 10,
											zIndex: 20
										}}
									/>
									<IconButton size={25} icon="bell-outline" />
								</View> */}
                  <View>
                    {cart.length > 0 ? (
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
                        <Badge>{cart.length}</Badge>
                      </View>
                    ) : null}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('cart')}>
                      <IconButton size={25} icon="cart-outline" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <Chip
                    selectedColor={Colors.red400}
                    icon="information"
                    mode="outlined"
                    onPress={() => sheetRef.current.snapTo(1)}>
                    Not Verified
                  </Chip>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('result')}>
              <Searchbar
                numberOfLines={1}
                style={{
                  elevation: 0,
                  borderColor: Colors.grey300,
                  borderWidth: 1,
                  borderRadius: 40,
                }}
                inputStyle={{fontSize: 14}}
                placeholder="Search for any products here"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onFocus={() => navigation.navigate('result')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={products.data}
          style={{paddingHorizontal: 0}}
          numColumns={2}
          ListHeaderComponent={renderHeaderItem}
          renderHeader={renderHeader}
          renderItem={renderItem}
          scrollEventThrottle={30}
          ref={ref}
          // onScroll={event([ { nativeEvent: { contentOffset: { y: y_scroll } } } ], {
          // 	useNativeDriver: false
          // })}
          onEndReached={(e) => load_more(products.next)}
        />
        <View style={{paddingHorizontal: 10}}>
          <SkeletonContent
            animationType="pulse"
            containerStyle={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 10,
              flexWrap: 'wrap',
            }}
            isLoading={products.loading}
            layout={[
              {key: 'someId20', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI1', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI2', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI3', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI4', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI5', width: '49%', height: 190, marginBottom: 6},
              {key: 'someId6', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI7', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI8', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI9', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI10', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI25', width: '49%', height: 190, marginBottom: 6},
              {key: 'someId19', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI11', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI12', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI13', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI14', width: '49%', height: 190, marginBottom: 6},
              {key: 'someI15', width: '49%', height: 190, marginBottom: 6},
            ]}
          />
        </View>
        <BottomSheet
          bottomSheerColor="#FFFFFF"
          ref={sheetRef}
          initialPosition={'0%'} //200, 300
          snapPoints={['50%', '55%', '0%']}
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
          header={renderHeader()}
          // body={renderContent()}
        />
      </SafeAreaView>
    </Surface>
  );
};

const MapStateToProps = (state) => {
  return {
    user: state.user.user,
    category: state.categories,
    products: state.products,
    brand: state.brand,
    cart: state.cart.data,
  };
};

const MapDispatachToProps = (dispatch) => {
  return {
    categories: () => dispatch(get_products_categories()),
    recommended: () => dispatch(get_recommended_products()),
    manufacturer: () => dispatch(get_manufacturer()),
    cart_data: () => dispatch(get_user_cart_item()),
    load_more: (url) => dispatch(get_more_products(url)),
  };
};

//make this component available to the app
export default connect(MapStateToProps, MapDispatachToProps)(Home);
