import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

export default function Chip({
  label,
  onPress,
  tone = 'default',
  testID,
}: {
  label: string;
  onPress?: () => void;
  tone?: 'default' | 'warning';
  testID?: string;
}) {
  const isWarning = tone === 'warning';
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isWarning && styles.chipWarning,
        pressed && onPress ? styles.chipPressed : null,
      ]}
    >
      <Text style={[styles.label, isWarning && styles.labelWarning]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipWarning: {
    backgroundColor: colors.tagNeedsWorkBg,
    borderColor: '#F0DDB8',
  },
  chipPressed: {
    opacity: 0.6,
  },
  label: {
    ...typography.caption,
    color: colors.primaryDark,
  },
  labelWarning: {
    color: colors.tagNeedsWork,
  },
});
