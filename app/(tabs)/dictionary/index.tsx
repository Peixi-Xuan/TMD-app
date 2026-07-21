import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChapterCard from '../../../components/ChapterCard';
import EntryListItem from '../../../components/EntryListItem';
import { TAB_BAR_CLEARANCE } from '../../../components/FloatingTabBar';
import { colors, radius, spacing, typography } from '../../../constants/theme';
import { getTopLevel, searchEntries } from '../../../lib/dictionary';

export default function DictionaryHome() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const topLevel = useMemo(
    () => getTopLevel().sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true })),
    []
  );

  const results = useMemo(() => (query.trim() ? searchEntries(query) : []), [query]);
  const isSearching = query.trim().length > 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>临床知识辅助辞典</Text>
        <Text style={styles.brandSub}>儿童及青少年颞下颌关节紊乱病诊疗知识库</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textTertiary} />
          <TextInput
            testID="dictionary-search-input"
            value={query}
            onChangeText={setQuery}
            placeholder="搜索词条、缩写、关键词..."
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {Platform.OS !== 'ios' && query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
            </Pressable>
          )}
        </View>
      </View>

      {isSearching ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + TAB_BAR_CLEARANCE }]}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <Text style={styles.resultsLabel}>
              找到 {results.length} 个相关词条
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.resultCard}>
              <EntryListItem entry={item} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="document-text-outline" size={32} color={colors.textTertiary} />
              <Text style={styles.emptyText}>未找到匹配的词条，试试其他关键词</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={topLevel}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + TAB_BAR_CLEARANCE }]}
          renderItem={({ item }) => <ChapterCard entry={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  brand: {
    ...typography.screenTitle,
    color: colors.textPrimary,
  },
  brandSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    outlineStyle: 'none' as any,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  resultsLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: spacing.xxl * 2,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});
