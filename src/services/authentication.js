import AsyncStorage from '@react-native-async-storage/async-storage';
import axois from 'axios';
import {Alert} from 'react-native';
import {
  resend_otp,
  sign_in,
  sign_out,
  skip_for_now,
  verify_account,
} from '../store/action/auth.action';
import {
  ui_start_loading,
  ui_stop_loading,
} from '../store/action/loading.action';
import {get_credit, get_user} from '../store/action/user.action';
import {urlendPoint} from '../utils/api';

export const login_user_to_app = (payload) => {
  return async (dispatch) => {
    dispatch(ui_start_loading());
    await axois
      .post(`${urlendPoint}/api/login/`, payload)
      .then((resp) => {
        AsyncStorage.setItem('token', resp.data.token);
        // AsyncStorage.setItem('token', "387cf949f19b538576629234f5310e4cf99bd9ff");
        dispatch(ui_stop_loading());
        dispatch(sign_in());
      })
      .catch((err) => {
        dispatch(ui_stop_loading());
        console.log(err, err.response);
        Alert.alert(
          'Some thing went wrong',
          'Incorrect username or password. Please check to be sure you have the correct details.',
        );
      });
  };
};

export const register_a_new_user_to_app = (payload) => {
  let data = '234' + payload.phone_no.slice(1);
  payload.phone_no = data;
  return async (dispatch) => {
    dispatch(ui_start_loading());
    await axois
      .post(`${urlendPoint}/api/register`, payload)
      .then((resp) => {
        dispatch(ui_stop_loading());
        dispatch(verify_account(payload));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(ui_stop_loading());
        Alert.alert('Something went wrong', err.response.data.message);
      });
  };
};

export const resend_otp_again = (payload) => {
  let data = '234' + payload.new_phone.slice(1);
  payload.new_phone = data;
  return async (dispatch) => {
    dispatch(ui_start_loading());
    await axois
      .post(`${urlendPoint}/api/resend-otp/`, payload)
      .then((resp) => {
        dispatch(ui_stop_loading());
        dispatch(resend_otp(payload));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(ui_stop_loading());
        Alert.alert(
          'Something went wrong',
          err.response.data.message || 'Failed to send Otp',
        );
      });
  };
};

export const verify_a_new_user_has_a_valid_otp = (payload) => {
  return async (dispatch) => {
    await axois
      .post(`${urlendPoint}/api/verify/`, payload)
      .then((resp) => {
        console.log(resp.data.message);
        AsyncStorage.setItem('token', resp.data.token);
        dispatch(sign_in());
      })
      .catch((err) => {
        Alert.alert('Something went wrong', err.response.data.message);
        console.log(err.response);
      });
  };
};

export const check_if_user_has_signed_in = () => {
  return async (dispatch) => {
    let logged_in_user = await AsyncStorage.getItem('token');
    if (logged_in_user) {
      dispatch(sign_in());
    } else {
      dispatch(sign_out());
      return;
    }
  };
};

export const getting_users_profile = () => {
  return async (dispatch) => {
    let logged_in_user = await AsyncStorage.getItem('token');
    await axois
      .get(`${urlendPoint}/api/user/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${logged_in_user}`,
        },
      })
      .then((resp) => {
        console.log('user data fetched');
        console.log('====================================');
        console.log(resp.data);
        console.log('====================================');
        dispatch(get_user(resp.data));
        if (resp.data.is_verified) {
          dispatch(skip_for_now());
        }
      })
      .catch((err) => {
        console.log(err.response, err);
      });
  };
};

export const getting_users_profile_account = () => {
  return async (dispatch) => {
    let logged_in_user = await AsyncStorage.getItem('token');
    await axois
      .get(`${urlendPoint}/api/products/user_profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${logged_in_user}`,
        },
      })
      .then((resp) => {
        // console.log(resp)
        dispatch(get_credit(resp.data));
      })
      .catch((err) => {
        console.log(err.response, err);
      });
  };
};

export const upload_user_licences = (payload) => {
  return async (dispatch) => {
    // console.log('payload');
    // console.log(payload);
    dispatch(ui_start_loading());
    let logged_in_user = await AsyncStorage.getItem('token');
    await axois
      .post(`${urlendPoint}/api/documents/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${logged_in_user}`,
        },
      })
      .then((resp) => {
        if (resp.data.status == 200) {
          let text =
            resp.data.message.length > 0
              ? resp.data.message
              : 'Your document has been uploaded successfuly';
          Alert.alert(text, '', [
            {
              text: 'Ok',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
          dispatch(getting_users_profile());
          // console.log('====================================');
          // console.log(resp.data);
          // console.log('====================================');
          // // dispatch(get_user());
          // getting_users_profile();
        }
        dispatch(ui_stop_loading());
        dispatch(skip_for_now());
      })
      .catch((err) => {
        dispatch(ui_stop_loading());
        console.log('error');
        console.log(err);
      });
  };
};

export const logout_user_from_app = () => {
  return async (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch(sign_out());
  };
};
