import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadowCard, spacing } from '../constants/theme';

const bgImage = require('../assets/landing-bg.png');

export default function Landing() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Full-screen background image */}
      <Image source={bgImage} style={styles.bgImage} resizeMode="cover" />
      {/* Frosted white overlay */}
      <View style={styles.overlay} />

      <View style={[styles.container, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}>
        {/* Brand row */}
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Ionicons name="medical" size={16} color={colors.card} />
          </View>
          <Text style={styles.brandName}>儿童及青少年TMD智慧决策</Text>
        </View>

        {/* Hero headline */}
        <View style={styles.heroSection}>
          <Text style={styles.headlineBlack}>凝练华西TMD专家</Text>
          <Text style={styles.headlineTeal}>30余年临床经验</Text>
          <Text style={styles.subtitle}>面向临床牙科医生与学习者{'\n'}的知识辞典与治疗决策辅助</Text>
        </View>

        {/* Feature cards — staggered */}
        <View style={styles.cardsSection}>
          <View style={[styles.featureCard, styles.cardLeft]}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="book-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>知识辞典</Text>
              <Text style={styles.cardDesc}>收录30项核心词条。系统学习，随时查阅。</Text>
            </View>
          </View>

          <View style={[styles.featureCard, styles.cardRight]}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="git-network-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>治疗决策</Text>
              <Text style={styles.cardDesc}>系统化诊疗辅助。即将上线。</Text>
            </View>
          </View>
        </View>

        {/* CTA button */}
        <Pressable
          onPress={() => router.replace('/dictionary')}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>开始使用</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={18} color={colors.primaryDark} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 245, 245, 0.60)',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xxl + spacing.lg,
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },

  heroSection: {
    marginBottom: spacing.xxl,
  },
  headlineBlack: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 42,
    letterSpacing: 0.2,
  },
  headlineTeal: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 42,
    letterSpacing: 0.2,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },

  cardsSection: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadowCard,
    maxWidth: '80%',
  },
  cardLeft: {
    alignSelf: 'flex-start',
  },
  cardRight: {
    alignSelf: 'flex-end',
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryDark,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    paddingLeft: spacing.xl + spacing.md,
    paddingRight: spacing.md,
    marginTop: spacing.lg,
    ...shadowCard,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
