import {View, TextInput, Alert} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import styles from './InputModal.styles';
import RegularButton from '../RegularButton';
const InputModal = ({visible, onSend, onClose, placeholder}) => {
  const [text, setText] = React.useState(null);
  function handleSend() {
    if (!text) {
      Alert.alert('Gönderilemedi', 'Boş Paylaşım Yapılamaz');
      return;
    } else {
      onSend(text);
      setText(null);
    }
  }
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.input}
            placeholder={placeholder}
            onChangeText={setText}
            multiline
          />
        </View>
        <RegularButton title="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default InputModal;
