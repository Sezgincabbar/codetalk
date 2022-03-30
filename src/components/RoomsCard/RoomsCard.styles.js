import {StyleSheet, Dimensions} from 'react-native';
const device = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    height: device.height / 4,
    width: device.width * 0.45,
    borderWidth: 1,
    borderColor: '#FFA040',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFA040',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
