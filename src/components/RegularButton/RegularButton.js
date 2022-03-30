import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './RegularButton.styles';
const RegularButton = ({title, onPress, theme = 'primary', loading}) => {
  return (
    <TouchableOpacity style={styles[theme].container} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={'large'} color="white" />
      ) : (
        <Text style={styles[theme].label}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default RegularButton;
