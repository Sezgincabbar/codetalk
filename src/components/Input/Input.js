import {View, TextInput, Text} from 'react-native';
import React from 'react';
import styles from './Input.styles';
const Input = ({placeholder, onChangeText, value, isSecure, error}) => {
  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="white"
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export default Input;
