//import liraries
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Caption, Surface, TextInput, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {register_a_new_user_to_app} from '../../services/authentication';
import {category, location} from '../../utils/data';

// create a component
const Register = ({navigation, register, loading}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [isLocationFocus, setIsLocationFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [locations, setLocation] = useState('');
  const [select, setSelect] = useState('');
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => register(data);

  const enterTitle = () => {
    switch (select) {
      case 'pharmacy':
        return 'Pharmacy Name';
      case 'doctors-office':
        return 'Practice Name';
      case 'clinic':
        return 'Clinic Name';
      case 'hospital':
        return 'Facility Name';
      case 'nursing-home':
        return 'Facility Name';
      default:
        return 'Username';
    }
  };

  return (
    <Surface style={{flex: 1, shadowOpacity: 0}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={{paddingVertical: 50}}>
          <View style={{paddingHorizontal: 20}}>
            <Title
              style={{fontWeight: 'bold', color: '#2C4DA7', marginBottom: 20}}>
              {"Welcome, Let's get\nyou started!"}
            </Title>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={category}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'What best describe you?' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => {
                      setIsFocus(false);
                      onBlur();
                    }}
                    onChange={(item) => {
                      setValue(item.value);
                      onChange(item.value);
                      setIsFocus(false);
                    }}
                  />
                </>
              )}
              name="category"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.category && (
              <Caption style={{color: '#EB001B'}}>
                Please tell us what best describes you
              </Caption>
            )}
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={{marginTop: 20}}
                  mode="outlined"
                  label={`Enter ${enterTitle()}`}
                />
              )}
              name="name"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.name && (
              <Caption style={{color: '#EB001B'}}>
                Please provide us with your Facility Name
              </Caption>
            )}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '48%'}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{marginTop: 20}}
                      mode="outlined"
                      label="First name"
                    />
                  )}
                  name="first_name"
                  rules={{required: true}}
                  defaultValue=""
                />
                {errors.first_name && (
                  <Caption style={{color: '#EB001B'}}>
                    First Name is required
                  </Caption>
                )}
              </View>
              <View style={{width: '48%'}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{marginTop: 20}}
                      mode="outlined"
                      label="Last name"
                    />
                  )}
                  name="last_name"
                  rules={{required: true}}
                  defaultValue=""
                />
                {errors.last_name && (
                  <Caption style={{color: '#EB001B'}}>
                    Last Name is required
                  </Caption>
                )}
              </View>
            </View>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  maxLength={11}
                  placeholder="08012345678"
                  style={{marginTop: 20, marginBottom: 20}}
                  mode="outlined"
                  label="Phone Number"
                  keyboardType="phone-pad"
                />
              )}
              name="phone_no"
              rules={{
                required: 'Phone number cannot be empty',
                minLength: {
                  value: 11,
                  message: 'A valid Phone number is required',
                },
                pattern: {
                  value: /[0-9]/g,
                  message: 'A valid Phone number is required',
                },
              }}
              defaultValue=""
            />
            {errors.phone_no && (
              <Caption style={{color: '#EB001B'}}>
                {errors.phone_no.message}
              </Caption>
            )}
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isLocationFocus && {borderColor: 'blue'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={location}
                    labelField="label"
                    valueField="value"
                    placeholder={!isLocationFocus ? 'Location' : '...'}
                    value={value}
                    onFocus={() => setIsLocationFocus(true)}
                    onBlur={() => {
                      setIsLocationFocus(false);
                      onBlur();
                    }}
                    onChange={(item) => {
                      setLocationValue(item.value);
                      onChange(item.value);
                      setIsLocationFocus(false);
                    }}
                  />
                </>
              )}
              name="location"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.category && (
              <Caption style={{color: '#EB001B'}}>
                Please where is your location
              </Caption>
            )}
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={{marginTop: 20}}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  mode="outlined"
                  label="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
              name="email"
              rules={{
                required: 'Email cannot be empty',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'A valid email is required',
                },
              }}
              defaultValue=""
            />
            {errors.email && (
              <Caption style={{color: '#EB001B'}}>
                {errors.email.message}
              </Caption>
            )}
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={{marginTop: 20}}
                  onBlur={onBlur}
                  returnKeyType="done"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  mode="outlined"
                  label="Password"
                  secureTextEntry
                />
              )}
              name="password"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.password && (
              <Caption style={{color: '#EB001B'}}>Password is required</Caption>
            )}

            <Button
              style={{padding: 5, borderRadius: 50, marginTop: 30}}
              mode="contained"
              loading={loading}
              disabled={loading}
              onPress={handleSubmit(onSubmit)}>
              CONTINUE
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.uiloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (payload) => dispatch(register_a_new_user_to_app(payload)),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    paddingVertical: 15,
    // height: 50,
    borderColor: 'gray',
    // backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 13,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 13,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
