import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { FESTIVALS, getFestivalsByType, Festival } from '../constants/festivals';
import FestivalIcon from '../components/FestivalIcon';
import FestivalDetailModal from '../components/FestivalDetailModal';

type FilterType = 'all' | 'religious' | 'cultural' | 'national' | 'seasonal';

export default function FestivalsScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const getFilteredFestivals = (): Festival[] => {
    let filtered = FESTIVALS.filter((f) => f.year === selectedYear);
    
    if (filter !== 'all') {
      filtered = filtered.filter((f) => f.type === filter);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day);
      const dateB = new Date(b.year, b.month - 1, b.day);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const filters: { id: FilterType; label: string; labelBn: string; icon: string }[] = [
    { id: 'all', label: 'All', labelBn: 'সব', icon: 'grid' },
    { id: 'religious', label: 'Religious', labelBn: 'ধর্মীয়', icon: 'ribbon' },
    { id: 'cultural', label: 'Cultural', labelBn: 'সাংস্কৃতিক', icon: 'musical-notes' },
    { id: 'national', label: 'National', labelBn: 'জাতীয়', icon: 'flag' },
    { id: 'seasonal', label: 'Seasonal', labelBn: 'ঋতু', icon: 'leaf' },
  ];

  const handleFestivalPress = (festival: Festival) => {
    setSelectedFestival(festival);
    setModalVisible(true);
  };

  const renderFestivalItem = ({ item }: { item: Festival }) => (
    <TouchableOpacity 
      style={styles.festivalItem} 
      activeOpacity={0.7}
      onPress={() => handleFestivalPress(item)}
    >
      <FestivalIcon iconPath={item.icon} color={item.color} size={64} marginRight={SPACING.md} />
      <View style={styles.festivalInfo}>
        <Text style={styles.festivalNameEn} numberOfLines={1}>{item.nameEn}</Text>
        <Text style={styles.festivalNameBn} numberOfLines={1}>{item.nameBn}</Text>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar" size={12} color={COLORS.textSecondary} />
          <Text style={styles.dateText}>{item.day}/{item.month}/{item.year}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="ribbon" size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Festivals</Text>
        <Text style={styles.headerSubtitle}>উৎসব ও ছুটির দিন</Text>
        <View style={styles.yearSelector}>
          <TouchableOpacity
            style={styles.yearButton}
            onPress={() => setSelectedYear(Math.max(currentYear - 5, selectedYear - 1))}
            disabled={selectedYear === currentYear - 5}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.yearText}>{selectedYear}</Text>
          <TouchableOpacity
            style={styles.yearButton}
            onPress={() => setSelectedYear(Math.min(currentYear + 5, selectedYear + 1))}
            disabled={selectedYear === currentYear + 5}
          >
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterTab, filter === f.id && styles.activeFilterTab]}
              onPress={() => setFilter(f.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={f.icon as any}
                size={18}
                color={filter === f.id ? '#FFFFFF' : COLORS.textSecondary}
              />
              <Text
                style={[styles.filterLabel, filter === f.id && styles.activeFilterLabel]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Festivals List */}
      <FlatList
        data={getFilteredFestivals()}
        keyExtractor={(item) => `${item.id}-${item.year}`}
        renderItem={renderFestivalItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No festivals found</Text>
            <Text style={styles.emptyTextBn}>কোন উৎসব পাওয়া যায়নি</Text>
          </View>
        }
      />

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  yearButton: {
    padding: SPACING.sm,
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: SPACING.md,
  },
  filterContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: SPACING.sm,
  },
  filterContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    gap: 6,
  },
  activeFilterTab: {
    backgroundColor: COLORS.primary,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeFilterLabel: {
    color: '#FFFFFF',
  },
  festivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  festivalInfo: {
    flex: 1,
  },
  festivalNameEn: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  festivalNameBn: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: SPACING.md,
  },
  listContent: {
    paddingVertical: SPACING.sm,
    paddingBottom: 140,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptyTextBn: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
