import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS, FONTS } from '../constants/theme';
import { Festival } from '../constants/festivals';
import FestivalIcon from './FestivalIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface FestivalDetailModalProps {
  festival: Festival | null;
  visible: boolean;
  onClose: () => void;
}

export default function FestivalDetailModal({ festival, visible, onClose }: FestivalDetailModalProps) {
  const { language, toggleLanguage } = useLanguage();

  if (!festival) return null;

  const getText = (text: string | { bn: string; en: string } | undefined) => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header - Flat design */}
          <View style={[styles.header, { borderBottomColor: festival.color }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <Ionicons name="language" size={18} color={COLORS.primary} />
              <Text style={styles.languageButtonText}>{language === 'bn' ? 'EN' : 'BN'}</Text>
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <FestivalIcon iconPath={festival.icon} color={festival.color} size={56} marginRight={SPACING.md} />
              <View style={styles.headerText}>
                <Text style={styles.festivalNameBn}>{festival.nameBn}</Text>
                <Text style={styles.festivalNameEn}>{festival.nameEn}</Text>
                <View style={styles.badgeContainer}>
                  <View style={[styles.badge, { backgroundColor: festival.color + '20' }]}>
                    <Text style={[styles.badgeText, { color: festival.color }]}>{festival.type.toUpperCase()}</Text>
                  </View>
                  {festival.isPublicHoliday && (
                    <View style={[styles.badge, { backgroundColor: COLORS.secondarySoft }]}>
                      <Text style={[styles.badgeText, { color: COLORS.secondaryDark }]}>
                        {language === 'bn' ? 'ছুটি' : 'HOLIDAY'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Scrollable content */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Date Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={20} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'তারিখ' : 'Date'}</Text>
              </View>
              <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                <Text style={styles.dateText}>{festival.day}/{festival.month}/{festival.year}</Text>
                <Text style={styles.subText}>
                  {language === 'bn' ? festival.details?.monthBn : festival.details?.monthEn}
                </Text>
                <Text style={styles.subText}>
                  {language === 'bn' ? 'সময়কাল' : 'Duration'}: {festival.details?.duration}
                </Text>
              </View>
            </View>

            {/* Description Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text-outline" size={20} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'সম্পর্কে' : 'About'}</Text>
              </View>
              <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                <Text style={styles.descriptionText}>{getText(festival.details?.longDescription || festival.description)}</Text>
              </View>
            </View>

            {/* History Section */}
            {festival.details?.history && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="book-outline" size={20} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'ইতিহাস' : 'History'}</Text>
                </View>
                <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                  <Text style={styles.contentText}>{getText(festival.details.history)}</Text>
                </View>
              </View>
            )}

            {/* Significance Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star-outline" size={20} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'তাৎপর্য' : 'Significance'}</Text>
              </View>
              <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                <Text style={styles.contentText}>{getText(festival.details?.significance)}</Text>
              </View>
            </View>

            {/* Rituals Section */}
            {festival.details?.rituals && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="flame-outline" size={20} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'রীতি' : 'Rituals'}</Text>
                </View>
                <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                  <Text style={styles.contentText}>{getText(festival.details.rituals)}</Text>
                </View>
              </View>
            )}

            {/* Traditions Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people-outline" size={20} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'প্রথা ও রীতি' : 'Traditions'}</Text>
              </View>
              <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                <Text style={styles.contentText}>{getText(festival.details?.traditions)}</Text>
              </View>
            </View>

            {/* Food Section */}
            {festival.details?.food && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="restaurant-outline" size={20} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'খাবার' : 'Food'}</Text>
                </View>
                <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                  <Text style={styles.contentText}>{getText(festival.details.food)}</Text>
                </View>
              </View>
            )}

            {/* Celebrations Section */}
            {festival.details?.celebrations && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="musical-notes-outline" size={20} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'উদযাপন' : 'Celebrations'}</Text>
                </View>
                <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                  <Text style={styles.contentText}>{getText(festival.details.celebrations)}</Text>
                </View>
              </View>
            )}

            {/* Regional Variations Section */}
            {festival.details?.regionalVariations && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="map-outline" size={20} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'আঞ্চলিক পার্থক্য' : 'Regional'}</Text>
                </View>
                <View style={[styles.sectionContent, { borderLeftColor: festival.color }]}>
                  <Text style={styles.contentText}>{getText(festival.details.regionalVariations)}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Close button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.closeButtonBottom} onPress={onClose}>
              <Text style={styles.closeButtonText}>{language === 'bn' ? 'বন্ধ করুন' : 'Close'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '90%',
    ...SHADOWS.lg,
  },
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.lg,
    borderBottomWidth: 3,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.xs,
  },
  languageButton: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  languageButtonText: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  headerText: {
    flex: 1,
  },
  festivalNameBn: {
    fontSize: FONTS.bengaliLarge,
    fontWeight: 'bold',
    color: COLORS.textBengali,
    marginBottom: 2,
  },
  festivalNameEn: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.xs,
  },
  badgeText: {
    fontSize: FONTS.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: SPACING.md,
    maxHeight: 400,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textBengali,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 3,
  },
  dateText: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.text,
    lineHeight: 22,
  },
  contentText: {
    fontSize: FONTS.bengaliSmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomSection: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  closeButtonBottom: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONTS.bengali,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
});
