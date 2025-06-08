// SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [secureMode, setSecureMode] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedSecure = await AsyncStorage.getItem('secureMode');
      if (storedUsername) setUsername(storedUsername);
      if (storedSecure !== null) setSecureMode(storedSecure === 'true');
    };
    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('secureMode', secureMode.toString());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Watermark Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Secure Mode</Text>
        <Switch
          value={secureMode}
          onValueChange={setSecureMode}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2'
  },
  label: {
    fontSize: 18,
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default SettingsScreen;
