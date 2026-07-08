import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={`${keyPrefix}-${i}`} style={styles.bold}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return <Text key={`${keyPrefix}-${i}`}>{part}</Text>;
  });
}

export default function BodyText({ text }: { text: string }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/);
  return (
    <View>
      {paragraphs.map((p, idx) => (
        <Text key={idx} style={[styles.paragraph, idx > 0 && styles.paragraphSpacing]}>
          {renderInline(p, String(idx))}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    ...typography.body,
    color: colors.textPrimary,
  },
  paragraphSpacing: {
    marginTop: spacing.md,
  },
  bold: {
    fontWeight: '700',
    color: colors.primaryDark,
  },
});
