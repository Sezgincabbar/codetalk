import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './MessageCard.styles';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
const MessageCard = ({message, onLongPress}) => {
  const formatedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <View style={styles.inner_container}>
        <Text style={styles.header_text}>{message.username}</Text>
        <Text style={styles.header_text}>{formatedDate}</Text>
      </View>
      <Text style={styles.text}>{message.message}</Text>
    </TouchableOpacity>
  );
};

export default MessageCard;
