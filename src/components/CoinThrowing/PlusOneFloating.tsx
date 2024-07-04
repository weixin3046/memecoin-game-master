import React from 'react';

import { useTeaserStore } from '@/stores/teaser';

import MotionBox from '@/components/MotionBox';

import { PlusOne } from '../PlusOne';


export const PlusOneFloating = ({ style, animation }: any) => {
  const plusOnes = useTeaserStore(state => state.plusOnes);

  return (
    <MotionBox
      position="fixed"
      left="0"
      top="0"
      display="flex"
      bottom="48px"
      width="100%"
      pointerEvents="none"
      {...style}
      {...animation}
    >
      {plusOnes.map(plusOne => (
        <PlusOne key={plusOne.id} {...plusOne} />
      ))}
    </MotionBox>
  );
};
