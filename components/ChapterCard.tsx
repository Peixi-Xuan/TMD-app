import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadowCard, spacing, typography } from '../constants/theme';
import { Entry, getChildren } from '../lib/dictionary';

function flattenDescendants(entry: Entry, acc: { entry: Entry; depth: number }[], depth: number) {
  const children = getChildren(entry.id);
  for (const child of children) {
    acc.push({ entry: child, depth });
    flattenDescendants(child, acc, depth + 1);
  }
}

export default function ChapterCard({ entry }: { entry: Entry }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const children = getChildren(entry.id);
  const hasChildren = children.length > 0;

  const descendants: { entry: Entry; depth: number }[] = [];
  if (expanded) flattenDescendants(entry, descendants, 0);

  return (
    <View style={styles.card}>
      <Pressable
        testID={`chapter-header-${entry.id}`}
        onPress={() => router.push(`/dictionary/${entry.id}`)}
        style={({ pressed }) => [styles.header, pressed && styles.headerPressed]}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{entry.number}</Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={2}>
            {entry.title_zh}
          </Text>
          {!!entry.title_en && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {entry.title_en}
              {entry.abbr ? ` · ${entry.abbr}` : ''}
            </Text>
          )}
        </View>
        {hasChildren ? (
          <Pressable
            testID={`chapter-expand-${entry.id}`}
            hitSlop={10}
            onPress={(e) => {
              e.stopPropagation?.();
              setExpanded((v) => !v);
            }}
            style={styles.chevronButton}
          >
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.primary}
            />
          </Pressable>
        ) : (
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        )}
      </Pressable>

      {expanded && descendants.length > 0 && (
        <View style={styles.childrenWrap}>
          {descendants.map(({ entry: child, depth }) => (
            <Pressable
              key={child.id}
              onPress={() => router.push(`/dictionary/${child.id}`)}
              style={({ pressed }) => [
                styles.childRow,
                { paddingLeft: spacing.lg + depth * spacing.lg },
                pressed && styles.headerPressed,
              ]}
            >
              <Text style={styles.childNumber}>{child.number}</Text>
              <Text style={styles.childTitle} numberOfLines={1}>
                {child.title_zh}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadowCard,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  headerPressed: {
    backgroundColor: colors.cardMuted,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  badgeText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 21,
  },
  subtitle: {
    fontSize: 12.5,
    color: colors.textTertiary,
    marginTop: 3,
  },
  chevronButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  childrenWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingVertical: spacing.xs,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    paddingRight: spacing.lg,
  },
  childNumber: {
    fontSize: 12.5,
    color: colors.textTertiary,
    fontWeight: '600',
    marginRight: spacing.sm,
    minWidth: 34,
  },
  childTitle: {
    fontSize: 14.5,
    color: colors.textPrimary,
    flex: 1,
  },
});
