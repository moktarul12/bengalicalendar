import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, toBengaliNumeral } from '../constants/theme';

interface MonthYearPickerModalProps {
  visible: boolean;
  currentMonth: number;
  currentYear: number;
  onSelect: (month: number, year: number) => void;
  onClose: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BENGALI_MONTHS = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
  'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

export default function MonthYearPickerModal({
  visible,
  currentMonth,
  currentYear,
  onSelect,
  onClose,
}: MonthYearPickerModalProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isGregorian, setIsGregorian] = useState(true);
  const yearScrollViewRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    if (visible && yearScrollViewRef.current) {
      setTimeout(() => {
        yearScrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }, 100);
    }
  }, [visible]);

  const currentYearNow = new Date().getFullYear();
  const minYear = currentYearNow - 50;
  const maxYear = currentYearNow + 50;

  const years = [];
  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  const handleSelect = () => {
    onSelect(selectedMonth, selectedYear);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Date</Text>
            <TouchableOpacity onPress={handleSelect} style={styles.doneButton}>
              <LinearGradient
                colors={['#FFFFFF', '#F0F0F0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.doneButtonGradient}
              >
                <Text style={styles.doneText}>Done</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          {/* Calendar Type Toggle */}
          <View style={styles.typeToggle}>
            <TouchableOpacity
              style={[styles.typeButton, isGregorian && styles.activeTypeButton]}
              onPress={() => setIsGregorian(true)}
            >
              <Text style={[styles.typeText, isGregorian && styles.activeTypeText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, !isGregorian && styles.activeTypeButton]}
              onPress={() => setIsGregorian(false)}
            >
              <Text style={[styles.typeText, !isGregorian && styles.activeTypeText]}>Bengali</Text>
            </TouchableOpacity>
          </View>

          {/* Year Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isGregorian ? 'Year' : 'বছর'}
            </Text>
            <ScrollView
              ref={yearScrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.yearScroll}
            >
              {years.map((year) => {
                // For Bengali, we need to show the corresponding Bengali year
                // Simplified: Gregorian Year - 593 approximately for Bengali year
                const displayYear = isGregorian ? year : year - 593;
                return (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.yearItem,
                      year === selectedYear && styles.selectedYearItem,
                    ]}
                    onPress={() => setSelectedYear(year)}
                  >
                    <Text
                      style={[
                        styles.yearText,
                        year === selectedYear && styles.selectedYearText,
                      ]}
                    >
                      {!isGregorian ? toBengaliNumeral(displayYear) : year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Month Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isGregorian ? 'Month' : 'মাস'}
            </Text>
            <View style={styles.monthGrid}>
              {(isGregorian ? MONTHS : BENGALI_MONTHS).map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.monthItem,
                    index + 1 === selectedMonth && styles.selectedMonthItem,
                  ]}
                  onPress={() => setSelectedMonth(index + 1)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      index + 1 === selectedMonth && styles.selectedMonthText,
                    ]}
                    numberOfLines={1}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Select */}
          <View style={styles.quickSelect}>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => {
                const now = new Date();
                setSelectedMonth(now.getMonth() + 1);
                setSelectedYear(now.getFullYear());
              }}
            >
              <Ionicons name="today" size={20} color={COLORS.primary} />
              <Text style={styles.quickButtonText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => {
                const now = new Date();
                setSelectedMonth(now.getMonth() + 1);
                setSelectedYear(now.getFullYear() + 1);
              }}
            >
              <Ionicons name="arrow-forward-circle" size={20} color={COLORS.primary} />
              <Text style={styles.quickButtonText}>Next Year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => {
                const now = new Date();
                setSelectedMonth(now.getMonth() + 1);
                setSelectedYear(now.getFullYear() - 1);
              }}
            >
              <Ionicons name="arrow-back-circle" size={20} color={COLORS.primary} />
              <Text style={styles.quickButtonText}>Last Year</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '95%', // Increased height
    minHeight: '70%', // Ensure minimum visibility
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    backgroundColor: '#1A237E', // Dark blue header
    marginBottom: SPACING.md,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  doneButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  doneButtonGradient: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  doneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  activeTypeButton: {
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTypeText: {
    color: '#FFFFFF',
  },
  section: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  yearScroll: {
    paddingHorizontal: SPACING.xs,
  },
  yearItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedYearItem: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  yearText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#424242',
  },
  selectedYearText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.xs,
    gap: SPACING.xs,
  },
  monthItem: {
    width: '23%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedMonthItem: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  selectedMonthText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quickSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: SPACING.lg,
    backgroundColor: '#FAFAFA',
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A237E',
    marginLeft: SPACING.xs,
  },
});
