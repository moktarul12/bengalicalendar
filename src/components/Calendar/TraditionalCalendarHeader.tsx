import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { BENGALI_MONTHS, toBengaliNumber } from '../../constants/bengaliCalendar';

interface TraditionalCalendarHeaderProps {
  year: number;
  month: number;
  monthName: string;
  bengaliYear: number;
  bengaliMonth: number;
  calendarType: 'gregorian' | 'bengali';
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  isCurrentMonth: boolean;
  onMonthYearPress: () => void;
  language: 'bn' | 'en';
}

export default function TraditionalCalendarHeader({
  year,
  month,
  monthName,
  bengaliYear,
  bengaliMonth,
  calendarType,
  onPrevMonth,
  onNextMonth,
  isCurrentMonth,
  language,
}: TraditionalCalendarHeaderProps) {
  const bengaliMonthData = BENGALI_MONTHS[bengaliMonth];

  return (
    <View style={styles.container}>
      {/* Traditional Blue Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onPrevMonth}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          {/* Main Title - Large and Bold */}
          <Text style={styles.mainTitle}>
            {calendarType === 'gregorian' ? (
              <>{monthName.toUpperCase()} {year}</>
            ) : (
              <>{bengaliMonthData?.name} {toBengaliNumber(bengaliYear)}</>
            )}
          </Text>

          {/* Secondary Title - Smaller */}
          <Text style={styles.secondaryTitle}>
            {calendarType === 'gregorian' ? (
              <>{bengaliMonthData?.name} {toBengaliNumber(bengaliYear)}</>
            ) : (
              <>{monthName} {year}</>
            )}
          </Text>

          {/* Optional: Extra info line */}
          <Text style={styles.infoLine}>
            {language === 'bn' ? 'বাংলা বর্ষপঞ্জি' : 'Bengali Calendar'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={onNextMonth}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Today indicator bar */}
      {!isCurrentMonth && (
        <TouchableOpacity style={styles.todayBar} onPress={() => {}}>
          <Text style={styles.todayBarText}>
            {language === 'bn' ? 'আজকের দিনে যান' : 'Go to Today'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a237e', // Traditional dark blue
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontWeight: '600',
  },
  infoLine: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  todayBar: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  todayBarText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
