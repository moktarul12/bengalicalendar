import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../constants/theme';
import { BENGALI_MONTHS, gregorianToBengali, toBengaliNumber } from '../constants/bengaliCalendar';

export default function PanchangScreen() {
  const today = new Date();
  const bengaliDate = gregorianToBengali(today.getDate(), today.getMonth() + 1, today.getFullYear());
  const bengaliMonthName = BENGALI_MONTHS[bengaliDate.month]?.name || '';

  // Simulated Panchang data
  const panchangData = {
    tithi: { name: 'প্রতিপদ', nameEn: 'Pratipada', endTime: '১০:৩০' },
    nakshatra: { name: 'অশ্বিনী', nameEn: 'Ashwini', endTime: '১২:৪৫' },
    yoga: { name: 'বিষ্ণু', nameEn: 'Vishkumbha', endTime: '০২:১৫' },
    karana: { name: 'বব', nameEn: 'Bava', endTime: '১১:১৫' },
  };

  const sunMoonData = {
    sunrise: '০৫:৪৫',
    sunset: '০৬:১৫',
    moonrise: '০৭:৩০',
    moonset: '০৮:৪৫',
  };

  const auspiciousTimes = [
    { name: 'অভিজিৎ মুহূর্ত', nameEn: 'Abhijit Muhurta', time: '১১:৪৫ - ১২:৩০', icon: 'sunny' },
    { name: 'অমৃত কালম', nameEn: 'Amrit Kalam', time: '০২:০০ - ০৩:৩০', icon: 'time' },
    { name: 'ব্রহ্ম মুহূর্ত', nameEn: 'Brahma Muhurta', time: '০৪:৩০ - ০৫:১৫', icon: 'sparkles' },
  ];

  const inauspiciousTimes = [
    { name: 'রাহু কাল', nameEn: 'Rahu Kaal', time: '০৯:০০ - ১০:৩০', icon: 'warning' },
    { name: 'যমগন্ধ', nameEn: 'Yamaganda', time: '১২:৩০ - ০২:০০', icon: 'alert' },
    { name: 'গুলিকা', nameEn: 'Gulika', time: '০৩:০০ - ০৪:৩০', icon: 'close-circle' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="moon" size={48} color={COLORS.primary} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>পঞ্জিকা</Text>
            <Text style={styles.headerSubtitle}>Panchang</Text>
          </View>
        </View>
        <View style={styles.dateBadge}>
          <Text style={styles.dateBengali}>
            {toBengaliNumber(bengaliDate.day)} {bengaliMonthName}
          </Text>
          <Text style={styles.dateEnglish}>
            {today.getDate()} {today.toLocaleDateString('en-US', { month: 'short' })}
          </Text>
        </View>
      </View>

      {/* Panchang Elements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>পঞ্চাঙ্গ উপাদান</Text>
        </View>
        <View style={styles.panchangGrid2x2}>
          <View style={styles.panchangCard}>
            <View style={[styles.panchangIcon, { backgroundColor: COLORS.primarySoft }]}>
              <Ionicons name="sunny" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.panchangInfo}>
              <Text style={styles.panchangLabel}>তিথি</Text>
              <Text style={styles.panchangValue}>{panchangData.tithi.name}</Text>
              <Text style={styles.panchangValueEn}>{panchangData.tithi.nameEn}</Text>
              <Text style={styles.endTime}>সমাপ্ত: {panchangData.tithi.endTime}</Text>
            </View>
          </View>

          <View style={styles.panchangCard}>
            <View style={[styles.panchangIcon, { backgroundColor: COLORS.secondarySoft }]}>
              <Ionicons name="star" size={24} color={COLORS.secondaryDark} />
            </View>
            <View style={styles.panchangInfo}>
              <Text style={styles.panchangLabel}>নক্ষত্র</Text>
              <Text style={styles.panchangValue}>{panchangData.nakshatra.name}</Text>
              <Text style={styles.panchangValueEn}>{panchangData.nakshatra.nameEn}</Text>
              <Text style={styles.endTime}>সমাপ্ত: {panchangData.nakshatra.endTime}</Text>
            </View>
          </View>

          <View style={styles.panchangCard}>
            <View style={[styles.panchangIcon, { backgroundColor: COLORS.accentSoft }]}>
              <Ionicons name="infinite" size={24} color={COLORS.accent} />
            </View>
            <View style={styles.panchangInfo}>
              <Text style={styles.panchangLabel}>যোগ</Text>
              <Text style={styles.panchangValue}>{panchangData.yoga.name}</Text>
              <Text style={styles.panchangValueEn}>{panchangData.yoga.nameEn}</Text>
              <Text style={styles.endTime}>সমাপ্ত: {panchangData.yoga.endTime}</Text>
            </View>
          </View>

          <View style={styles.panchangCard}>
            <View style={[styles.panchangIcon, { backgroundColor: COLORS.festivalNational + '20' }]}>
              <Ionicons name="time" size={24} color={COLORS.festivalNational} />
            </View>
            <View style={styles.panchangInfo}>
              <Text style={styles.panchangLabel}>করণ</Text>
              <Text style={styles.panchangValue}>{panchangData.karana.name}</Text>
              <Text style={styles.panchangValueEn}>{panchangData.karana.nameEn}</Text>
              <Text style={styles.endTime}>সমাপ্ত: {panchangData.karana.endTime}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sun & Moon */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="partly-sunny-outline" size={20} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>সূর্য ও চাঁদ</Text>
        </View>
        <View style={styles.sunMoonGrid}>
          <View style={styles.sunMoonCard}>
            <Ionicons name="sunny-outline" size={32} color={COLORS.primary} />
            <Text style={styles.sunMoonLabel}>সূর্যোদয়</Text>
            <Text style={styles.sunMoonValue}>{sunMoonData.sunrise}</Text>
          </View>
          <View style={styles.sunMoonCard}>
            <Ionicons name="partly-sunny-outline" size={32} color={COLORS.secondary} />
            <Text style={styles.sunMoonLabel}>সূর্যাস্ত</Text>
            <Text style={styles.sunMoonValue}>{sunMoonData.sunset}</Text>
          </View>
          <View style={styles.sunMoonCard}>
            <Ionicons name="moon-outline" size={32} color={COLORS.textSecondary} />
            <Text style={styles.sunMoonLabel}>চন্দ্রোদয়</Text>
            <Text style={styles.sunMoonValue}>{sunMoonData.moonrise}</Text>
          </View>
          <View style={styles.sunMoonCard}>
            <Ionicons name="cloudy-night-outline" size={32} color={COLORS.textMuted} />
            <Text style={styles.sunMoonLabel}>চন্দ্রাস্ত</Text>
            <Text style={styles.sunMoonValue}>{sunMoonData.moonset}</Text>
          </View>
        </View>
      </View>

      {/* Auspicious Times */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="sparkles" size={20} color={COLORS.festivalReligious} />
          <Text style={styles.sectionTitle}>শুভ সময়</Text>
        </View>
        <View style={styles.timesContainer}>
          {auspiciousTimes.map((time, index) => (
            <View key={index} style={styles.timeCard}>
              <View style={styles.timeLeft}>
                <View style={[styles.timeIcon, { backgroundColor: COLORS.festivalReligious + '20' }]}>
                  <Ionicons name={time.icon as any} size={20} color={COLORS.festivalReligious} />
                </View>
                <View style={styles.timeInfo}>
                  <Text style={styles.timeNameBn}>{time.name}</Text>
                  <Text style={styles.timeNameEn}>{time.nameEn}</Text>
                </View>
              </View>
              <Text style={styles.timeValue}>{time.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Inauspicious Times */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="warning" size={20} color={COLORS.festivalNational} />
          <Text style={styles.sectionTitle}>অশুভ সময়</Text>
        </View>
        <View style={styles.timesContainer}>
          {inauspiciousTimes.map((time, index) => (
            <View key={index} style={styles.timeCard}>
              <View style={styles.timeLeft}>
                <View style={[styles.timeIcon, { backgroundColor: COLORS.festivalNational + '20' }]}>
                  <Ionicons name={time.icon as any} size={20} color={COLORS.festivalNational} />
                </View>
                <View style={styles.timeInfo}>
                  <Text style={styles.timeNameBn}>{time.name}</Text>
                  <Text style={styles.timeNameEn}>{time.nameEn}</Text>
                </View>
              </View>
              <Text style={[styles.timeValue, { color: COLORS.festivalNational }]}>{time.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer Note */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          সময় স্থানীয় সময় অনুযায়ী পরিবর্তিত হতে পারে।
        </Text>
        <Text style={styles.footerTextEn}>
          Times may vary based on local location.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerText: {
    marginLeft: SPACING.md,
  },
  headerTitle: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: 'bold',
    color: COLORS.textBengali,
  },
  headerSubtitle: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
  },
  dateBadge: {
    backgroundColor: COLORS.primarySoft,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  dateBengali: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.primary,
  },
  dateEnglish: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  panchangGrid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  panchangCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
    width: '45%',
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
  },
  panchangIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  panchangInfo: {
    flex: 1,
  },
  panchangLabel: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
  },
  panchangValue: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
    marginTop: 2,
  },
  panchangValueEn: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  endTime: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sunMoonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  sunMoonCard: {
    width: '45%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    marginVertical: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
  },
  
  sunMoonLabel: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  sunMoonValue: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
    marginTop: 2,
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
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeIcon: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timeInfo: {
    flex: 1,
  },
  timeNameBn: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  timeNameEn: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
  },
  timeValue: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.text,
  },
  footerNote: {
    padding: SPACING.lg,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  footerTextEn: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
