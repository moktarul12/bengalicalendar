import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS, FONTS, toBengaliNumeral } from '../constants/theme';
import { DayEvent } from '../types/events';

interface EventDetailScreenProps {
  event: DayEvent;
  onBack: () => void;
  language: 'bn' | 'en';
}

export default function EventDetailScreen({ event, onBack, language }: EventDetailScreenProps) {
  // Handle device back button to return to home page
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // Prevent default back behavior
    });
    return () => backHandler.remove();
  }, [onBack]);

  if (!event) return null;

  const getEventImage = (type: string, color: string) => {
    // Use a gradient or color-based placeholder for events
    return `https://via.placeholder.com/800x400/${color.replace('#', '')}/FFFFFF?text=${encodeURIComponent(event.titleEn.substring(0, 10))}`;
  };

  const getEventTypeLabel = (type: string): string => {
    switch (type) {
      case 'festival':
        return language === 'bn' ? 'উৎসব' : 'Festival';
      case 'historical':
        return language === 'bn' ? 'ঐতিহাসিক' : 'Historical';
      case 'person':
        return language === 'bn' ? 'ব্যক্তিত্ব' : 'Personality';
      case 'national':
        return language === 'bn' ? 'জাতীয়' : 'National';
      case 'cultural':
        return language === 'bn' ? 'সাংস্কৃতিক' : 'Cultural';
      case 'religious':
        return language === 'bn' ? 'ধর্মীয়' : 'Religious';
      default:
        return type;
    }
  };

  const eventData = event.data as any;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>{language === 'bn' ? 'ব্যাক' : 'Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{language === 'bn' ? 'ইভেন্ট বিবরণ' : 'Event Detail'}</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          {eventData.imageUrl ? (
            <Image 
              source={{ uri: eventData.imageUrl }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: event.color + '20' }]}>
              <Ionicons name="calendar" size={80} color={event.color} />
            </View>
          )}
          <View style={styles.imageOverlay} />
        </View>

        {/* Event Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleHeader}>
            <View style={[styles.iconContainer, { backgroundColor: event.color + '20', borderColor: event.color }]}>
              <Ionicons 
                name={event.type === 'festival' ? 'star' : event.type === 'historical' ? 'book' : 'person'} 
                size={32} 
                color={event.color} 
              />
            </View>
            <View style={styles.titleTextContainer}>
              <Text style={styles.nameBn}>{event.titleBn}</Text>
              <Text style={styles.nameEn}>{event.titleEn}</Text>
            </View>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoLabel}>{language === 'bn' ? 'তারিখ' : 'Date'}</Text>
              <Text style={styles.infoValue}>{event.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="pricetag-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.infoLabel}>{language === 'bn' ? 'ধরণ' : 'Type'}</Text>
              <Text style={[styles.infoValue, { textTransform: 'capitalize' }]}>{getEventTypeLabel(event.type)}</Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{language === 'bn' ? 'বর্ণনা' : 'Description'}</Text>
          <Text style={styles.description}>{eventData.descriptionEn || ''}</Text>
          <Text style={[styles.description, { color: COLORS.textSecondary, marginTop: SPACING.sm }]}>
            {eventData.descriptionBn || ''}
          </Text>
        </View>

        {/* Additional Info if available */}
        {eventData.year && eventData.year !== 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{language === 'bn' ? 'বছর' : 'Year'}</Text>
            <Text style={styles.contentText}>{language === 'bn' ? toBengaliNumeral(eventData.year) : eventData.year}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  backText: {
    fontSize: FONTS.md,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: 'bold',
    color: COLORS.textBengali,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  titleCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: -40,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginRight: SPACING.md,
  },
  titleTextContainer: {
    flex: 1,
  },
  nameBn: {
    fontSize: FONTS.display,
    fontWeight: 'bold',
    color: COLORS.textBengali,
  },
  nameEn: {
    fontSize: FONTS.lg,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  infoGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.lg,
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  section: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.xs,
  },
  sectionTitle: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: 'bold',
    color: COLORS.textBengali,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    paddingLeft: SPACING.sm,
  },
  description: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.text,
    lineHeight: 24,
  },
  contentText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
