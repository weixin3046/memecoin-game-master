import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { useTeaserStore } from '@/stores/teaser';
import { CHARACTER_DATA } from '@/stores/teaser/utils/character';

import BackgroundMusicRickRoll from '@/components/assets/audios/background-music-rick-roll.mp3';
import ClickCoinSound from '@/components/assets/audios/click-coin.mp3';
import ClickStartButtonSound from '@/components/assets/audios/click-start-button.mp3';

import { loadMultiple } from './load';

export const PreloadAssets = () => {
  useEffect(() => {
    (async () => {
      const character = useTeaserStore.getState().character;
      await loadMultiple(
        [
          ...CHARACTER_DATA.map(data => data.staticImage.src),
          ...CHARACTER_DATA.map(data => data.animateImage.src),
          character.animateImage.src,
          ClickCoinSound,
          ClickStartButtonSound,
          BackgroundMusicRickRoll,
        ],
        3,
      );
    })();
  }, []);

  return <Box position="absolute" opacity="0" userSelect="none" pointerEvents="none"></Box>;
};
