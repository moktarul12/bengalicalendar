import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS, toBengaliNumeral } from '../constants/theme';
import { gregorianToBengali } from '../constants/bengaliCalendar';
import { getEventsByDate } from '../utils/eventUtils';
import { DayEvent, HistoricalEvent, FamousPerson } from '../types/events';
import { Festival } from '../constants/festivals';
import FestivalIcon from '../components/FestivalIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface DayDetailScreenProps {
  visible: boolean;
  day: number;
  month: number;
  year: number;
  onClose: () => void;
  onEventPress?: (event: DayEvent) => void;
}

export default function DayDetailScreen({ visible, day, month, year, onClose, onEventPress }: DayDetailScreenProps) {
  const { language } = useLanguage();
  const [events, setEvents] = useState<DayEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const bengaliDate = gregorianToBengali(day, month, year);

  useEffect(() => {
    if (visible) {
      loadEvents();
    }
  }, [visible, day, month, year]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEventsByDate(day, month, year);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (event: DayEvent) => {
    onEventPress?.(event);
  };

  const renderEventIcon = (event: DayEvent) => {
    if (event.type === 'festival') {
      const festival = event.data as Festival;
      return <FestivalIcon iconPath={festival.icon} color={event.color} size={48} />;
    } else if (event.type === 'historical') {
      return (
        <View style={[styles.iconPlaceholder, { backgroundColor: event.color + '20', borderColor: event.color }]}>
          <Ionicons name="book" size={24} color={event.color} />
        </View>
      );
    } else {
      return (
        <View style={[styles.iconPlaceholder, { backgroundColor: event.color + '20', borderColor: event.color }]}>
          <Ionicons name="person" size={24} color={event.color} />
        </View>
      );
    }
  };

  const getEventTypeLabel = (type: string): string => {
    switch (type) {
      case 'festival':
        return language === 'bn' ? 'উৎসব' : 'Festival';
      case 'historical':
        return language === 'bn' ? 'ঐতিহাসিক' : 'Historical';
      case 'person':
        return language === 'bn' ? 'ব্যক্তিত্ব' : 'Personality';
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.dateDisplay}>
                <Text style={styles.dayNumber}>{day}</Text>
                <View style={styles.dateSeparator} />
                <View style={styles.bengaliDateSection}>
                  <Text style={styles.bengaliDay}>{toBengaliNumeral(bengaliDate.day)}</Text>
                  <Text style={styles.bengaliMonth}>{bengaliDate.month}</Text>
                </View>
              </View>
              <View style={styles.yearSection}>
                <Text style={styles.monthName}>
                  {new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long' })}
                </Text>
                <Text style={styles.yearText}>{year}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {/* Events List */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={styles.loadingState}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>
                  {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
                </Text>
              </View>
            ) : events.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color={COLORS.textMuted} />
                <Text style={styles.emptyText}>
                  {language === 'bn' ? 'আজ কোন ইভেন্ট নেই' : 'No events today'}
                </Text>
              </View>
            ) : (
              events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => handleEventPress(event)}
                  activeOpacity={0.7}
                >
                  <View style={styles.eventLeft}>
                    {renderEventIcon(event)}
                  </View>
                  
                  <View style={styles.eventContent}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventType}>{getEventTypeLabel(event.type)}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                    </View>
                    <Text style={styles.eventTitleBn}>{event.titleBn}</Text>
                    <Text style={styles.eventTitleEn}>{event.titleEn}</Text>
                  </View>

                  <View style={styles.eventRight}>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '80%',
    ...SHADOWS.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.xs,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  dateSeparator: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  bengaliDateSection: {
    alignItems: 'center',
  },
  bengaliDay: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textBengali,
  },
  bengaliMonth: {
    fontSize: FONTS.bengali,
    color: COLORS.textSecondary,
  },
  yearSection: {
    alignItems: 'flex-end',
  },
  monthName: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
  },
  yearText: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.md,
    maxHeight: 400,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyText: {
    fontSize: FONTS.body,
    color: COLORS.textMuted,
    marginTop: SPACING.md,
  },
  loadingState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  loadingText: {
    fontSize: FONTS.body,
    color: COLORS.textMuted,
    marginTop: SPACING.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.xs,
  },
  eventLeft: {
    marginRight: SPACING.md,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  eventType: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  eventDate: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    marginLeft: SPACING.sm,
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
  eventRight: {
    marginLeft: SPACING.sm,
  },
});
