import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../../constants/theme';

export default function TreatmentPlaceholder() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>治疗决策辅助系统</Text>
        <Text style={styles.brandSub}>基于患者评估数据的智能诊疗建议</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="construct-outline" size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>模块建设中</Text>
        <Text style={styles.description}>
          治疗决策辅助系统将支持患者症状评估、影像学参数录入，{'\n'}
          并生成个性化治疗建议与随访计划。{'\n'}
          敬请期待。
        </Text>

        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>规划中的功能</Text>
          {['症状评估问卷', '智能诊疗建议报告', '治疗方案推荐与随访提醒'].map((item) => (
            <View key={item} style={styles.previewRow}>
              <Ionicons name="ellipse" size={6} color={colors.primary} />
              <Text style={styles.previewText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  brand: {
    ...typography.screenTitle,
    color: colors.textPrimary,
  },
  brandSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  previewCard: {
    marginTop: spacing.xxl,
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  previewLabel: {
    ...typography.label,
    color: colors.textTertiary,
    marginBottom: spacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs + 2,
  },
  previewText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
});
