import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './RoomsCard.styles';
const RoomsCard = ({name, onPress, onLongPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Text style={styles.text}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default RoomsCard;
