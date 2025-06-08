// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const predefinedVideos = [
    {
      title: 'Sample Video 1',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      title: 'Sample Video 2',
      uri: 'https://www.w3schools.com/html/movie.mp4'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Video</Text>
      {predefinedVideos.map((video, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('Player', { videoUri: video.uri })}
        >
          <Text style={styles.buttonText}>{video.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});

export default HomeScreen;
