import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { gregorianToBengali, bengaliToGregorian } from '../constants/bengaliCalendar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MonthYearPickerModalProps {
  visible: boolean;
  currentMonth: number;
  currentYear: number;
  onSelect: (month: number, year: number) => void;
  onClose: () => void;
}

const MONTHS = [
  { id: 1, nameEn: 'January', nameBn: 'জানুয়ারী' },
  { id: 2, nameEn: 'February', nameBn: 'ফেব্রুয়ারী' },
  { id: 3, nameEn: 'March', nameBn: 'মার্চ' },
  { id: 4, nameEn: 'April', nameBn: 'এপ্রিল' },
  { id: 5, nameEn: 'May', nameBn: 'মে' },
  { id: 6, nameEn: 'June', nameBn: 'জুন' },
  { id: 7, nameEn: 'July', nameBn: 'জুলাই' },
  { id: 8, nameEn: 'August', nameBn: 'আগস্ট' },
  { id: 9, nameEn: 'September', nameBn: 'সেপ্টেম্বর' },
  { id: 10, nameEn: 'October', nameBn: 'অক্টোবর' },
  { id: 11, nameEn: 'November', nameBn: 'নভেম্বর' },
  { id: 12, nameEn: 'December', nameBn: 'ডিসেম্বর' },
];

const BENGALI_MONTHS = [
  { id: 1, name: 'বৈশাখ', nameEn: 'Boishakh' },
  { id: 2, name: 'জ্যৈষ্ঠ', nameEn: 'Jaishtha' },
  { id: 3, name: 'আষাঢ়', nameEn: 'Ashar' },
  { id: 4, name: 'শ্রাবণ', nameEn: 'Shrabon' },
  { id: 5, name: 'ভাদ্র', nameEn: 'Bhadro' },
  { id: 6, name: 'আশ্বিন', nameEn: 'Ashwin' },
  { id: 7, name: 'কার্তিক', nameEn: 'Kartik' },
  { id: 8, name: 'অগ্রহায়ণ', nameEn: 'Ogrohaeon' },
  { id: 9, name: 'পৌষ', nameEn: 'Poush' },
  { id: 10, name: 'মাঘ', nameEn: 'Magh' },
  { id: 11, name: 'ফাল্গুন', nameEn: 'Falgun' },
  { id: 12, name: 'চৈত্র', nameEn: 'Choitro' },
];

// Generate years centered around current year
const currentYearNum = new Date().getFullYear();
const YEARS = Array.from({ length: 41 }, (_, i) => currentYearNum - 20 + i);

