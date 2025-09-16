import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ClassLevel } from '../types';
import { colors, borderRadius, spacing, typography } from '../theme';

interface LevelChipProps {
  level: ClassLevel;
  selected: boolean;
  onPress: () => void;
}

export default function LevelChip({ level, selected, onPress }: LevelChipProps) {
  const levelColor = colors[level.toLowerCase() as keyof typeof colors] || colors.primary;
  
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { borderColor: levelColor },
        selected && { backgroundColor: levelColor },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: selected ? colors.surface : levelColor },
        ]}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  text: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
});