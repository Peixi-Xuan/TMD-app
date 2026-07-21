import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CLEARANCE } from '../../../components/FloatingTabBar';
import { colors, radius, spacing, typography } from '../../../constants/theme';

export default function TreatmentLanding() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + TAB_BAR_CLEARANCE + spacing.md }]}>
      {/* Decorative blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>儿童及青少年TMD智慧决策</Text>
      </View>

      {/* Centered content */}
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Ionicons name="git-network" size={40} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>治疗决策辅助</Text>
          <Text style={styles.heroSub}>
            儿童及青少年 TMD 诊疗建议系统{'\n'}基于临床评估数据生成个性化方案
          </Text>
        </View>

        <View style={styles.ctaWrap}>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
            onPress={() => router.push('/treatment/session' as any)}
          >
            <Text style={styles.ctaBtnText}>开始评估</Text>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={18} color={colors.primary} />
            </View>
          </Pressable>
          <Text style={styles.ctaNote}>以上建议仅供临床参考，不替代医生诊断</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.primaryLight,
    opacity: 0.35,
    top: -80,
    right: -80,
  },
  blob2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primarySoft,
    opacity: 0.6,
    top: 60,
    right: 40,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  heroTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaWrap: {
    alignItems: 'center',
  },
  ctaBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    marginBottom: spacing.sm,
    width: '100%',
  },
  ctaBtnPressed: {
    opacity: 0.85,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textOnPrimary,
    letterSpacing: 0.3,
  },
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textOnPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaNote: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