export default function MonthYearPickerModal({
  visible,
  currentMonth,
  currentYear,
  onSelect,
  onClose,
}: MonthYearPickerModalProps) {
  const [isBengali, setIsBengali] = useState(false);
  
  // Convert Gregorian to Bengali for display
  const currentBengaliDate = gregorianToBengali(1, currentMonth, currentYear);
  
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedBengaliMonth, setSelectedBengaliMonth] = useState(currentBengaliDate.month + 1);
  const [selectedBengaliYear, setSelectedBengaliYear] = useState(currentBengaliDate.year);
  
  const yearListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible) {
      const bengaliDate = gregorianToBengali(1, currentMonth, currentYear);
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
      setSelectedBengaliMonth(bengaliDate.month + 1);
      setSelectedBengaliYear(bengaliDate.year);
    }
  }, [visible, currentMonth, currentYear]);

  const handleSelect = () => {
    if (isBengali) {
      // Convert Bengali date to Gregorian (using day 1 of the Bengali month)
      const gregorianDate = bengaliToGregorian(1, selectedBengaliMonth - 1, selectedBengaliYear);
      onSelect(gregorianDate.month, gregorianDate.year);
    } else {
      onSelect(selectedMonth, selectedYear);
    }
    onClose();
  };

  const handleToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const bengaliToday = gregorianToBengali(today.getDate(), month, year);
    
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedBengaliMonth(bengaliToday.month + 1);
    setSelectedBengaliYear(bengaliToday.year);
    
    onSelect(month, year);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.modalContent}>
          {/* Modern Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Date</Text>
            <TouchableOpacity onPress={handleSelect} style={styles.headerButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, !isBengali && styles.toggleActive]}
              onPress={() => setIsBengali(false)}
            >
              <Text style={[styles.toggleText, !isBengali && styles.toggleTextActive]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, isBengali && styles.toggleActive]}
              onPress={() => setIsBengali(true)}
            >
              <Text style={[styles.toggleText, isBengali && styles.toggleTextActive]}>বাংলা</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Month Grid - 3 columns */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isBengali ? 'বাংলা মাস নির্বাচন করুন' : 'Select Month'}
              </Text>
              <View style={styles.monthGrid}>
                {(isBengali ? BENGALI_MONTHS : MONTHS).map((month) => (
                  <TouchableOpacity
                    key={month.id}
                    style={[
                      styles.monthCard,
                      (isBengali ? selectedBengaliMonth === month.id : selectedMonth === month.id) && styles.monthCardSelected,
                    ]}
                    onPress={() => {
                      if (isBengali) {
                        setSelectedBengaliMonth(month.id);
                      } else {
                        setSelectedMonth(month.id);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.monthName,
                        (isBengali ? selectedBengaliMonth === month.id : selectedMonth === month.id) && styles.monthNameSelected,
                      ]}
                    >
                      {isBengali ? month.name : month.nameEn.substring(0, 3)}
                    </Text>
                    {isBengali && 'nameEn' in month && (
                      <Text
                        style={[
                          styles.monthNameBn,
                          selectedBengaliMonth === month.id && styles.monthNameBnSelected,
                        ]}
                      >
                        {month.nameEn}
                      </Text>
                    )}
                    {!isBengali && 'nameBn' in month && (
                      <Text
                        style={[
                          styles.monthNameBn,
                          selectedMonth === month.id && styles.monthNameBnSelected,
                        ]}
                      >
                        {month.nameBn}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Year Grid - 4 columns */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isBengali ? 'বছর নির্বাচন করুন' : 'Select Year'}
              </Text>
              <View style={styles.yearGrid}>
                {YEARS.map((year) => {
                  const bengaliYear = year - 593;
                  const isSelected = isBengali 
                    ? selectedBengaliYear === bengaliYear 
                    : selectedYear === year;
                  
                  return (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearCard,
                        isSelected && styles.yearCardSelected,
                      ]}
                      onPress={() => {
                        if (isBengali) {
                          setSelectedBengaliYear(bengaliYear);
                        } else {
                          setSelectedYear(year);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.yearValue,
                          isSelected && styles.yearValueSelected,
                        ]}
                      >
                        {isBengali ? bengaliYear : year}
                      </Text>
                      {isBengali && (
                        <Text style={styles.yearGregorian}>
                          {year}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.todayButton} onPress={handleToday}>
                <Ionicons name="today" size={20} color="#1A237E" />
                <Text style={styles.todayText}>{isBengali ? 'আজ' : 'Today'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.92, // Very tall modal
    minHeight: SCREEN_HEIGHT * 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A237E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerButton: {
    padding: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#1A237E',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 16,
    paddingLeft: 4,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthCard: {
    width: '31%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  monthCardSelected: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  monthName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 4,
  },
  monthNameSelected: {
    color: '#FFFFFF',
  },
  monthNameBn: {
    fontSize: 12,
    fontWeight: '500',
    color: '#868E96',
  },
  monthNameBnSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  yearCard: {
    width: '23%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  yearCardSelected: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  yearValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495057',
  },
  yearValueSelected: {
    color: '#FFFFFF',
  },
  yearGregorian: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFC107',
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  todayText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F57C00',
    marginLeft: 10,
  },
});
