import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { Class, ClassLevel, FilterState } from '../types';
import { mockClasses, instructors } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import ClassCard from '../components/ClassCard';
import LevelChip from '../components/LevelChip';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomeScreen() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    selectedLevels: [],
    selectedInstructor: null,
  });
  const [loading, setLoading] = useState(true);
  const [bookingClassId, setBookingClassId] = useState<string | null>(null);
  const [instructorModalVisible, setInstructorModalVisible] = useState(false);

  const levels: ClassLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  // Simulate loading on app start
  useEffect(() => {
    const timer = setTimeout(() => {
      setClasses(mockClasses);
      setFilteredClasses(mockClasses);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = classes;

    if (filters.selectedLevels.length > 0) {
      filtered = filtered.filter(cls => filters.selectedLevels.includes(cls.level));
    }

    if (filters.selectedInstructor) {
      filtered = filtered.filter(cls => cls.instructor === filters.selectedInstructor);
    }

    setFilteredClasses(filtered);
  }, [classes, filters]);

  const handleLevelFilter = (level: ClassLevel) => {
    setFilters(prev => ({
      ...prev,
      selectedLevels: prev.selectedLevels.includes(level)
        ? prev.selectedLevels.filter(l => l !== level)
        : [...prev.selectedLevels, level],
    }));
  };

  const handleInstructorSelect = (instructor: string) => {
    setFilters(prev => ({
      ...prev,
      selectedInstructor: prev.selectedInstructor === instructor ? null : instructor,
    }));
    setInstructorModalVisible(false);
  };

  const clearFilters = () => {
    setFilters({
      selectedLevels: [],
      selectedInstructor: null,
    });
  };

  const simulateBooking = (classId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // 15% chance of failure
      const shouldFail = Math.random() < 0.15;
      setTimeout(() => {
        resolve(!shouldFail);
      }, 1000);
    });
  };

  const handleBookPress = async (classId: string) => {
    setBookingClassId(classId);
    
    // Optimistic update
    setClasses(prev => 
      prev.map(cls => 
        cls.id === classId ? { ...cls, isBooked: true } : cls
      )
    );

    try {
      const success = await simulateBooking(classId);
      
      if (!success) {
        // Rollback on failure
        setClasses(prev => 
          prev.map(cls => 
            cls.id === classId ? { ...cls, isBooked: false } : cls
          )
        );
        
        Toast.show({
          type: 'error',
          text1: 'Booking Failed',
          text2: 'Unable to book this class. Please try again.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Class Booked!',
          text2: 'Your class has been successfully booked.',
          position: 'bottom',
        });
      }
    } catch (error) {
      // Rollback on error
      setClasses(prev => 
        prev.map(cls => 
          cls.id === classId ? { ...cls, isBooked: false } : cls
        )
      );
      
      Toast.show({
        type: 'error',
        text1: 'Booking Error',
        text2: 'Something went wrong. Please try again.',
        position: 'bottom',
      });
    } finally {
      setBookingClassId(null);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[colors.background, '#FFF0E6']}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>🕉️ Loading amazing classes...</Text>
          <Text style={styles.loadingSubtext}>Preparing your wellness journey</Text>
        </View>
      </LinearGradient>
    );
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={64} color={colors.textLight} />
      <Text style={styles.emptyTitle}>No Classes Found</Text>
      <Text style={styles.emptySubtitle}>
        No classes match your current filters
      </Text>
      <Button
        title="Clear Filters"
        onPress={clearFilters}
        style={styles.clearButton}
      />
    </View>
  );

  const renderClassCard = ({ item }: { item: Class }) => (
    <ClassCard
      classItem={item}
      onBookPress={handleBookPress}
      isBooking={bookingClassId === item.id}
    />
  );

  return (
    <LinearGradient
      colors={[colors.background, '#FFF0E6']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧘‍♀️ Fitness Classes</Text>
          <Text style={styles.headerSubtitle}>Find your perfect workout</Text>
        </View>
        
        {/* Filters Section */}
        <View style={styles.filtersSection}>
        <Text style={styles.filtersTitle}>Filters</Text>
        
        {/* Level Chips */}
        <View style={styles.levelFilters}>
          {levels.map(level => (
            <LevelChip
              key={level}
              level={level}
              selected={filters.selectedLevels.includes(level)}
              onPress={() => handleLevelFilter(level)}
            />
          ))}
        </View>

        {/* Instructor Filter */}
        <TouchableOpacity
          style={styles.instructorFilter}
          onPress={() => setInstructorModalVisible(true)}
        >
          <Text style={styles.instructorFilterText}>
            {filters.selectedInstructor || 'All Instructors'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Classes List */}
      <FlatList
        data={filteredClasses}
        keyExtractor={item => item.id}
        renderItem={renderClassCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Instructor Selection Modal */}
      <Modal
        visible={instructorModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInstructorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Instructor</Text>
              <TouchableOpacity
                onPress={() => setInstructorModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalList}>
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  !filters.selectedInstructor && styles.selectedOption,
                ]}
                onPress={() => handleInstructorSelect('')}
              >
                <Text style={[
                  styles.modalOptionText,
                  !filters.selectedInstructor && styles.selectedOptionText,
                ]}>
                  All Instructors
                </Text>
              </TouchableOpacity>
              
              {instructors.map(instructor => (
                <TouchableOpacity
                  key={instructor}
                  style={[
                    styles.modalOption,
                    filters.selectedInstructor === instructor && styles.selectedOption,
                  ]}
                  onPress={() => handleInstructorSelect(instructor)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    filters.selectedInstructor === instructor && styles.selectedOptionText,
                  ]}>
                    {instructor}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h1,
    color: colors.text,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  loadingText: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.lg,
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  filtersSection: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  levelFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  instructorFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instructorFilterText: {
    ...typography.body,
    color: colors.text,
  },
  listContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xxl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  clearButton: {
    marginTop: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
  },
  modalList: {
    maxHeight: 400,
  },
  modalOption: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.primary + '10',
  },
  modalOptionText: {
    ...typography.body,
    color: colors.text,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
});