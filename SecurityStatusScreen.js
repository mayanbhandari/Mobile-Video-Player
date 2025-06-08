// SecurityStatusScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecurityStatusScreen = () => {
  const [screenshotCount, setScreenshotCount] = useState(0);
  const [secureMode, setSecureMode] = useState(false);
  const [username, setUsername] = useState('');
  const [protectionActive, setProtectionActive] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const storedCount = await AsyncStorage.getItem('screenshotCount');
      const storedSecure = await AsyncStorage.getItem('secureMode');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedProtection = await AsyncStorage.getItem('screenshotProtection');

      if (storedCount) setScreenshotCount(parseInt(storedCount));
      if (storedSecure !== null) setSecureMode(storedSecure === 'true');
      if (storedUsername) setUsername(storedUsername);
      if (storedProtection !== null) setProtectionActive(storedProtection === 'true');
    };
    fetchStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Security Status</Text>
      <Text style={styles.label}>Screenshot Protection: {protectionActive ? 'ON' : 'OFF'}</Text>
      <Text style={styles.label}>Screenshot Attempts: {screenshotCount}</Text>
      <Text style={styles.label}>Watermark User: {username}</Text>
      <Text style={styles.label}>Secure Mode: {secureMode ? 'ENABLED' : 'DISABLED'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default SecurityStatusScreen;
