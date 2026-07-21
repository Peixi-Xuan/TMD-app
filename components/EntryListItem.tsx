import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';
import { Entry } from '../lib/dictionary';

export default function EntryListItem({
  entry,
  compact = false,
  onPress,
}: {
  entry: Entry;
  compact?: boolean;
  onPress?: () => void;
}) {
  const router = useRouter();
  return (
    <Pressable
      testID={`entry-row-${entry.id}`}
      onPress={onPress ?? (() => router.push(`/dictionary/${entry.id}`))}
      style={({ pressed }) => [
        styles.row,
        compact && styles.rowCompact,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.badge, compact && styles.badgeCompact]}>
        <Text style={[styles.badgeText, compact && styles.badgeTextCompact]}>
          {entry.number}
        </Text>
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={1}>
          {entry.title_zh}
        </Text>
        {!!entry.title_en && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {entry.title_en}
            {entry.abbr ? ` · ${entry.abbr}` : ''}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  rowCompact: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    paddingLeft: spacing.xl,
  },
  pressed: {
    backgroundColor: colors.cardMuted,
  },
  badge: {
    minWidth: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  badgeCompact: {
    minWidth: 26,
    height: 26,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  badgeTextCompact: {
    color: colors.textTertiary,
    fontWeight: '600',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  titleCompact: {
    fontSize: 14.5,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12.5,
    color: colors.textTertiary,
    marginTop: 2,
  },
});
