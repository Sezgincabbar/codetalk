import {SafeAreaView, FlatList, View, Text, Alert} from 'react-native';
import React from 'react';
import FloatingButton from '../../../components/FloatingButton';
import InputModal from '../../../components/InputModal';
import styles from './Messages.styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../../utils/parseContentData';
import MessageCard from '../../../components/MessageCard/MessageCard';

const MessagesScreen = ({route}) => {
  const {roomId, room_name} = route.params;
  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [messagesList, setMessagesList] = React.useState([]);

  React.useEffect(() => {
    database()
      .ref(`rooms/${roomId}/messages`)
      .on('value', snapshot => {
        const messagesData = snapshot.val();
        const parsedData = parseContentData(messagesData || []);
        setMessagesList(parsedData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInputModalToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(message) {
    handleInputModalToggle();
    sendContent(message);
  }

  function handleDeleteContent(item) {
    const kullanici = auth().currentUser.uid;

    if (kullanici === item.uid) {
      database().ref(`rooms/${roomId}/messages/${item.id}`).remove();
    } else {
      Alert.alert('Dikkat', 'Bu mesajı silme yetkinizyok');
    }
  }

  function sendContent(message) {
    const userMail = auth().currentUser.email;
    const uid = auth().currentUser.uid;
    const messageObject = {
      message,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      uid,
    };

    database().ref(`rooms/${roomId}/messages`).push(messageObject);
  }

  const renderRooms = ({item}) => (
    <MessageCard message={item} onLongPress={() => handleDeleteContent(item)} />
  );

  const keyExtractMessages = item => item.id;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>{room_name} odası kuruldu!</Text>
      </View>
      {messagesList.length > 0 ? (
        <FlatList
          data={messagesList}
          renderItem={renderRooms}
          keyExtractor={keyExtractMessages}
        />
      ) : (
        <View style={styles.card_container}>
          <Text style={styles.card_text}>Mesaj Yollayabilirsinnn</Text>
        </View>
      )}
      <FloatingButton icon="plus" onPress={handleInputModalToggle} />
      <InputModal
        visible={inputModalVisible}
        onClose={handleInputModalToggle}
        onSend={handleSendContent}
        placeholder={'Mesaj Giriniz..'}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
