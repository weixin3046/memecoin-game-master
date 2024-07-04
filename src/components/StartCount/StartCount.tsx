import React from 'react';

import { useWindowStore } from '@/stores/window';

import MotionBox from '@/components/MotionBox';

import { Dialog8Bit } from '../Dialog8Bit';


export const StartCount = ({ style, animation }: any) => {
  const vh = useWindowStore(state => state.vh);

  return (
    <MotionBox
      position="absolute"
      display="flex"
      left="50%"
      bottom={`${vh * 46}px`}
      alignItems="center"
      justifyContent="center"
      transform="translateX(-50%)"
      {...style}
      {...animation}
    >
      <Dialog8Bit>
        <span style={{ whiteSpace: 'nowrap' }}>SHUT UP AND TAKE MY MONEY!!</span>
      </Dialog8Bit>
    </MotionBox>
  );
};
