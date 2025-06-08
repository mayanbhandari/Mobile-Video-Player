// PlayerScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, StatusBar, Platform } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import RNAndroidScreenshotDetector from 'react-native-android-screenshot-detection';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PlayerScreen = () => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [screenshotCount, setScreenshotCount] = useState(0);
  const [username, setUsername] = useState('Mayan');
  const [watermarkTime, setWatermarkTime] = useState(new Date());
  const [watermarkPosition, setWatermarkPosition] = useState('center');
  const [secureMode, setSecureMode] = useState(true);
  const [screenshotProtectionActive, setScreenshotProtectionActive] = useState(false);
  const navigation = useNavigation();

  const watermarkPositions = ['topLeft', 'topRight', 'center', 'bottomLeft', 'bottomRight'];

  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkTime(new Date());
      const randomPosition = watermarkPositions[Math.floor(Math.random() * watermarkPositions.length)];
      setWatermarkPosition(randomPosition);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setScreenshotProtectionActive(true);
      RNAndroidScreenshotDetector.subscribe(() => {
        Alert.alert('Screenshot Detected', 'You are not allowed to take screenshots during playback.');
        setPaused(true);
        setScreenshotCount(prev => prev + 1);
      });
      RNAndroidScreenshotDetector.start();

      return () => {
        RNAndroidScreenshotDetector.unsubscribe();
        RNAndroidScreenshotDetector.stop();
      };
    }
  }, []);

  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleRewind = () => {
    const newTime = Math.max(0, currentTime - 10);
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleFastForward = () => {
    if (!secureMode || (duration > 0 && currentTime < duration)) {
      const newTime = Math.min(duration, currentTime + 2); // Limit fast-forward to 2 seconds in secure mode
      videoRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const getWatermarkStyle = () => {
    const baseStyle = {
      position: 'absolute',
      color: 'rgba(255,255,255,0.4)',
      fontSize: 16,
      fontWeight: 'bold',
    };
    switch (watermarkPosition) {
      case 'topLeft':
        return { ...baseStyle, top: 10, left: 10 };
      case 'topRight':
        return { ...baseStyle, top: 10, right: 10 };
      case 'center':
        return { ...baseStyle, top: screenHeight * 0.3, left: screenWidth * 0.25 };
      case 'bottomLeft':
        return { ...baseStyle, bottom: 10, left: 10 };
      case 'bottomRight':
        return { ...baseStyle, bottom: 10, right: 10 };
      default:
        return baseStyle;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        onLoad={onLoad}
        onProgress={onProgress}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          <Text style={styles.controlText}>{paused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRewind}>
          <Text style={styles.controlText}>Rewind 10s</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFastForward}>
          <Text style={styles.controlText}>Forward 2s</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
      </View>
      <Text style={getWatermarkStyle()}>
        {`${username} - ${watermarkTime.toLocaleString()}`}
      </Text>

      <View style={styles.securityPanel}>
        <Text style={styles.securityText}>
          Screenshot Protection: {screenshotProtectionActive ? 'ON' : 'OFF'}
        </Text>
        <Text style={styles.securityText}>
          Screenshot Attempts: {screenshotCount}
        </Text>
        <Text style={styles.securityText}>
          Watermark: {username}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  video: {
    width: screenWidth,
    height: screenHeight * 0.6
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center'
  },
  controlText: {
    color: 'white',
    fontSize: 16
  },
  time: {
    color: 'white',
    fontSize: 16
  },
  securityPanel: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8
  },
  securityText: {
    color: 'white',
    fontSize: 14
  }
});

export default PlayerScreen;
