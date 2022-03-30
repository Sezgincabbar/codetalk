import {FlatList, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FloatingButton from '../../../components/FloatingButton';
import InputModal from '../../../components/InputModal';
import parseContentData from '../../../utils/parseContentData';
import styles from './Rooms.styles';
import RoomsCard from '../../../components/RoomsCard';
const MainScreen = ({navigation}) => {
  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [roomList, setRoomsList] = React.useState([]);

  React.useEffect(() => {
    database()
      .ref('rooms/')
      .on('value', snapshot => {
        const roomsData = snapshot.val();
        const parsedData = parseContentData(roomsData || []);
        setRoomsList(parsedData);
      });
  }, []);

  function handleInputModalToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(room_name) {
    handleInputModalToggle();
    sendContent(room_name);
  }

  function handleDeleteRoom(room_id) {
    database().ref(`rooms/${room_id}`).remove();
  }

  function sendContent(room_name) {
    const userMail = auth().currentUser.email;
    const roomObject = {
      room_name,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      messages: [],
    };

    database().ref('rooms/').push(roomObject);
  }

  const handlePressRoom = item => {
    navigation.navigate('MessagesScreen', {
      roomId: item.id,
      room_name: item.room_name,
    });
  };

  const renderRooms = ({item}) => (
    <RoomsCard
      name={item.room_name}
      onPress={() => handlePressRoom(item)}
      onLongPress={() => handleDeleteRoom(item.id)}
    />
  );

  const keyExtractorRooms = item => item.id;

  return (
    <SafeAreaView style={styles.container}>
      {roomList.length > 0 ? (
        <FlatList
          data={roomList}
          renderItem={renderRooms}
          numColumns={2}
          keyExtractor={keyExtractorRooms}
        />
      ) : (
        <View style={styles.card_container}>
          <Text style={styles.card_text}>Oda Kurunuz</Text>
        </View>
      )}
      <FloatingButton icon="plus" onPress={handleInputModalToggle} />
      <InputModal
        visible={inputModalVisible}
        onClose={handleInputModalToggle}
        onSend={handleSendContent}
        placeholder={'Oda Adı Giriniz...'}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
