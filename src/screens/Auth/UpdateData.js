//import liraries
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
// import ImageResizer from 'react-native-image-resizer';
import {Button, Caption, Card, Surface, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  getting_users_profile,
  upload_user_licences,
} from '../../services/authentication';
import {skip_update_document_for_now} from '../../services/onboarding';
import {advert, location} from '../../utils/data';

// create a component
const UpdateData = ({navigation, skip, upload, user, loading}) => {
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [premisePreview, setPremise] = useState(null);
  const [lisencePreview, setLicence] = useState(null);
  const [premiseData, setPremiseData] = useState(null);
  const [lisenceData, setLicenceDate] = useState(null);
  const [locations, setLocation] = useState(null);
  const [discover, setDiscover] = useState(null);
  const {control, handleSubmit, errors} = useForm();

  const [locationValue, setLocationValue] = useState(null);
  const [isLocationFocus, setIsLocationFocus] = useState(false);
  const [isAdvertFocus, setIsAdvertFocus] = useState(false);

  const options = {
    title: 'Select Document',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const formdata = new FormData();

  useEffect(() => {
    user();
  }, []);

  const upload_practice_license = async () => {
    Alert.alert(
      '',
      'Select Document',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose from Library...',
          onPress: async () => {
            await launchImageLibrary({}, (res) => {
              setLicenceDate(res);
              setLicence(res.assets[0].uri);
              console.log(res);
            });
          },
        },
        {
          text: 'Take Photo...',
          onPress: async () => {
            await launchCamera({}, (res) => {
              setLicenceDate(res);
              setLicence(res.assets[0].uri);
              console.log(res);
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const upload_premise_license = async () => {
    Alert.alert(
      '',
      'Select Document',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose from Library...',
          onPress: async () => {
            await launchImageLibrary({}, (res) => {
              setPremiseData(res);
              setPremise(res.assets[0].uri);
              console.log(res);
            });
          },
        },
        {
          text: 'Take Photo...',
          onPress: async () => {
            await launchCamera({}, (res) => {
              setPremiseData(res);
              setPremise(res.assets[0].uri);
              console.log(res);
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onSubmit = () => {
    formdata.append('location', locations);
    formdata.append('discover', discover);
    formdata.append('practice_license', {
      name: lisenceData.name,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? lisenceData.uri
          : lisenceData.uri.replace('file://', ''),
    });
    formdata.append('premise_license', {
      name: premiseData.name,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? premiseData.uri
          : premiseData.uri.replace('file://', ''),
    });
    upload(formdata);
    // NavigationContainer.naviagte('update');
  };

  const skippForNow = () =>
    Alert.alert(
      'Please Note!',
      'Your licenses must be uploaded and approved to access Discounted prices, Promos, Offers and Credit facilities ',
      [
        {
          text: 'Continue',
          style: 'default',
          onPress: () => skip(),
        },
        {
          text: 'Cancel',
          style: 'destructive',
          onPress: null,
        },
      ],
    );

  return (
    <Surface style={{flex: 1, shadowOpacity: 0}}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View style={{paddingHorizontal: 20}}>
          <Title
            style={{fontWeight: 'bold', color: '#2C4DA7', marginBottom: 20}}>
            {"Final step, let's verify you"}
          </Title>
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
                    setDiscover(item.value);
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
          {errors.location && (
            <Caption style={{color: '#EB001B'}}>
              Please where is your location
            </Caption>
          )}
          <View style={{marginTop: 10}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isAdvertFocus && {borderColor: 'blue'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={advert}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      !isAdvertFocus ? 'How did you hear about us?' : '...'
                    }
                    value={value}
                    onFocus={() => setIsAdvertFocus(true)}
                    onBlur={() => {
                      setIsAdvertFocus(false);
                      onBlur();
                    }}
                    onChange={(item) => {
                      setDiscover(item.value);
                      onChange(item.value);
                      setIsAdvertFocus(false);
                    }}
                  />
                </>
              )}
              name="category"
              rules={{required: false}}
              defaultValue=""
            />
            {errors.category && (
              <Caption style={{color: '#EB001B'}}>
                Please tell us how you heard about us
              </Caption>
            )}
            {!lisencePreview ? (
              <TouchableOpacity onPress={upload_practice_license}>
                <Card
                  style={{
                    marginTop: 20,
                    borderRadius: 1,
                    borderWidth: 1.2,
                    borderStyle: 'dashed',
                    borderColor: 'grey',
                    elevation: 0,
                    alignItems: 'center',
                  }}>
                  <Button icon="upload">Upload</Button>
                  <Caption
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Attach your Practicing License
                  </Caption>
                  <Caption style={{textAlign: 'center', marginBottom: 10}}>
                    {'Upload (jpg or png image) or pdf\nMax upload size: 10MB'}
                  </Caption>
                </Card>
              </TouchableOpacity>
            ) : (
              <Card style={{marginTop: 20}}>
                <Card.Title
                  title="Practicing License"
                  titleStyle={{fontSize: 16}}
                />
                <Card.Cover source={{uri: lisencePreview}} />
                <Card.Actions>
                  <Button onPress={() => setLicence(null)}>Delete</Button>
                  <Button onPress={upload_practice_license}>Edit</Button>
                </Card.Actions>
              </Card>
            )}
            {!premisePreview ? (
              <TouchableOpacity onPress={upload_premise_license}>
                <Card
                  style={{
                    marginTop: 20,
                    borderRadius: 1,
                    borderWidth: 1.2,
                    borderStyle: 'dashed',
                    borderColor: 'grey',
                    elevation: 0,
                    alignItems: 'center',
                  }}>
                  <Button icon="upload">Upload</Button>
                  <Caption style={{fontSize: 16, fontWeight: 'bold'}}>
                    Attach your Premise License
                  </Caption>
                  <Caption style={{textAlign: 'center', marginBottom: 10}}>
                    {'Upload (jpg or png image) or pdf\nMax upload size: 10MB'}
                  </Caption>
                </Card>
              </TouchableOpacity>
            ) : (
              <Card style={{marginTop: 20}}>
                <Card.Title title="Premise License" />
                <Card.Cover source={{uri: premisePreview}} />
                <Card.Actions>
                  <Button onPress={() => setPremise(null)}>Delete</Button>
                  <Button onPress={upload_premise_license}>Edit</Button>
                </Card.Actions>
              </Card>
            )}

            <Caption
              style={{
                textAlign: 'center',
                marginTop: 30,
                paddingHorizontal: '3%',
                fontSize: 10,
                letterSpacing: 0,
              }}>
              By creating an account, I confirm that I have read and understood
              the DrugStoc's
              <Caption
                onPress={() => alert('hello')}
                style={{
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 10,
                  letterSpacing: 0,
                }}>
                Privacy Policy
              </Caption>
              and
              <Caption
                onPress={() => alert('hello')}
                style={{
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 10,
                  letterSpacing: 0,
                }}>
                Terms of Use.
              </Caption>
            </Caption>
          </View>
          <Button
            style={{padding: 5, borderRadius: 50, marginTop: 20}}
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}>
            complete
          </Button>
          <Button style={{padding: 5}} onPress={skippForNow}>
            skip for now
          </Button>
        </View>
      </ScrollView>
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
    skip: () => dispatch(skip_update_document_for_now()),
    upload: (payload) => dispatch(upload_user_licences(payload)),
    user: () => dispatch(getting_users_profile()),
  };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(UpdateData);

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
