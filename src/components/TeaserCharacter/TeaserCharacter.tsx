import React from 'react';
import NextImage from 'next/image';

import { useWindowStore } from '@/stores/window';

import MotionBox from '@/components/MotionBox';

import type { Character } from '@/stores/teaser/utils/character';

export const TeaserCharacter = ({
  isInGame,
  character,
  style,
  animation,
}: any & { isInGame: boolean; character: Character }) => {
  const vh = useWindowStore(state => state.vh);

  return (
    <MotionBox
      position="absolute"
      display="flex"
      bottom={`${vh * 10}px`}
      width={`${vh * 80}px`}
      height={`${vh * 40}px`}
      left="50%"
      transform="translateX(-50%)"
      pointerEvents="none"
      userSelect="none"
      {...style}
      {...animation}
    >
      <NextImage
        src={isInGame ? character.animateImage : character.staticImage}
        alt="character"
        style={{
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        fill={true}
      />
    </MotionBox>
  );
};
