import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { toBengaliNumber } from '../../constants/bengaliCalendar';
import { CalendarDay as CalendarDayType } from '../../types';

interface TraditionalCalendarGridProps {
  days: CalendarDayType[];
  calendarType: 'gregorian' | 'bengali';
  onDayPress: (day: CalendarDayType) => void;
  language: 'bn' | 'en';
}

const weekDaysEn = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const weekDaysBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

export default function TraditionalCalendarGrid({ 
  days, 
  calendarType, 
  onDayPress,
  language 
}: TraditionalCalendarGridProps) {
  // Group days into weeks (7 days each)
  const weeks: (CalendarDayType | null)[][] = [];
  let currentWeek: (CalendarDayType | null)[] = [];

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Add remaining days if any
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const weekDays = calendarType === 'gregorian' ? weekDaysEn : weekDaysBn;

  return (
    <View style={styles.container}>
      {/* Week Header */}
      <View style={styles.weekHeader}>
        {weekDays.map((day, index) => (
          <View key={day} style={styles.weekHeaderCell}>
            <Text 
              style={[
                styles.weekHeaderText,
                (index === 0 || index === 6) && styles.weekendHeaderText
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TraditionalCalendarDay
                key={`${weekIndex}-${dayIndex}`}
                day={day}
                calendarType={calendarType}
                onPress={onDayPress}
                isWeekend={dayIndex === 0 || dayIndex === 6}
                language={language}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

interface TraditionalCalendarDayProps {
  day: CalendarDayType | null;
  calendarType: 'gregorian' | 'bengali';
  onPress: (day: CalendarDayType) => void;
  isWeekend: boolean;
  language: 'bn' | 'en';
}

function TraditionalCalendarDay({ 
  day, 
  calendarType, 
  onPress, 
  isWeekend,
  language 
}: TraditionalCalendarDayProps) {
  if (!day || !day.gregorian) {
    return <View style={styles.emptyCell} />;
  }

  const { gregorian, bengali, festivals, isToday, isHoliday } = day;
  const mainDay = calendarType === 'bengali' ? bengali.day : gregorian.day;
  const secondaryDay = calendarType === 'bengali' ? gregorian.day : bengali.day;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isToday && styles.todayCell,
        isHoliday && styles.holidayCell,
      ]}
      onPress={() => onPress(day)}
      activeOpacity={0.7}
    >
      {/* Main Date Number */}
      <Text
        style={[
          styles.mainDate,
          isWeekend && styles.weekendDate,
          isHoliday && styles.holidayDate,
          isToday && styles.todayDate,
        ]}
      >
        {calendarType === 'bengali' ? toBengaliNumber(mainDay) : mainDay}
      </Text>

      {/* Secondary Date (smaller) */}
      <Text style={styles.secondaryDate}>
        {calendarType === 'bengali' ? secondaryDay : toBengaliNumber(secondaryDay)}
      </Text>

      {/* Festival/Holiday indicator */}
      {(festivals.length > 0 || isHoliday) && (
        <View style={styles.indicatorContainer}>
          {festivals.length > 0 && (
            <View style={[styles.festivalDot, { backgroundColor: festivals[0].color }]} />
          )}
          {isHoliday && <View style={styles.holidayIndicator} />}
        </View>
      )}

      {/* Festival name text */}
      {festivals.length > 0 && (
        <Text style={styles.festivalName} numberOfLines={1}>
          {language === 'bn' ? festivals[0].nameBn : festivals[0].nameEn}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  weekHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5', // Light gray header
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Gray border
  },
  weekHeaderCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A237E', // Blue for weekdays
    textTransform: 'uppercase',
  },
  weekendHeaderText: {
    color: '#C62828', // Red for Sunday headers
    fontWeight: '800',
  },
  grid: {
    backgroundColor: '#FFFFFF',
  },
  weekRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  emptyCell: {
    flex: 1,
    aspectRatio: 0.75,
    backgroundColor: '#f5f5f5',
  },
  cell: {
    flex: 1,
    aspectRatio: 0.75,
    padding: 2,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 3,
  },
  todayCell: {
    backgroundColor: '#FFECB3', // Warm amber highlight for today
    borderRadius: 4,
  },
  holidayCell: {
    backgroundColor: '#ffebee',
  },
  mainDate: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A237E', // Blue for regular days
  },
  weekendDate: {
    color: '#C62828', // Red for weekends - matching header
  },
  holidayDate: {
    color: '#C62828', // Red for holidays
  },
  todayDate: {
    color: '#E65100', // Deep orange for today
    fontWeight: '800',
  },
  secondaryDate: {
    fontSize: 15,
    color: '#9E9E9E',
    marginTop: 2,
    fontWeight: '500',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 3,
  },
  festivalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  holidayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C62828',
  },
  festivalName: {
    fontSize: 8,
    color: '#757575',
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '400',
  },
});
