import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS, getGreeting, toBengaliNumeral } from '../constants/theme';
import { generateCalendarGrid, getMonthName } from '../utils/calendarUtils';
import { BENGALI_MONTHS, gregorianToBengali } from '../constants/bengaliCalendar';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import CalendarTypeToggle from '../components/CalendarTypeToggle';
import MonthYearPickerModal from '../components/MonthYearPickerModal';
import UpcomingFestivals from '../components/UpcomingFestivals';
import DayDetailScreen from './DayDetailScreen';
import FestivalDetailScreen from './FestivalDetailScreen';
import EventDetailScreen from './EventDetailScreen';
import { CalendarDay } from '../types';
import { Festival } from '../constants/festivals';
import { DayEvent } from '../types/events';
import { getEventsByDate } from '../utils/eventUtils';

interface CalendarScreenProps {
  onDaySelect?: (day: CalendarDay) => void;
}

export default function CalendarScreen({ onDaySelect }: CalendarScreenProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarType, setCalendarType] = useState<'gregorian' | 'bengali'>('bengali');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMonthYearPickerVisible, setIsMonthYearPickerVisible] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);
  const [dayDetailVisible, setDayDetailVisible] = useState(false);
  const [showFestivalDetail, setShowFestivalDetail] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const bengaliDateToday = gregorianToBengali(today.getDate(), today.getMonth() + 1, today.getFullYear());
  const bengaliMonthNameToday = BENGALI_MONTHS[bengaliDateToday.month]?.name || '';
  const bengaliDateForDisplayedMonth = gregorianToBengali(15, currentMonth, currentYear);
  const greeting = getGreeting(currentTime.getHours());
  const isCurrentMonth = currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();

  useEffect(() => {
    const days = generateCalendarGrid(currentYear, currentMonth);
    setCalendarDays(days);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
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
    // Only show the detail modal if there are festivals on that day
    if (day.festivals && day.festivals.length > 0) {
      setSelectedDay(day);
      setDayDetailVisible(true);
    }
    onDaySelect?.(day);
  }, [onDaySelect]);

  const handleCalendarTypeChange = useCallback((type: 'gregorian' | 'bengali') => {
    setCalendarType(type);
  }, []);

  const handleMonthYearPress = useCallback(() => {
    setIsMonthYearPickerVisible(true);
  }, []);

  const handleMonthYearSelect = useCallback((month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setIsMonthYearPickerVisible(false);
  }, []);

  const handleMonthYearPickerClose = useCallback(() => {
    setIsMonthYearPickerVisible(false);
  }, []);

  const handleEventPress = useCallback((event: DayEvent) => {
    if (event.type === 'festival') {
      setSelectedFestival(event.data as Festival);
      setShowFestivalDetail(true);
    } else {
      setSelectedEvent(event);
      setShowEventDetail(true);
    }
  }, []);

  const handleFestivalDateChange = useCallback((festivalId: string, year: number, month: number, day: number) => {
    // Update the festival date in the local data
    // This is a placeholder - you may want to persist this to storage or API
    console.log('Festival date changed:', festivalId, year, month, day);
    
    // Refresh the calendar to show updated date
    setRefreshKey(prev => prev + 1);
  }, []);

  if (showFestivalDetail && selectedFestival) {
    return (
      <FestivalDetailScreen 
        festival={selectedFestival} 
        onBack={() => setShowFestivalDetail(false)}
        language={calendarType === 'bengali' ? 'bn' : 'en'}
        onDateChange={handleFestivalDateChange}
        onFestivalSelect={(festival) => setSelectedFestival(festival)}
      />
    );
  }

  if (showEventDetail && selectedEvent) {
    return (
      <EventDetailScreen 
        event={selectedEvent} 
        onBack={() => setShowEventDetail(false)}
        language={calendarType === 'bengali' ? 'bn' : 'en'}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header - Bengali Date Display */}
        <View style={styles.header}>
          <View style={styles.headerBackdrop} />
          <View style={styles.headerShapeA} />
          <View style={styles.headerShapeB} />
          <View style={styles.headerShapeC} />
          <View style={styles.headerTopRow}>
            <Text style={styles.greetingText}>{greeting.bn}</Text>
            <CalendarTypeToggle
              value={calendarType}
              onChange={handleCalendarTypeChange}
            />
          </View>

          <View style={styles.dateSection}>
            <View style={styles.bengaliDateBlock}>
              <Text style={styles.bengaliDay}>{toBengaliNumeral(bengaliDateToday.day)}</Text>
              <View style={styles.monthYearSection}>
                <Text style={styles.bengaliMonth}>{bengaliMonthNameToday}</Text>
                <Text style={styles.bengaliYear}>{toBengaliNumeral(bengaliDateToday.year)} বসর</Text>
              </View>
            </View>
            {!isCurrentMonth && (
              <TouchableOpacity style={styles.todayButtonCenter} onPress={goToToday}>
                <Ionicons name="today" size={16} color={COLORS.primary} />
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
            )}
            <View style={styles.gregorianDateBlock}>
              <Text style={styles.gregorianDay}>{today.getDate()}</Text>
              <Text style={styles.gregorianMonth}>
                {today.toLocaleDateString('en-US', { month: 'short' })} {today.getFullYear()}
              </Text>
            </View>
          </View>
        </View>

        {/* Calendar Section - Always Visible */}
        <View style={styles.calendarSection}>
          {/* Calendar Header */}
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            monthName={getMonthName(currentMonth)}
            bengaliYear={bengaliDateForDisplayedMonth.year}
            bengaliMonth={bengaliDateForDisplayedMonth.month}
            calendarType={calendarType}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
            isCurrentMonth={isCurrentMonth}
            onMonthYearPress={handleMonthYearPress}
          />

          {/* Calendar Grid */}
          <CalendarGrid
            days={calendarDays}
            calendarType={calendarType}
            onDayPress={handleDayPress}
          />
        </View>

        {/* Upcoming Festivals */}
        <UpcomingFestivals
          currentMonth={today.getMonth() + 1}
          currentDay={today.getDate()}
          currentYear={today.getFullYear()}
          onFestivalPress={(festival) => {
            setSelectedFestival(festival);
            setShowFestivalDetail(true);
          }}
        />
      </ScrollView>

      {/* Month Year Picker Modal */}
      <MonthYearPickerModal
        visible={isMonthYearPickerVisible}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onSelect={handleMonthYearSelect}
        onClose={handleMonthYearPickerClose}
      />

      {/* Day Detail Screen */}
      <DayDetailScreen
        visible={dayDetailVisible}
        day={selectedDay?.gregorian.day || today.getDate()}
        month={currentMonth}
        year={currentYear}
        onClose={() => setDayDetailVisible(false)}
        onEventPress={handleEventPress} language={'bn'}      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.surfaceAlt,
  },
  headerShapeA: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 180,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '10',
    transform: [{ rotate: '18deg' }],
  },
  headerShapeB: {
    position: 'absolute',
    bottom: -55,
    left: -70,
    width: 220,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.secondary + '10',
    transform: [{ rotate: '-14deg' }],
  },
  headerShapeC: {
    position: 'absolute',
    top: 18,
    left: 24,
    width: 140,
    height: 140,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.accent + '12',
    backgroundColor: '#FFFFFF' + '00',
    transform: [{ rotate: '10deg' }],
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bengaliDateBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gregorianDateBlock: {
    alignItems: 'flex-end',
  },
  bengaliDay: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  monthYearSection: {
    marginLeft: SPACING.sm,
  },
  bengaliMonth: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  bengaliYear: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
  },
  gregorianSection: {
    alignItems: 'flex-end',
  },
  gregorianDay: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  gregorianMonth: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
  },
  greetingText: {
    fontSize: FONTS.bengaliLarge,
    color: COLORS.textBengali,
    fontWeight: '600',
  },
  todayButtonCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  calendarSection: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  todayButtonText: {
    fontSize: FONTS.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  eventsSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
  },
  eventColorBar: {
    width: 4,
    height: '100%',
    minHeight: 50,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
  },
  eventContent: {
    flex: 1,
  },
  eventTitleBn: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  eventTitleEn: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  noEvents: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textMuted,
  },
});
