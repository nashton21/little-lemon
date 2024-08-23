import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {validateEmail} from "../validate";
import {validateName} from "../validate";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [firstname, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const isEmailValid = validateEmail(email);
  const isNameValid = validateName(firstname);

  const [isOnboardingCompleted, setdata] = useState(false);

  const getOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboarding')
      if(value !== null) {
          setdata(true);
      } else {
          setdata(false);
      }
    }  catch (e){
      console.error(e);
    }
  }

  getOnboarding()

  useEffect(() => {
    if (isOnboardingCompleted) {
      navigation.navigate('Home');
    }
  }, [isOnboardingCompleted]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Image
          style={styles.image}
          source={require('../assets/Logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
      </View>
      <Text style={styles.titleText}>Let us get to know you</Text>
      <Text style={styles.regularText}>First Name</Text>
      <TextInput
        style={styles.inputBox}
        value={firstname}
        onChangeText={onChangeName}
        keyboardType={'default'}
      />
      <Text style={styles.regularText}>Email</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        keyboardType={'email-address'}
      />
      <View style={styles.bottom}>
        <Pressable
          disabled={!isEmailValid || !isNameValid}
          style = {[styles.button, (!isEmailValid || !isNameValid) ? styles.buttonDisabled : styles.buttonActive]}
          onPress = {() => {
            navigation.navigate("Profile", {fname: firstname, emailadd: email,})
          }}
          >        
          <Text style = {styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#EDEFEE',
    padding: 10,
  },
  image: {
    width: 300,
    height: 60,
    borderRadius: 2,
  },
  titleText: {
    padding: 40,
    fontSize: 30,
    color: '#495E57',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 5,
    marginVertical: 4,
    color: '#495E57',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    fontSize: 16,
    marginHorizontal: 80,
    borderColor: '#495E57',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 260,
    marginRight: 20,
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonActive: {
    borderColor: 'black',
  },
  buttonDisabled: {
    borderColor: '#d3d3d3',
  },
  buttonText: {
    color: '#495E57',
    textAlign: 'center',
    fontSize: 25,
  },
  bottom: {
    backgroundColor: '#EDEFEE',
    height: 500,
    padding: 10,
    marginTop: 60,
  },
});



