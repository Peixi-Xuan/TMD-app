import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

// 参考文献标注，如 [1]、[1-2]、[3,18]、[12-13]
const CITATION_RE = /(\[\d+(?:\s*[-,，]\s*\d+)*\])/g;
const BOLD_RE = /(\*\*[^*]+\*\*)/g;
// 列表行前缀，如 “1）”“1)”“1.”“- ”
const LIST_RE = /^(\d+[）).]|[-•])\s*/;

function isCitation(part: string): boolean {
  return /^\[\d+(?:\s*[-,，]\s*\d+)*\]$/.test(part);
}

function renderCitations(text: string, keyPrefix: string) {
  const parts = text.split(CITATION_RE).filter(Boolean);
  return parts.map((part, i) => {
    if (isCitation(part)) {
      return (
        <Text key={`${keyPrefix}-c${i}`} style={styles.citation}>
          {part}
        </Text>
      );
    }
    return <Text key={`${keyPrefix}-c${i}`}>{part}</Text>;
  });
}

function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(BOLD_RE).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={`${keyPrefix}-${i}`} style={styles.bold}>
          {renderCitations(part.slice(2, -2), `${keyPrefix}-${i}`)}
        </Text>
      );
    }
    return <Text key={`${keyPrefix}-${i}`}>{renderCitations(part, `${keyPrefix}-${i}`)}</Text>;
  });
}

export default function BodyText({ text, fontScale = 1 }: { text: string; fontScale?: number }) {
  if (!text) return null;

  const scaled: TextStyle = {
    fontSize: typography.body.fontSize * fontScale,
    lineHeight: typography.body.lineHeight * fontScale,
  };

  const paragraphs = text.split(/\n\n+/);
  return (
    <View>
      {paragraphs.map((p, idx) => {
        const lines = p.split('\n').filter((l) => l.trim().length > 0);
        return (
          <View key={idx} style={idx > 0 ? styles.paragraphSpacing : undefined}>
            {lines.map((line, i) => {
              const listMatch = line.match(LIST_RE);
              if (listMatch) {
                const marker = listMatch[1];
                const rest = line.slice(listMatch[0].length);
                return (
                  <View key={i} style={styles.listRow}>
                    <Text style={[styles.paragraph, styles.listMarker, scaled]}>
                      {marker === '-' || marker === '•' ? '•' : marker}
                    </Text>
                    <Text style={[styles.paragraph, styles.listContent, scaled]}>
                      {renderInline(rest, `${idx}-${i}`)}
                    </Text>
                  </View>
                );
              }
              return (
                <Text key={i} style={[styles.paragraph, scaled, i > 0 && styles.lineSpacing]}>
                  {renderInline(line, `${idx}-${i}`)}
                </Text>
              );
            })}
          </View>
        );
      })}
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
  lineSpacing: {
    marginTop: spacing.xs,
  },
  bold: {
    fontWeight: '700',
    color: colors.primaryDark,
  },
  citation: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  listRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  listMarker: {
    minWidth: 24,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  listContent: {
    flex: 1,
  },
});
