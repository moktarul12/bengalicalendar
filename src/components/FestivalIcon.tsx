import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, BORDER_RADIUS } from '../constants/theme';

interface FestivalIconProps {
  iconPath: string;
  color: string;
  size?: number;
  marginRight?: number;
}

// Creative emoji mapping for festivals
const iconMapping: { [key: string]: string } = {
  'pohela-boishakh.svg': '🥁',     // Dhak - iconic Bengali New Year sound
  'durga-puja.svg': '🪔',          // Pujo vibe (or use 🐅 if you want Durga-specific)
  'kali-puja.svg': '🕯️',          // Night पूजा + deep devotion
  'diwali.svg': '✨',              // Lights (less overlap with Kali Puja)
  'christmas.svg': '🎄',           // Park Street Christmas vibe
  'independence-day.svg': '🇮🇳',   // Indian flag
  'victory-day.svg': '🎖️',         // Bangladesh Victory Day feel
  'eid-ul-fitr.svg': '🕌',         // Mosque (more community-centric)
  'eid-ul-adha.svg': '🐐',         // Qurbani (goat more common locally)
  'saraswati-puja.svg': '🪶',      // White/youth vibe (alt: 📖 for studies)
  'holi.svg': '🌸',                // Dol Jatra (flower + softer aesthetic)
  'rakhi.svg': '🧵',               // Rakhi thread
  'navratri.svg': '🔱',            // Shakti symbol (closer to Durga roots)
  'janmashtami.svg': '🪈',         // Krishna’s flute (much clearer than 🎭)
  'basant-panchami.svg': '🌼',     // Yellow spring (very Bengali)
  'makar-sankranti.svg': '🍚',     // Pithe-puli (food = strong Bengal identity)
};

export default function FestivalIcon({ iconPath, color, size = 64, marginRight = 0 }: FestivalIconProps) {
  const emoji = iconMapping[iconPath] || '🎊';
  
  return (
    <View style={[styles.iconContainer, { width: size, height: size, marginRight }]}>
      <View style={[styles.iconBackground, { backgroundColor: color + '20' }]}>
        <Text style={[styles.emoji, { fontSize: size * 0.5 }]}>{emoji}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emoji: {
    textAlign: 'center',
  },
});
