import {StyleSheet} from 'react-native';

const base_styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#FFA040',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});

export default {
  primary: StyleSheet.create({
    ...base_styles,
  }),
  secondary: StyleSheet.create({
    ...base_styles,
    container: {
      ...base_styles.container,
      backgroundColor: 'white',
    },
    label: {
      ...base_styles.label,
      color: '#FFA040',
    },
  }),
};
