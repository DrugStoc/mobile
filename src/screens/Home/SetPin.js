//import liraries
import React, {Component} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

// create a component
const SetTransactionPin = () => {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{}}
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
            mode="outlined"
            secureTextEntry
            maxLength={4}
            label="Pin"
          />
        )}
        name="pin"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && (
        <Caption style={{color: '#EB001B'}}>Email is required</Caption>
      )}
      <Controller
        control={control}
        rules={{}}
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
            mode="outlined"
            secureTextEntry
            maxLength={4}
            label="Confirm Pin"
          />
        )}
        name="c_pin"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && (
        <Caption style={{color: '#EB001B'}}>Email is required</Caption>
      )}
      <Controller
        control={control}
        rules={{}}
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
            secureTextEntry
            mode="outlined"
            label="Password"
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && (
        <Caption style={{color: '#EB001B'}}>Email is required</Caption>
      )}
      <Button style={{ padding: 5, borderRadius: 50, marginTop: 10 }} mode="contained" onPress={handleSubmit(onSubmit)} >Set Pin</Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

//make this component available to the app
export default SetTransactionPin;
