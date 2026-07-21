import { ImageSourcePropType } from 'react-native';

// 图片素材映射表：learning-module.json 中的 figure.placeholder → 本地资源。
// 素材就位后放入 assets/figures/ 并在此处加一行映射，页面代码无需改动。
// 注意：真实患者影像/照片放入前需确认知情同意与去标识化。
export const figureAssets: Record<string, ImageSourcePropType> = {
  'media/image1.tiff': require('../assets/figures/icr-cbct-mri-imaging.png'), // ICR CBCT & MRI imaging comparison
  'media/image2.jpeg': require('../assets/figures/dental-occlusion-soft-splint.png'), // Dental occlusion with soft splint
  'media/image3.jpeg': require('../assets/figures/dental-occlusion-stabilization-splint.png'), // Dental occlusion with stabilization splint
  'media/image4.jpeg': require('../assets/figures/dental-occlusion-anterior-repositioning-splint.png'), // Dental occlusion with anterior repositioning splint
  'media/image5.jpeg': require('../assets/figures/dental-occlusion-mild-anterior-repositioning-splint.png'), // Dental occlusion with mild anterior repositioning splint
};

export function getFigureAsset(placeholder: string): ImageSourcePropType | undefined {
  return figureAssets[placeholder];
}
