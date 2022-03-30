import {StyleSheet, Dimensions} from 'react-native';
const deviceSize = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height * 0.3,
  },
  input_container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#eceef0',
    borderRadius: 10,
    marginVertical: 10,
    color: 'black',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
