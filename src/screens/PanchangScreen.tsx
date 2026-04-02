import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { TITHIS, NAKSHATRAS, toBengaliNumber } from '../constants/bengaliCalendar';

export default function PanchangScreen() {
  const [selectedDate] = useState(new Date());

  // Simulated Panchang data
  const panchangData = {
    tithi: { name: 'প্রতিপদ', nameEn: 'Pratipada', endTime: '10:30 AM' },
    nakshatra: { name: 'অশ্বিনী', nameEn: 'Ashwini', endTime: '12:45 PM' },
    yoga: { name: 'বিষ্ণু', nameEn: 'Vishkumbha', endTime: '02:15 PM' },
    karana: { name: 'বব', nameEn: 'Bava', endTime: '11:15 AM' },
    sunrise: '05:45 AM',
    sunset: '06:15 PM',
    moonrise: '07:30 AM',
    moonset: '08:45 PM',
    rahuKaal: '09:00 AM - 10:30 AM',
    yamaganda: '12:30 PM - 02:00 PM',
    gulika: '03:00 PM - 04:30 PM',
    abhijit: '11:45 AM - 12:30 PM',
  };

  const auspiciousTimes = [
    { name: 'Abhijit Muhurta', nameBn: 'অভিজিৎ মুহূর্ত', time: panchangData.abhijit },
    { name: 'Amrit Kalam', nameBn: 'অমৃত কালম', time: '02:00 PM - 03:30 PM' },
    { name: 'Brahma Muhurta', nameBn: 'ব্রহ্ম মুহূর্ত', time: '04:30 AM - 05:15 AM' },
  ];

  const inauspiciousTimes = [
    { name: 'Rahu Kaal', nameBn: 'রাহু কাল', time: panchangData.rahuKaal, color: '#F44336' },
    { name: 'Yamaganda', nameBn: 'যমগন্ধ', time: panchangData.yamaganda, color: '#FF9800' },
    { name: 'Gulika', nameBn: 'গুলিকা', time: panchangData.gulika, color: '#9C27B0' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#1A237E', '#311B92']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="moon" size={40} color="#FFD700" />
          <Text style={styles.headerTitle}>Panchang</Text>
          <Text style={styles.headerSubtitle}>পঞ্জিকা</Text>
        </View>
        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>
      </LinearGradient>

      {/* Main Panchang Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Panchang / আজকের পঞ্জিকা</Text>
        
        <View style={styles.panchangCard}>
          <LinearGradient
            colors={['#FFD700', '#FFA000']}
            style={styles.panchangGradient}
          >
            {/* Tithi */}
            <View style={styles.panchangRow}>
              <View style={styles.panchangItem}>
                <Ionicons name="sunny" size={24} color="#FFFFFF" />
                <Text style={styles.panchangLabel}>Tithi</Text>
                <Text style={styles.panchangValue}>{panchangData.tithi.name}</Text>
                <Text style={styles.panchangValueEn}>{panchangData.tithi.nameEn}</Text>
              </View>
              
              <View style={styles.divider} />
              
              {/* Nakshatra */}
              <View style={styles.panchangItem}>
                <Ionicons name="star" size={24} color="#FFFFFF" />
                <Text style={styles.panchangLabel}>Nakshatra</Text>
                <Text style={styles.panchangValue}>{panchangData.nakshatra.name}</Text>
                <Text style={styles.panchangValueEn}>{panchangData.nakshatra.nameEn}</Text>
              </View>
            </View>

            <View style={styles.horizontalDivider} />

            <View style={styles.panchangRow}>
              {/* Yoga */}
              <View style={styles.panchangItem}>
                <Ionicons name="infinite" size={24} color="#FFFFFF" />
                <Text style={styles.panchangLabel}>Yoga</Text>
                <Text style={styles.panchangValue}>{panchangData.yoga.name}</Text>
                <Text style={styles.panchangValueEn}>{panchangData.yoga.nameEn}</Text>
              </View>
              
              <View style={styles.divider} />
              
              {/* Karana */}
              <View style={styles.panchangItem}>
                <Ionicons name="time" size={24} color="#FFFFFF" />
                <Text style={styles.panchangLabel}>Karana</Text>
                <Text style={styles.panchangValue}>{panchangData.karana.name}</Text>
                <Text style={styles.panchangValueEn}>{panchangData.karana.nameEn}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Sun & Moon Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sun & Moon Times</Text>
        <View style={styles.timesGrid}>
          <View style={styles.timeCard}>
            <Ionicons name="sunny-outline" size={28} color="#FF9800" />
            <Text style={styles.timeLabel}>Sunrise</Text>
            <Text style={styles.timeValue}>{panchangData.sunrise}</Text>
          </View>
          <View style={styles.timeCard}>
            <Ionicons name="moon-outline" size={28} color="#3F51B5" />
            <Text style={styles.timeLabel}>Moonrise</Text>
            <Text style={styles.timeValue}>{panchangData.moonrise}</Text>
          </View>
          <View style={styles.timeCard}>
            <Ionicons name="partly-sunny-outline" size={28} color="#FF5722" />
            <Text style={styles.timeLabel}>Sunset</Text>
            <Text style={styles.timeValue}>{panchangData.sunset}</Text>
          </View>
          <View style={styles.timeCard}>
            <Ionicons name="cloudy-night-outline" size={28} color="#673AB7" />
            <Text style={styles.timeLabel}>Moonset</Text>
            <Text style={styles.timeValue}>{panchangData.moonset}</Text>
          </View>
        </View>
      </View>

      {/* Auspicious Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auspicious Times / শুভ সময়</Text>
        {auspiciousTimes.map((time, index) => (
          <View key={index} style={styles.timeRow}>
            <View style={styles.timeRowLeft}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <View style={styles.timeRowText}>
                <Text style={styles.timeRowName}>{time.name}</Text>
                <Text style={styles.timeRowNameBn}>{time.nameBn}</Text>
              </View>
            </View>
            <Text style={styles.timeRowTime}>{time.time}</Text>
          </View>
        ))}
      </View>

      {/* Inauspicious Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inauspicious Times / অশুভ সময়</Text>
        {inauspiciousTimes.map((time, index) => (
          <View key={index} style={styles.timeRow}>
            <View style={styles.timeRowLeft}>
              <Ionicons name="warning" size={20} color={time.color} />
              <View style={styles.timeRowText}>
                <Text style={styles.timeRowName}>{time.name}</Text>
                <Text style={styles.timeRowNameBn}>{time.nameBn}</Text>
              </View>
            </View>
            <Text style={[styles.timeRowTime, { color: time.color }]}>{time.time}</Text>
          </View>
        ))}
      </View>

      {/* Tithis Reference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tithis Reference</Text>
        <View style={styles.referenceGrid}>
          {TITHIS.slice(0, 8).map((tithi, index) => (
            <View key={index} style={styles.referenceItem}>
              <Text style={styles.referenceBn}>{tithi.name}</Text>
              <Text style={styles.referenceEn}>{tithi.nameEn}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  dateDisplay: {
    marginTop: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.round,
  },
  dateText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  panchangCard: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  panchangGradient: {
    padding: SPACING.md,
  },
  panchangRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  panchangItem: {
    alignItems: 'center',
    flex: 1,
  },
  panchangLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  panchangValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  panchangValueEn: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: SPACING.md,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  timeLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  timeRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeRowText: {
    marginLeft: SPACING.sm,
  },
  timeRowName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  timeRowNameBn: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  timeRowTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  referenceItem: {
    width: '25%',
    alignItems: 'center',
    padding: SPACING.xs,
    backgroundColor: COLORS.surface,
    margin: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  referenceBn: {
    fontSize: 12,
    color: COLORS.text,
  },
  referenceEn: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
});
