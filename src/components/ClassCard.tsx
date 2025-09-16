import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Class } from '../types';
import { colors, borderRadius, spacing, typography, shadows } from '../theme';
import Button from './Button';

interface ClassCardProps {
  classItem: Class;
  onBookPress: (classId: string) => void;
  isBooking?: boolean;
}

export default function ClassCard({ classItem, onBookPress, isBooking }: ClassCardProps) {
  const levelColor = colors[classItem.level.toLowerCase() as keyof typeof colors] || colors.primary;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };
  
  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        <LinearGradient
          colors={[colors.cardGradientStart, colors.cardGradientEnd]}
          style={styles.gradientCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{classItem.name}</Text>
              <Text style={styles.subtitle}>Join now and get fit!</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
              <Text style={styles.levelText}>{classItem.level}</Text>
            </View>
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="person" size={16} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>{classItem.instructor}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '15' }]}>
                <Ionicons name="location" size={16} color={colors.secondary} />
              </View>
              <Text style={styles.detailText}>{classItem.center}</Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <Button
              title={classItem.isBooked ? "✓ Booked" : "Quick Book"}
              size="small"
              variant={classItem.isBooked ? "secondary" : "primary"}
              disabled={classItem.isBooked}
              loading={isBooking}
              onPress={() => onBookPress(classItem.id)}
              style={styles.bookButton}
            />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  gradientCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  levelBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  levelText: {
    ...typography.bodySmall,
    color: colors.surface,
    fontWeight: '700',
  },
  details: {
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  detailText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'flex-end',
  },
  bookButton: {
    minWidth: 120,
    paddingHorizontal: spacing.lg,
  },
});
