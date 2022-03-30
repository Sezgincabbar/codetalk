import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import RegularButton from '../../../components/RegularButton';
import Input from '../../../components/Input';
import * as Yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const Sign = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object({
    usermail: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    repassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
  });

  function handleLogin() {
    navigation.goBack();
  }

  async function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.repassword,
      );
      setLoading(false);
      navigation.navigate('LoginScreen');
      auth().signOut();
      showMessage({
        message: 'Kullanıcı Oluşturuldu',
        type: 'success',
      });
    } catch (error) {
      setLoading(false);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
    }
  }

  const initialValues = {
    usermail: '',
    password: '',
    repassword: '',
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}>
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <>
              <Text style={styles.header}>CODETALKS</Text>
              <Input
                placeholder="Kullanıcı adınızı giriniz..."
                value={values.usermail}
                onChangeText={handleChange('usermail')}
                onBlur={handleBlur('usermail')}
                error={errors.usermail}
              />
              <Input
                placeholder="Şifrenizi Giriniz..."
                isSecure
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
              />
              <Input
                placeholder="Şifrenizi Tekrar Giriniz..."
                isSecure
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                onBlur={handleBlur('repassword')}
                error={errors.repassword}
              />
              <View style={{marginVertical: 20}} />
              <RegularButton
                title="Kayıt Ol"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
        <RegularButton theme="secondary" title="Geri" onPress={handleLogin} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Sign;

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
