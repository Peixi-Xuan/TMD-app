import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type FontScaleLevel = 'small' | 'normal' | 'large';

export const FONT_SCALES: Record<FontScaleLevel, number> = {
  small: 0.9,
  normal: 1,
  large: 1.15,
};

export const FONT_LEVELS: FontScaleLevel[] = ['small', 'normal', 'large'];

const STORAGE_KEY = 'tmd-app:font-scale-level';

const FontScaleContext = createContext<{
  level: FontScaleLevel;
  scale: number;
  setLevel: (level: FontScaleLevel) => void;
}>({ level: 'normal', scale: 1, setLevel: () => {} });

export function FontScaleProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevelState] = useState<FontScaleLevel>('normal');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && FONT_LEVELS.includes(saved as FontScaleLevel)) {
        setLevelState(saved as FontScaleLevel);
      }
    });
  }, []);

  const setLevel = (next: FontScaleLevel) => {
    setLevelState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  return (
    <FontScaleContext.Provider value={{ level, scale: FONT_SCALES[level], setLevel }}>
      {children}
    </FontScaleContext.Provider>
  );
}

export function useFontScale() {
  return useContext(FontScaleContext);
}
