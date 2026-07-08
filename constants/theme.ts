export const colors = {
  background: '#EFF5F5',
  backgroundAlt: '#E4EFEF',
  card: '#FFFFFF',
  cardMuted: '#F5FAFA',
  border: '#DFEAEA',
  borderStrong: '#CBDCDC',

  primary: '#2E7D78',
  primaryDark: '#1F5F5B',
  primaryLight: '#DCEEEC',
  primarySoft: '#EAF4F3',

  accent: '#4FA9A2',

  textPrimary: '#152426',
  textSecondary: '#5B7473',
  textTertiary: '#8CA3A2',
  textOnPrimary: '#FFFFFF',

  tagNeedsWork: '#C98A2E',
  tagNeedsWorkBg: '#FBF1E1',

  divider: '#E7EFEF',
  shadow: 'rgba(24, 62, 60, 0.08)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  screenTitle: { fontSize: 26, fontWeight: '700' as const, letterSpacing: 0.2 },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const },
  entryTitle: { fontSize: 20, fontWeight: '700' as const },
  body: { fontSize: 15.5, fontWeight: '400' as const, lineHeight: 26 },
  caption: { fontSize: 12.5, fontWeight: '500' as const },
  label: { fontSize: 13, fontWeight: '600' as const },
};

export const shadowCard = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 12,
  elevation: 2,
};
