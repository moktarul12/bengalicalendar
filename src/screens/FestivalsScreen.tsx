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
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../constants/theme';
import { Festival, FESTIVALS } from '../constants/festivals';
import FestivalIcon from '../components/FestivalIcon';
import FestivalDetailScreen from './FestivalDetailScreen';

type FilterType = 'all' | 'religious' | 'cultural' | 'national' | 'seasonal';

export default function FestivalsScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [showFestivalDetail, setShowFestivalDetail] = useState(false);

  const currentYear = new Date().getFullYear();

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

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'religious': return COLORS.festivalReligious;
      case 'cultural': return COLORS.festivalCultural;
      case 'national': return COLORS.festivalNational;
      case 'seasonal': return COLORS.festivalSeasonal;
      default: return COLORS.primary;
    }
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
    setShowFestivalDetail(true);
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Ionicons name="ribbon" size={32} color={COLORS.primary} />
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>Festivals</Text>
        <Text style={styles.headerSubtitle}>উৎসব ও ছুটির দিন</Text>
      </View>
    </View>
  );

  const renderFilterTabs = () => (
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
  );

  if (showFestivalDetail && selectedFestival) {
    return (
      <FestivalDetailScreen
        festival={selectedFestival}
        onBack={() => setShowFestivalDetail(false)}
        language="bn"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerDecoration} />
      <View style={styles.headerDecoration2} />
      {renderHeader()}
      {renderFilterTabs()}

      <FlatList
        data={getFilteredFestivals()}
        renderItem={renderFestivalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No festivals found</Text>
            <Text style={styles.emptyTextBn}>কোন উৎসব পাওয়া যায়নি</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary + '15',
    marginRight: -80,
    marginTop: -80,
  },
  headerDecoration2: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.secondary + '15',
    marginLeft: -50,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    position: 'relative',
    overflow: 'hidden',
  },
  headerText: {
    marginLeft: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  filterContainer: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  listContent: {
    paddingVertical: SPACING.sm,
    paddingBottom: 140,
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
