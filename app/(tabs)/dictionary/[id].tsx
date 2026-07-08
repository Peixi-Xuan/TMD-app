import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BodyText from '../../../components/BodyText';
import Chip from '../../../components/Chip';
import EntryListItem from '../../../components/EntryListItem';
import { colors, radius, shadowCard, spacing, typography } from '../../../constants/theme';
import { getChildren, getEntry } from '../../../lib/dictionary';

export default function EntryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.notFound}>未找到该词条</Text>
      </View>
    );
  }

  const parent = entry.parent ? getEntry(entry.parent) : undefined;
  const children = getChildren(entry.id);
  const needsSupplement = entry.content_status === 'needs_supplement';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable
          testID="entry-back-button"
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          <Text style={styles.backLabel}>返回</Text>
        </Pressable>
        <Ionicons name="medical-outline" size={20} color={colors.primary} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {parent && (
          <Pressable onPress={() => router.push(`/dictionary/${parent.id}`)} style={styles.breadcrumb}>
            <Text style={styles.breadcrumbText}>{parent.title_zh}</Text>
            <Ionicons name="chevron-forward" size={13} color={colors.textTertiary} />
          </Pressable>
        )}

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

        {entry.aliases?.length > 1 && (
          <View style={styles.aliasRow}>
            {entry.aliases.map((a) => (
              <Text key={a} style={styles.aliasText}>
                {a}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.divider} />

        {entry.body_md ? (
          <View style={styles.bodyCard}>
            <BodyText text={entry.body_md} />
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
              <View key={idx} style={styles.figureCard}>
                <View style={styles.figurePlaceholder}>
                  <Ionicons name="image-outline" size={26} color={colors.textTertiary} />
                  <Text style={styles.figurePlaceholderText}>图像素材建设中</Text>
                </View>
                <Text style={styles.figureCaption}>{fig.caption}</Text>
              </View>
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
                  <View
                    key={child.id}
                    style={idx > 0 ? styles.childDivider : undefined}
                  >
                    <EntryListItem entry={child} />
                  </View>
                ))}
            </View>
          </View>
        )}

        {entry.cross_refs?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>相关词条</Text>
            <View style={styles.chipsWrap}>
              {entry.cross_refs.map((refId) => {
                const ref = getEntry(refId);
                if (!ref) return null;
                return (
                  <Chip
                    key={refId}
                    testID={`cross-ref-${refId}`}
                    label={ref.title_zh}
                    onPress={() => router.push(`/dictionary/${refId}`)}
                  />
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: spacing.xxl }} />
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
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
    paddingBottom: spacing.xxl,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.md,
  },
  breadcrumbText: {
    fontSize: 12.5,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  aliasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  aliasText: {
    fontSize: 12.5,
    color: colors.textTertiary,
    backgroundColor: colors.cardMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
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
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  figureCard: {
    marginBottom: spacing.md,
  },
  figurePlaceholder: {
    height: 140,
    borderRadius: radius.md,
    backgroundColor: colors.cardMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  figurePlaceholderText: {
    fontSize: 12.5,
    color: colors.textTertiary,
  },
  figureCaption: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
});
