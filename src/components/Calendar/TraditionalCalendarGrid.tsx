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

  // Get tithi info (simplified - you can expand this)
  const tithiText = language === 'bn' ? `${toBengaliNumber(bengali.day)}` : `${bengali.day}`;

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

      {/* Tithi/Nakshatra info */}
      <Text style={styles.tithiText} numberOfLines={1}>
        {tithiText}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1a237e', // Dark blue border like traditional calendars
  },
  weekHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a237e', // Dark blue header
    paddingVertical: SPACING.xs,
  },
  weekHeaderCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  weekendHeaderText: {
    color: '#ff6b6b', // Red for weekend headers
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
    borderRightColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  todayCell: {
    backgroundColor: '#fff3e0',
  },
  holidayCell: {
    backgroundColor: '#ffebee',
  },
  mainDate: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a237e', // Blue for regular days
  },
  weekendDate: {
    color: '#d32f2f', // Red for weekends
  },
  holidayDate: {
    color: '#d32f2f', // Red for holidays
  },
  todayDate: {
    color: '#e65100',
    textDecorationLine: 'underline',
  },
  secondaryDate: {
    fontSize: 10,
    color: '#757575',
    marginTop: 1,
  },
  tithiText: {
    fontSize: 8,
    color: '#9e9e9e',
    marginTop: 2,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 2,
    gap: 2,
  },
  festivalDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  holidayIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#d32f2f',
  },
});
