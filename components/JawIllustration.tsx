import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../constants/theme';

type Props = {
  size?: number;
  strokeColor?: string;
  jointColor?: string;
};

// Simplified line-art side profile of a skull/jaw, echoing the reference
// mockups' hand-drawn medical illustration style but rendered in the app's
// own teal palette instead of plain black.
export default function JawIllustration({
  size = 160,
  strokeColor = colors.primaryDark,
  jointColor = colors.accent,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Cranium + face profile */}
      <Path
        d="M52 78
           C48 52 68 26 104 24
           C142 22 168 46 170 78
           C171 92 166 100 158 104
           C158 118 152 128 142 132"
        stroke={strokeColor}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Jaw / mandible line */}
      <Path
        d="M142 132
           C138 148 122 158 104 158
           C88 158 76 152 66 142
           C58 134 54 122 54 110"
        stroke={strokeColor}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chin detail */}
      <Path
        d="M104 158 C112 160 120 158 126 152"
        stroke={strokeColor}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Simple teeth ticks */}
      <Path
        d="M112 140 L112 148 M120 138 L120 147 M128 135 L128 144"
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* TMJ joint highlight, echoing the reference image's pain-point marker */}
      <Circle cx={158} cy={100} r={9} stroke={jointColor} strokeWidth={3} />
      <Circle cx={158} cy={100} r={3} fill={jointColor} />
    </Svg>
  );
}
