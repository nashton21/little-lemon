import React, { useState } from 'react';

import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {validateEmail} from "../validate";
import {validateName} from "../validate";
import {validatePhone} from "../validate";

import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen ({ navigation, route }) {
  const {fname = "", emailadd = ""} = route.params;

  const [avatar, setImage] = useState(null);
  const [firstName, setFirstName] = useState("XXXXXXX");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("XXXXXXX");
  const [phoneNum, setPhoneNum] = useState("");
  const [isOrderChecked, setOrderChecked] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(false);
  const [isSpecialChecked, setSpecialChecked] = useState(false);
  const [isNewsChecked, setNewsChecked] = useState(false);
  const [isOnboardingCompleted, setdata] = useState(false);

  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const isEmailValid = validateEmail(emailAddress);
  const isPhoneValid = validatePhone(phoneNum);

  const setOnboarding = async ()=>{
    try {
      await AsyncStorage.setItem('firstName', firstName)
      await AsyncStorage.setItem('lastName', lastName)
      await AsyncStorage.setItem('emailAddress', emailAddress)
      await AsyncStorage.setItem('phoneNum', phoneNum)
      await AsyncStorage.setItem('isOrderChecked', isOrderChecked.toString())
      await AsyncStorage.setItem('isPasswordChecked', isPasswordChecked.toString())
      await AsyncStorage.setItem('isSpecialChecked', isSpecialChecked.toString())
      await AsyncStorage.setItem('isNewsChecked', isNewsChecked.toString())
      await AsyncStorage.setItem('onboarding', 'true')
    }
    catch (e){
      console.error(e);
    }
  }

  if (firstName == "XXXXXXX") {
    setFirstName({fname}.fname)
  }

  console.log(firstName);

  if (emailAddress == "XXXXXXX") {
    setEmailAddress({emailadd}.emailadd);
  }

  console.log(emailAddress);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textLarge}>Personal Information</Text>
      <Text style={styles.textSmall}>Avatar</Text>
      <View style={styles.dualButtons}>
        <Image
          style={styles.avatarImage}
          source={require('../assets/defaultavatar.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Avatar Image'}
        />
        <Pressable
          style = {styles.button}
          onPress = {() => {pickImage}}>        
          <Text style = {styles.buttonText}>Change</Text>
        </Pressable>
        <Pressable
          style = {styles.button}
          onPress = {() => {}}>        
          <Text style = {styles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    
      <Text style={styles.textSmall}>First name</Text>
      <TextInput style={styles.inputBox} onChangeText = {setFirstName} value = {firstName}></TextInput>
      <Text style={styles.textSmall}>Last name</Text>
      <TextInput style={styles.inputBox} onChangeText = {setLastName} value = {lastName}></TextInput>
      <Text style={styles.textSmall}>Email</Text>
      <TextInput style={styles.inputBox} onChangeText = {setEmailAddress} value = {emailAddress} inputMode='email'></TextInput>
      <Text style={styles.textSmall}>Phone number</Text>
      <TextInput style={styles.inputBox} onChangeText = {setPhoneNum} value = {phoneNum} inputMode='tel' placeholder='xxx-yyy-zzzz'></TextInput>

      <Text style={styles.textLarge}>Email notifications</Text>
      
      <View style={styles.checkboxWrapper}>
        <Checkbox value={isOrderChecked} onValueChange={setOrderChecked} />
        <Text style={styles.textSmall}>Order statuses</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isPasswordChecked} onValueChange={setPasswordChecked} />
        <Text style={styles.textSmall}>Password changes</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isSpecialChecked} onValueChange={setSpecialChecked} />
        <Text style={styles.textSmall}>Special offers</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isNewsChecked} onValueChange={setNewsChecked} />
        <Text style={styles.textSmall}>Newsletter</Text>
      </View>

      <Pressable
          style = {styles.button}
          onPress = {() => {
            navigation.navigate("Onboarding")
            AsyncStorage.clear()
          }}>        
          <Text style = {styles.buttonText}>Log out</Text>
      </Pressable>

      <View style={styles.dualButtons}>
        <Pressable
          style = {styles.button}
          onPress = {() => {
            console.log(firstName);
            console.log(lastName);
            console.log(emailAddress);
            console.log(phoneNum);
            console.log(isOrderChecked);
            console.log(isPasswordChecked);
            console.log(isSpecialChecked);
            console.log(isNewsChecked);
            console.log(isOnboardingCompleted);
            setFirstName("");
            setLastName("");
            setEmailAddress("");
            setPhoneNum("");
            setOrderChecked(false);
            setPasswordChecked(false);
            setNewsChecked(false);
            setSpecialChecked(false);
          }}>        
          <Text style = {styles.buttonText}>Discard changes</Text>
        </Pressable>
        <Pressable
          style = {[styles.button, (!isEmailValid || !isFirstNameValid || !isLastNameValid || !isPhoneValid) ? styles.buttonDisabled : styles.buttonActive]}
          disabled={!isEmailValid || !isFirstNameValid || !isLastNameValid || !isPhoneValid}
          onPress = {() => {
            setOnboarding()
            navigation.navigate("Home")
          }}>        
          <Text style = {styles.buttonText}>Save changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'space-around',
    padding: 5,
    marginLeft: 10,
  },
  dualButtons: {
    flexDirection: 'row',
    alignItems: 'space-around',
    padding: 5,
  },
  textSmall: {
    fontSize: 10,
    color: '#495E57',
    marginLeft: 10,
  },
  textLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  inputBox: {
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
    borderColor: '#495E57',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    fontSize: 16,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 5,
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
    fontSize: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10
  },
});