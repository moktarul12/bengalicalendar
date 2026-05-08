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
  onToday,
  isCurrentMonth,
  onMonthYearPress,
  language,
}: TraditionalCalendarHeaderProps) {
  const bengaliMonthData = BENGALI_MONTHS[bengaliMonth];

  return (
    <View style={styles.container}>
      {/* Traditional Indian Calendar Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onPrevMonth}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="chevron-back" size={24} color="#424242" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={onMonthYearPress}>
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

        
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={onNextMonth}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="chevron-forward" size={24} color="#424242" />
        </TouchableOpacity>
      </View>

      {/* Today indicator bar */}
      {!isCurrentMonth && (
        <TouchableOpacity style={styles.todayBar} onPress={onToday} activeOpacity={0.8}>
          <View style={styles.todayBarContent}>
            <Ionicons name="calendar" size={16} color="#C62828" />
            <Text style={styles.todayBarText}>
              {language === 'bn' ? 'আজকের দিনে যান' : 'Go to Today'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#E0E0E0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C62828', // Red for month name like traditional calendars
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  secondaryTitle: {
    fontSize: 18,
    color: '#1A237E', // Blue for secondary
    marginTop: 2,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  infoLine: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
    fontWeight: '500',
  },
  todayBar: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  todayBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  todayBarText: {
    fontSize: 14,
    color: '#C62828',
    fontWeight: '600',
  },
});
