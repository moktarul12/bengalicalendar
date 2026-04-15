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

  const panchangItems = [
    {
      icon: 'sunny',
      label: 'Tithi',
      value: panchangData.tithi.name,
      valueEn: panchangData.tithi.nameEn,
      color: '#FF6B6B',
    },
    {
      icon: 'star',
      label: 'Nakshatra',
      value: panchangData.nakshatra.name,
      valueEn: panchangData.nakshatra.nameEn,
      color: '#4ECDC4',
    },
    {
      icon: 'infinite',
      label: 'Yoga',
      value: panchangData.yoga.name,
      valueEn: panchangData.yoga.nameEn,
      color: '#95E1D3',
    },
    {
      icon: 'time',
      label: 'Karana',
      value: panchangData.karana.name,
      valueEn: panchangData.karana.nameEn,
      color: '#F38181',
    },
  ];

  const sunMoonTimes = [
    { icon: 'sunny-outline', label: 'Sunrise', value: panchangData.sunrise, color: '#FFA726' },
    { icon: 'partly-sunny-outline', label: 'Sunset', value: panchangData.sunset, color: '#FF7043' },
    { icon: 'moon-outline', label: 'Moonrise', value: panchangData.moonrise, color: '#7986CB' },
    { icon: 'cloudy-night-outline', label: 'Moonset', value: panchangData.moonset, color: '#5C6BC0' },
  ];

  const auspiciousTimes = [
    { name: 'Abhijit Muhurta', nameBn: 'অভিজিৎ মুহূর্ত', time: panchangData.abhijit },
    { name: 'Amrit Kalam', nameBn: 'অমৃত কালম', time: '02:00 PM - 03:30 PM' },
    { name: 'Brahma Muhurta', nameBn: 'ব্রহ্ম মুহূর্ত', time: '04:30 AM - 05:15 AM' },
  ];

  const inauspiciousTimes = [
    { name: 'Rahu Kaal', nameBn: 'রাহু কাল', time: panchangData.rahuKaal, color: '#EF5350' },
    { name: 'Yamaganda', nameBn: 'যমগন্ধ', time: panchangData.yamaganda, color: '#FFA726' },
    { name: 'Gulika', nameBn: 'গুলিকা', time: panchangData.gulika, color: '#AB47BC' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="moon" size={48} color="#FFD700" />
        <Text style={styles.headerTitle}>Panchang</Text>
        <Text style={styles.headerSubtitle}>পঞ্জিকা</Text>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar" size={16} color="#FFFFFF" />
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>
      </LinearGradient>

      {/* Panchang Elements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Panchang Elements</Text>
        <View style={styles.panchangList}>
          {panchangItems.map((item, index) => (
            <View key={index} style={styles.panchangCard}>
              <LinearGradient
                colors={[item.color, item.color + 'CC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.panchangIcon}
              >
                <Ionicons name={item.icon as any} size={28} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.panchangInfo}>
                <Text style={styles.panchangLabel}>{item.label}</Text>
                <Text style={styles.panchangValue}>{item.value}</Text>
                <Text style={styles.panchangValueEn}>{item.valueEn}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Sun & Moon Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sun & Moon</Text>
        <View style={styles.sunMoonList}>
          {sunMoonTimes.map((item, index) => (
            <View key={index} style={styles.sunMoonCard}>
              <Ionicons name={item.icon as any} size={32} color={item.color} />
              <View style={styles.sunMoonInfo}>
                <Text style={styles.sunMoonLabel}>{item.label}</Text>
                <Text style={styles.sunMoonValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Auspicious Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auspicious Times</Text>
        <View style={styles.timesContainer}>
          {auspiciousTimes.map((time, index) => (
            <View key={index} style={styles.timeCard}>
              <View style={styles.timeCardLeft}>
                <View style={[styles.timeIcon, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.timeTextContainer}>
                  <Text style={styles.timeName}>{time.name}</Text>
                  <Text style={styles.timeNameBn}>{time.nameBn}</Text>
                </View>
              </View>
              <Text style={styles.timeValue}>{time.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Inauspicious Times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inauspicious Times</Text>
        <View style={styles.timesContainer}>
          {inauspiciousTimes.map((time, index) => (
            <View key={index} style={styles.timeCard}>
              <View style={styles.timeCardLeft}>
                <View style={[styles.timeIcon, { backgroundColor: time.color }]}>
                  <Ionicons name="warning" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.timeTextContainer}>
                  <Text style={styles.timeName}>{time.name}</Text>
                  <Text style={styles.timeNameBn}>{time.nameBn}</Text>
                </View>
              </View>
              <Text style={[styles.timeValue, { color: time.color }]}>{time.time}</Text>
            </View>
          ))}
        </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.round,
    marginTop: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  panchangList: {
    gap: SPACING.sm,
  },
  panchangCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  panchangIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  panchangInfo: {
    flex: 1,
  },
  panchangLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  panchangValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  panchangValueEn: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sunMoonList: {
    gap: SPACING.sm,
  },
  sunMoonCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  sunMoonInfo: {
    flex: 1,
  },
  sunMoonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  sunMoonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  timesContainer: {
    gap: SPACING.sm,
  },
  timeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  timeCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timeTextContainer: {
    flex: 1,
  },
  timeName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  timeNameBn: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  referenceItem: {
    width: '23%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
    alignItems: 'center',
  },
  referenceBn: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  referenceEn: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
