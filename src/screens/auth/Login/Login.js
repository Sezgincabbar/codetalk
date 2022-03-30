import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import Input from '../../../components/Input';
import RegularButton from '../../../components/RegularButton';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    usermail: '',
    password: '',
  };

  const loginValidationSchema = yup.object().shape({
    usermail: yup
      .string()
      .email('Geçerli bir email adresi giriniz')
      .required('Email Adresi Gereklidir'),
    password: yup
      .string()
      .min(8, ({min}) => `Parola  ${min} karakterden fazla olmalıdır`)
      .required('Şifre Gereklidir'),
  });
  function handleSign() {
    navigation.navigate('SignScreen');
  }

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
    navigation.navigate('RoomScreen');
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.header}>CODETALK</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={loginValidationSchema}>
          {({errors, handleSubmit, values, handleChange, handleBlur}) => (
            <>
              <Input
                value={values.usermail}
                placeholder={'e-posta giriniz..'}
                onChangeText={handleChange('usermail')}
                error={errors.usermail}
              />
              <Input
                value={values.password}
                placeholder={'şifre giriniz..'}
                onChangeText={handleChange('password')}
                error={errors.password}
                isSecure
              />
              <RegularButton
                title={'Giriş'}
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
        <RegularButton
          title={'Kayıt Ol'}
          theme={'secondary'}
          onPress={handleSign}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6F00',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 100,
    fontSize: 24,
  },
});
