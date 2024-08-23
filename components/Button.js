import * as React from "react";
import { Pressable, Text, StyleSheet, } from 'react-native';

const Button = ({onPress, children, disabled}) => {
  return (
    <Pressable
      style = {[styles.buttonActive, styles.buttonDisabled && disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 260,
    marginRight: 20,
    backgroundColor: '#d3d3d3',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonDisabled: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 260,
    marginRight: 20,
    backgroundColor: '#d3d3d3',
    borderColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
  },
});