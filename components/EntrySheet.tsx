import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BodyText from './BodyText';
import EntryListItem from './EntryListItem';
import FigureView from './FigureView';
import { colors, radius, shadowCard, spacing, typography } from '../constants/theme';
import { getChildren, getEntry } from '../lib/dictionary';
import { useFontScale } from '../lib/fontScale';

type Props = {
  entryId: string;
  onClose: () => void;
};

export default function EntrySheet({ entryId, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { scale } = useFontScale();
  const [stack, setStack] = useState<string[]>([entryId]);
  const currentId = stack[stack.length - 1];
  const entry = getEntry(currentId);

  if (!entry) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.notFound}>未找到该词条</Text>
      </View>
    );
  }

  const children = getChildren(entry.id);
  const needsSupplement = entry.content_status === 'needs_supplement';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => {
            if (stack.length > 1) setStack((s) => s.slice(0, -1));
            else onClose();
          }}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          <Text style={styles.backLabel}>
            {stack.length > 1 ? '返回上一级' : '返回诊疗建议'}
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.titleRow}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberBadgeText}>{entry.number}</Text>
          </View>
          {needsSupplement && (
            <View style={styles.statusTag}>
              <Text style={styles.statusTagText}>内容待补充</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>{entry.title_zh}</Text>
        {!!entry.title_en && (
          <Text style={styles.titleEn}>
            {entry.title_en}
            {entry.abbr ? `  ·  ${entry.abbr}` : ''}
          </Text>
        )}

        <View style={styles.divider} />

        {entry.body_md ? (
          <View style={styles.bodyCard}>
            <BodyText text={entry.body_md} fontScale={scale} />
          </View>
        ) : (
          <View style={styles.categoryNote}>
            <Ionicons name="folder-open-outline" size={18} color={colors.primary} />
            <Text style={styles.categoryNoteText}>本节为分类章节，请浏览下方小节了解详情</Text>
          </View>
        )}

        {entry.figures?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>相关图示</Text>
            {entry.figures.map((fig, idx) => (
              <FigureView key={idx} figure={fig} />
            ))}
          </View>
        )}

        {children.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>本节小节</Text>
            <View style={styles.childrenCard}>
              {children
                .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))
                .map((child, idx) => (
                  <View key={child.id} style={idx > 0 ? styles.childDivider : undefined}>
                    <EntryListItem entry={child} onPress={() => setStack((s) => [...s, child.id])} />
                  </View>
                ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    padding: spacing.xl,
    fontSize: 15,
    color: colors.textSecondary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backLabel: {
    fontSize: 15,
    color: colors.primaryDark,
    marginLeft: 2,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  numberBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  numberBadgeText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  statusTag: {
    backgroundColor: colors.tagNeedsWorkBg,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  statusTagText: {
    ...typography.caption,
    color: colors.tagNeedsWork,
  },
  title: {
    ...typography.entryTitle,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  titleEn: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  bodyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadowCard,
  },
  categoryNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  categoryNoteText: {
    fontSize: 14,
    color: colors.primaryDark,
    flex: 1,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  childrenCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  childDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
