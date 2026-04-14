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
import FestivalCard from '../components/FestivalCard';

type FilterType = 'all' | 'religious' | 'cultural' | 'national' | 'seasonal';

export default function FestivalsScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredFestivals = (): Festival[] => {
    if (filter === 'all') {
      return FESTIVALS.sort((a, b) => {
        const dateA = a.month * 100 + a.day;
        const dateB = b.month * 100 + b.day;
        return dateA - dateB;
      });
    }
    return getFestivalsByType(filter);
  };

  const filters: { id: FilterType; label: string; labelBn: string }[] = [
    { id: 'all', label: 'All', labelBn: 'সব' },
    { id: 'religious', label: 'Religious', labelBn: 'ধর্মীয়' },
    { id: 'cultural', label: 'Cultural', labelBn: 'সাংস্কৃতিক' },
    { id: 'national', label: 'National', labelBn: 'জাতীয়' },
    { id: 'seasonal', label: 'Seasonal', labelBn: 'ঋতু' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Festivals</Text>
        <Text style={styles.headerSubtitle}>উৎসব ও ছুটির দিন</Text>
      </LinearGradient>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filterTab, filter === f.id && styles.activeFilterTab]}
            onPress={() => setFilter(f.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.filterLabel, filter === f.id && styles.activeFilterLabel]}
            >
              {f.label}
            </Text>
            <Text
              style={[styles.filterLabelBn, filter === f.id && styles.activeFilterLabelBn]}
            >
              {f.labelBn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Festivals List */}
      <FlatList
        data={getFilteredFestivals()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FestivalCard festival={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No festivals found</Text>
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
  header: {
    padding: SPACING.lg,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  filterContainer: {
    maxHeight: 70,
    backgroundColor: COLORS.surface,
  },
  filterContent: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: COLORS.primary,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterLabelBn: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  activeFilterLabel: {
    color: '#FFFFFF',
  },
  activeFilterLabelBn: {
    color: 'rgba(255, 255, 255, 0.9)',
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
});
