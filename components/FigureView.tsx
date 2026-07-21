import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors, radius, spacing } from '../constants/theme';
import { Figure } from '../lib/dictionary';
import { getFigureAsset } from '../lib/figures';

export default function FigureView({ figure }: { figure: Figure }) {
  const source = getFigureAsset(figure.placeholder);
  const [fullscreen, setFullscreen] = useState(false);
  const { width } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  if (!source) {
    return (
      <View style={styles.figureCard}>
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={26} color={colors.textTertiary} />
          <Text style={styles.placeholderText}>图像素材建设中</Text>
        </View>
        <Text style={styles.caption}>{figure.caption}</Text>
      </View>
    );
  }

  let aspectRatio = 4 / 3;
  let fullscreenImageHeight = undefined;

  try {
    const resolved = Image.resolveAssetSource(source);
    if (resolved?.width && resolved?.height) {
      aspectRatio = resolved.width / resolved.height;
      fullscreenImageHeight = (width - spacing.lg * 2) * (resolved.height / resolved.width);
    }
  } catch (e) {
    // Web environment may not support resolveAssetSource
    aspectRatio = 4 / 3;
  }

  return (
    <View style={styles.figureCard}>
      <Pressable onPress={() => setFullscreen(true)}>
        <Image source={source} style={[styles.image, { aspectRatio }]} resizeMode="contain" />
      </Pressable>
      <Text style={styles.caption}>{figure.caption}</Text>

      <Modal visible={fullscreen} transparent animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <Pressable style={styles.fullscreenBackdrop} onPress={() => setFullscreen(false)}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            scrollEnabled={true}
          >
            <Image
              source={source}
              style={[
                styles.fullscreenImage,
                {
                  width: Math.min(width - spacing.lg * 2, 1200),
                  height: fullscreenImageHeight ? fullscreenImageHeight * (Math.min(width - spacing.lg * 2, 1200) / (width - spacing.lg * 2)) : undefined,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={styles.fullscreenCaption}>{figure.caption}</Text>
            <View style={styles.closeHint}>
              <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.closeHintText}>点击任意处关闭</Text>
            </View>
          </ScrollView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  figureCard: {
    marginBottom: spacing.md,
  },
  placeholder: {
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
  placeholderText: {
    fontSize: 12.5,
    color: colors.textTertiary,
  },
  image: {
    width: '100%',
    height: undefined,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardMuted,
    maxHeight: 400,
  },
  caption: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  fullscreenBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    padding: spacing.lg,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  fullscreenImage: {
    backgroundColor: 'transparent',
  },
  fullscreenCaption: {
    color: '#D8E4E3',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    textAlign: 'center',
  },
  closeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xl,
    opacity: 0.7,
  },
  closeHintText: {
    color: '#fff',
    fontSize: 12,
  },
});
