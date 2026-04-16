import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface FestivalIconProps {
  iconName: string;
  color: string;
  size?: number;
  marginRight?: number;
}

export default function FestivalIcon({ iconName, color, size = 64, marginRight = 0 }: FestivalIconProps) {
  return (
    <LinearGradient
      colors={[color, color + 'CC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.iconContainer, { width: size, height: size, borderRadius: size / 2, marginRight }]}
    >
      <Ionicons name={iconName as any} size={size * 0.5} color="#FFFFFF" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
});
