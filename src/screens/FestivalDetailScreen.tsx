import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS, FONTS } from '../constants/theme';
import { Festival, FESTIVALS } from '../constants/festivals';
import FestivalIcon from '../components/FestivalIcon';

interface FestivalDetailScreenProps {
  festival: Festival;
  onBack: () => void;
  language: 'bn' | 'en';
  onFestivalSelect?: (festival: Festival) => void;
}

export default function FestivalDetailScreen({ festival, onBack, language, onFestivalSelect }: FestivalDetailScreenProps) {
  if (!festival) return null;

  // Get all occurrences of THIS festival for different years
  const otherYears = useMemo(() => {
    return FESTIVALS
      .filter(f => f.id === festival.id)
      .sort((a, b) => a.year - b.year);
  }, [festival.id]);

  const getText = (text: string | { bn: string; en: string } | undefined) => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language];
  };

  // Use imageUrl from festival data or fallback to default
  const getFestivalImage = (festival: Festival) => {
    return festival.imageUrl || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* 2nd Header with Back */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>{language === 'bn' ? 'ব্যাক' : 'Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{language === 'bn' ? 'উৎসব বিবরণ' : 'Festival Detail'}</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Festival Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: getFestivalImage(festival) }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        {/* Festival Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleHeader}>
            <FestivalIcon iconPath={festival.icon} color={festival.color} size={56} marginRight={SPACING.md} />
            <View style={styles.titleTextContainer}>
              <Text style={styles.nameBn}>{festival.nameBn}</Text>
              <Text style={styles.nameEn}>{festival.nameEn}</Text>
            </View>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoLabel}>{language === 'bn' ? 'তারিখ' : 'Date'}</Text>
              <Text style={styles.infoValue}>{festival.day}/{festival.month}/{festival.year}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="pricetag-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.infoLabel}>{language === 'bn' ? 'ধরণ' : 'Type'}</Text>
              <Text style={[styles.infoValue, { textTransform: 'capitalize' }]}>{festival.type}</Text>
            </View>
            {festival.isPublicHoliday && (
              <View style={styles.infoItem}>
                <Ionicons name="briefcase-outline" size={20} color={COLORS.accent} />
                <Text style={styles.infoLabel}>{language === 'bn' ? 'ছুটি' : 'Holiday'}</Text>
                <Text style={styles.infoValue}>{language === 'bn' ? 'হ্যাঁ' : 'Yes'}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{language === 'bn' ? 'বর্ণনা' : 'Description'}</Text>
          <Text style={styles.description}>{getText(festival.details?.longDescription || festival.description)}</Text>
        </View>

        {/* Significance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{language === 'bn' ? 'তাৎপর্য' : 'Significance'}</Text>
          <Text style={styles.contentText}>{getText(festival.details?.significance)}</Text>
        </View>

        {/* Traditions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{language === 'bn' ? 'ঐতিহ্য ও রীতি' : 'Traditions & Rituals'}</Text>
          <Text style={styles.contentText}>{getText(festival.details?.traditions)}</Text>
        </View>

        {/* Food Section (Optional) */}
        {festival.details?.food && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{language === 'bn' ? 'খাবার' : 'Traditional Food'}</Text>
            <Text style={styles.contentText}>{getText(festival.details.food)}</Text>
          </View>
        )}

        {/* Multi-Year Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{language === 'bn' ? 'অন্যান্য বছরের তারিখ' : 'Dates for Other Years'}</Text>
          <View style={styles.yearsGrid}>
            {otherYears.map((item) => (
              <TouchableOpacity 
                key={`${item.id}-${item.year}`} 
                style={[
                  styles.yearItem,
                  item.year === festival.year && styles.activeYearItem
                ]}
                onPress={() => onFestivalSelect?.(item)}
              >
                <Text style={[
                  styles.yearText,
                  item.year === festival.year && styles.activeYearText
                ]}>
                  {item.year}
                </Text>
                <Text style={[
                  styles.yearDateText,
                  item.year === festival.year && styles.activeYearDateText
                ]}>
                  {item.day}/{item.month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  yearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  yearItem: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    minWidth: 70,
  },
  activeYearItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  yearText: {
    fontSize: FONTS.sm,
    fontWeight: '700',
    color: COLORS.text,
  },
  activeYearText: {
    color: COLORS.textInverse,
  },
  yearDateText: {
    fontSize: FONTS.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  activeYearDateText: {
    color: COLORS.textInverse,
    opacity: 0.9,
  },
});
