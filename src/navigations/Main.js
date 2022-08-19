//import liraries
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authentication from './Auth';
import AppNavigations from './App';
import {connect} from 'react-redux';
import {
  check_if_skiiped,
  check_if_user_is_onboarded,
} from '../services/onboarding';
import SplashScreen from '../screens/Auth/SplashScreen';
import {check_if_user_has_signed_in} from '../services/authentication';
import UpdateData from '../screens/Auth/UpdateData';
import Navbar from '../components/Navbar';
import Search from '../screens/Home/Search';
import SearchResult from '../screens/Home/SearchResult';
import ListPage from '../screens/Home/ListProduct';
import DetailProduct from '../screens/Home/DetailProduct';
import ViewMydrugStoc from '../screens/Home/ViewOrders';
import Cart from '../screens/Home/Cart';
import OrderDetail from '../screens/Home/OrderDetail';
import OrderSuccess from '../screens/Home/OrderSuccess';
import {View} from 'react-native';
import Support from '../screens/Home/Support';
import About from '../screens/Home/About';
import ChechOut from '../screens/Home/Checkout';
import Statement from '../screens/Home/Statement';
import PaywithTransfer from '../screens/Home/PaywithTransfer';
import PaymentUssd from '../screens/Home/PaymentUssd';
import DrugstocPay from '../screens/Home/DrugstocPay';
import FundAccount from '../screens/Home/FundAccount';
import RepayLoan from '../screens/Home/RepayLoan';
import ApplyLoan from '../screens/Home/ApplyLoan';
import CategoryScreen from '../screens/Home/Category';
import MapLocation from '../screens/Home/MapLocation';
import Addressbook from '../screens/Home/AddressBook';
import ShippingMode from '../screens/Home/ShippingMode';
import AlternativeProduct from '../screens/Home/Alternative';
import CreditPay from '../screens/Home/CreditPay';
import SetTransactionPin from '../screens/Home/SetPin';

const Stack = createSharedElementStackNavigator();

// create a component
const MainNavigation = ({user, loading, autoLogin, auth, update, login}) => {
  useEffect(() => {
    user();
    login();
    autoLogin();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitle: ''}}>
        {auth ? (
          <Stack.Screen
            name="auth"
            component={Authentication}
            options={{headerTransparent: true}}
          />
        ) : !update ? (
          <Stack.Screen
            name="update"
            component={UpdateData}
            options={{header: (props) => <Navbar {...props} transp="#fff" />}}
          />
        ) : (
          <>
            <Stack.Screen
              name="app"
              component={AppNavigations}
              options={{headerTransparent: true}}
            />
            <Stack.Screen
              name="search"
              component={Search}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="result"
              component={SearchResult}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="products"
              component={ListPage}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="detail"
              component={DetailProduct}
              options={{
                headerTransparent: true,
                headerLeft: null,
                gestureEnabled: false,
                cardStyleInterpolator: ({current: {progress}}) => {
                  return {
                    cardStyle: {
                      opacity: progress,
                    },
                  };
                },
              }}
              sharedElementsConfig={(route, otherRoute, showing) => {
                const {data} = route.params;
                return [
                  {
                    id: `item.${data.id}.photo`,
                    animation: 'fade',
                    align: 'center-top',
                    resize: 'stretch',
                  },
                ];
              }}
            />
            <Stack.Screen
              name="mydrugstocdetail"
              component={ViewMydrugStoc}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="cart"
              component={Cart}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="orderdetails"
              component={OrderDetail}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="success"
              component={OrderSuccess}
              options={{headerTransparent: true, headerLeft: null}}
            />
            <Stack.Screen
              name="support"
              component={Support}
              options={{headerTransparent: true, headerLeft: null}}
            />
            <Stack.Screen
              name="about"
              component={About}
              options={{headerTransparent: true, headerLeft: null}}
            />
            <Stack.Screen
              name="checkout"
              component={ChechOut}
              options={{headerTitle: 'Check Out Summary'}}
            />
            <Stack.Screen
              name="maplocation"
              component={MapLocation}
              options={{headerTitle: 'Search for your location'}}
            />
            <Stack.Screen
              name="addressbook"
              component={Addressbook}
              options={{headerTitle: 'Select Your Delivery Location'}}
            />
            <Stack.Screen
              name="shipping"
              component={ShippingMode}
              options={{headerTitle: 'Select Your Delivery Method'}}
            />
            <Stack.Screen
              name="alternative"
              component={AlternativeProduct}
              options={{headerTitle: ''}}
            />
            <Stack.Screen
              name="pinPay"
              component={CreditPay}
              options={{headerTitle: ''}}
            />
            <Stack.Screen
              name="setpin"
              component={SetTransactionPin}
              options={{headerTitle: 'Set your Transaction pin'}}
            />
            <Stack.Screen
              name="Categories"
              component={CategoryScreen}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="transfer"
              component={PaywithTransfer}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="paymentConfirm"
              component={PaymentUssd}
              // options={{ headerTransparent: true, headerLeft: null }}
            />
            <Stack.Screen
              name="drugstocpay"
              component={DrugstocPay}
              options={{headerTitle: 'Drugstoc Pay'}}
            />
            <Stack.Screen
              name="fundaccount"
              component={FundAccount}
              options={{headerTitle: 'Fund Account'}}
            />
            <Stack.Screen
              name="repayLoan"
              component={RepayLoan}
              options={{headerTitle: 'Repay Loan'}}
            />
            <Stack.Screen
              name="applyLoan"
              component={ApplyLoan}
              options={{headerTitle: 'Apply Loan'}}
            />
            <Stack.Screen
              name="document"
              component={UpdateData}
              options={{headerTitle: 'Document'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.isloading,
    auth: state.authentication.is_signout,
    update: state.loading.update_document,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    user: () => dispatch(check_if_user_is_onboarded()),
    autoLogin: () => dispatch(check_if_user_has_signed_in()),
    login: () => dispatch(check_if_skiiped()),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
