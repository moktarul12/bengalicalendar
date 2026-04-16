import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
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
          {/* Header with gradient background */}
          <LinearGradient
            colors={[festival.color, festival.color + 'CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Language Toggle Button */}
            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <Ionicons name="language" size={24} color="#FFFFFF" />
              <Text style={styles.languageButtonText}>{language === 'bn' ? 'BN' : 'EN'}</Text>
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <FestivalIcon iconPath={festival.icon} color={festival.color} size={80} marginRight={SPACING.md} />
              <View style={styles.headerText}>
                <Text style={styles.festivalNameEn}>{language === 'bn' ? festival.nameBn : festival.nameEn}</Text>
                <Text style={styles.festivalNameBn}>{language === 'bn' ? festival.nameEn : festival.nameBn}</Text>
                <View style={styles.badgeContainer}>
                  <View style={[styles.badge, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]}>
                    <Text style={styles.badgeText}>{festival.type.toUpperCase()}</Text>
                  </View>
                  {festival.isPublicHoliday && (
                    <View style={[styles.badge, { backgroundColor: '#FFD700' }]}>
                      <Text style={[styles.badgeText, { color: COLORS.text }]}>
                        {language === 'bn' ? 'ছুটি' : 'HOLIDAY'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Scrollable content */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Date Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={24} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'তারিখ' : 'Date'}</Text>
              </View>
              <View style={styles.sectionContent}>
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
                <Ionicons name="document-text" size={24} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'সম্পর্কে' : 'About'}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.descriptionText}>{getText(festival.details?.longDescription || festival.description)}</Text>
              </View>
            </View>

            {/* History Section */}
            {festival.details?.history && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="book" size={24} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'ইতিহাস' : 'History'}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.contentText}>{getText(festival.details.history)}</Text>
                </View>
              </View>
            )}

            {/* Significance Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star" size={24} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'তাৎপর্য' : 'Significance'}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.contentText}>{getText(festival.details?.significance)}</Text>
              </View>
            </View>

            {/* Rituals Section */}
            {festival.details?.rituals && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="flame" size={24} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'রীতি' : 'Rituals'}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.contentText}>{getText(festival.details.rituals)}</Text>
                </View>
              </View>
            )}

            {/* Traditions Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people" size={24} color={festival.color} />
                <Text style={styles.sectionTitle}>{language === 'bn' ? 'প্রথা ও রীতি' : 'Traditions & Customs'}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.contentText}>{getText(festival.details?.traditions)}</Text>
              </View>
            </View>

            {/* Food Section */}
            {festival.details?.food && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="restaurant" size={24} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'খাবার' : 'Food'}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.contentText}>{getText(festival.details.food)}</Text>
                </View>
              </View>
            )}

            {/* Celebrations Section */}
            {festival.details?.celebrations && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="musical-notes" size={24} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'উদযাপন' : 'Celebrations'}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.contentText}>{getText(festival.details.celebrations)}</Text>
                </View>
              </View>
            )}

            {/* Regional Variations Section */}
            {festival.details?.regionalVariations && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="map" size={24} color={festival.color} />
                  <Text style={styles.sectionTitle}>{language === 'bn' ? 'আঞ্চলিক পার্থক্য' : 'Regional Variations'}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.contentText}>{getText(festival.details.regionalVariations)}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Close button at bottom */}
          <TouchableOpacity style={styles.bottomCloseButton} onPress={onClose}>
            <Text style={styles.bottomCloseButtonText}>{language === 'bn' ? 'বন্ধ করুন' : 'Close'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  languageButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  headerText: {
    flex: 1,
  },
  festivalNameEn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  festivalNameBn: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.sm,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  contentText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomCloseButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    alignItems: 'center',
  },
  bottomCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
