import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS } from '../constants/theme';

interface FestivalIconProps {
  iconPath: string;
  color: string;
  size?: number;
  marginRight?: number;
}

// Icon mapping for festivals using Ionicons
const getIconName = (iconPath: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    'pohela-boishakh.svg': 'musical-notes',
    'durga-puja.svg': 'flame',
    'kali-puja.svg': 'moon',
    'diwali.svg': 'sunny',
    'christmas.svg': 'star',
    'independence-day.svg': 'flag',
    'victory-day.svg': 'medal',
    'eid-ul-fitr.svg': 'moon-outline',
    'eid-ul-adha.svg': 'paw',
    'saraswati-puja.svg': 'book',
    'holi.svg': 'color-palette',
    'rakhi.svg': 'heart',
    'navratri.svg': 'flower',
    'janmashtami.svg': 'musical-note',
    'basant-panchami.svg': 'flower-outline',
    'makar-sankranti.svg': 'airplane',
  };
  
  return iconMap[iconPath] || 'star';
};

export default function FestivalIcon({ iconPath, color, size = 64, marginRight = 0 }: FestivalIconProps) {
  const iconName = getIconName(iconPath);
  const iconSize = size * 0.5;
  
  return (
    <View style={[styles.iconContainer, { width: size, height: size, marginRight }]}>
      <View style={[styles.iconBackground, { backgroundColor: color + '15', borderColor: color }]}>
        <Ionicons name={iconName} size={iconSize} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
  },
  iconBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
  },
});
