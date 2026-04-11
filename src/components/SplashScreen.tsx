import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main app after splash
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#E63946', '#F77F00', '#FCBF49']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Decorative circle */}
        <Animated.View
          style={[
            styles.decorativeCircle,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <View style={styles.circleInner} />
        </Animated.View>

        {/* Calendar Icon */}
        <View style={styles.calendarIcon}>
          <Text style={styles.calendarEmoji}>📅</Text>
        </View>

        {/* App Title */}
        <Text style={styles.title}>বাংলা ক্যালেন্ডার</Text>
        <Text style={styles.subtitle}>Bengali English Calendar</Text>

        {/* Decorative Elements */}
        <View style={styles.decorativeDots}>
          <View style={[styles.dot, styles.dotRed]} />
          <View style={[styles.dot, styles.dotOrange]} />
          <View style={[styles.dot, styles.dotYellow]} />
        </View>
      </Animated.View>

      {/* Bottom decorative pattern */}
      <View style={styles.bottomPattern}>
        <View style={styles.alpanaPattern}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.alpanaDot} />
          ))}
        </View>
      </View>

      {/* Version info */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  calendarIcon: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 30,
  },
  calendarEmoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  decorativeDots: {
    flexDirection: 'row',
    marginTop: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotRed: {
    backgroundColor: '#C1121F',
  },
  dotOrange: {
    backgroundColor: '#D62828',
  },
  dotYellow: {
    backgroundColor: '#F77F00',
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  alpanaPattern: {
    flexDirection: 'row',
  },
  alpanaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 15,
  },
  version: {
    position: 'absolute',
    bottom: 30,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
