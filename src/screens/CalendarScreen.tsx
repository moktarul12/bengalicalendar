import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../constants/theme';
import { generateCalendarGrid, getMonthName } from '../utils/calendarUtils';
import { gregorianToBengali } from '../constants/bengaliCalendar';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import CalendarTypeToggle from '../components/CalendarTypeToggle';
import UpcomingFestivals from '../components/UpcomingFestivals';
import DayDetailModal from '../components/DayDetailModal';
import { CalendarDay } from '../types';

interface CalendarScreenProps {
  onDaySelect?: (day: CalendarDay) => void;
}

export default function CalendarScreen({ onDaySelect }: CalendarScreenProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarType, setCalendarType] = useState<'gregorian' | 'bengali'>('gregorian');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get Bengali date for current month
  const bengaliDate = gregorianToBengali(today.getDate(), currentMonth, currentYear);

  // Check if current month/year is being displayed
  const isCurrentMonth = currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();

  useEffect(() => {
    const days = generateCalendarGrid(currentYear, currentMonth);
    setCalendarDays(days);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth() + 1);
    setCurrentYear(now.getFullYear());
  }, []);

  const handleDayPress = useCallback((day: CalendarDay) => {
    setSelectedDay(day);
    setIsModalVisible(true);
    onDaySelect?.(day);
  }, [onDaySelect]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCalendarTypeChange = useCallback((type: 'gregorian' | 'bengali') => {
    setCalendarType(type);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Decorative Header Section - Compact */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerSection}
        >
          {/* Bengali Pattern Decoration */}
          <View style={styles.patternDecoration}>
            <View style={styles.patternLine} />
            <View style={[styles.patternLine, { marginTop: 4 }]} />
            <View style={[styles.patternLine, { marginTop: 4 }]} />
          </View>

          {/* Compact Greeting & Clock Row */}
          <View style={styles.compactHeaderRow}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>
                {currentTime.getHours() < 12 ? 'শুভ সকাল' : currentTime.getHours() < 17 ? 'শুভ দুপুর' : 'শুভ সন্ধ্যা'}
              </Text>
              <Text style={styles.greetingSubtext}>
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>

            {/* Compact Clock */}
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.compactClock}
            >
              <Ionicons name="time-outline" size={24} color="#FFFFFF" />
              <Text style={styles.compactClockTime}>
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
            </LinearGradient>
          </View>
        </LinearGradient>

        {/* Calendar Type Toggle - Compact */}
        <View style={styles.toggleCard}>
          <CalendarTypeToggle
            value={calendarType}
            onChange={handleCalendarTypeChange}
          />
        </View>

        {/* Calendar Card - Main Content */}
        <View style={styles.calendarCard}>
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            monthName={getMonthName(currentMonth)}
            bengaliYear={bengaliDate.year}
            bengaliMonth={bengaliDate.month}
            calendarType={calendarType}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
            isCurrentMonth={isCurrentMonth}
          />

          <CalendarGrid
            days={calendarDays}
            calendarType={calendarType}
            onDayPress={handleDayPress}
          />
        </View>

        {/* Upcoming Festivals Card */}
        <View style={styles.festivalsCard}>
          <UpcomingFestivals
            currentMonth={today.getMonth() + 1}
            currentDay={today.getDate()}
          />
        </View>
      </ScrollView>

      {/* Day Detail Modal */}
      <DayDetailModal
        visible={isModalVisible}
        day={selectedDay}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  headerSection: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
    borderBottomRightRadius: BORDER_RADIUS.lg,
  },
  patternDecoration: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    opacity: 0.3,
  },
  patternLine: {
    width: 40,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  compactHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  greetingSubtext: {
    fontSize: FONTS.caption,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  compactClock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  compactClockTime: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: SPACING.xs,
  },
  toggleCard: {
    marginTop: -SPACING.md,
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xs,
    ...SHADOWS.md,
  },
  calendarCard: {
    marginHorizontal: 0,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 0,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  festivalsCard: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
});
