import React from 'react';
import { chakra, Flex } from '@chakra-ui/react';

import { useTeaserStore } from '@/stores/teaser';
import { useWindowStore } from '@/stores/window';

import MotionBox from '@/components/MotionBox';

import { Dialog8Bit } from '../Dialog8Bit';
import { HomeButton } from '../HomeButton';


export const ScoreBoard = ({ style, animation }: any) => {
  const coinCount = useTeaserStore(state => state.coinCount);
  const vh = useWindowStore(state => state.vh);

  return (
    <MotionBox
      position="absolute"
      display="flex"
      left="50%"
      bottom={`${vh * 45}px`}
      alignItems="center"
      justifyContent="center"
      transform="translateX(-50%)"
      {...style}
      {...animation}
    >
      <Flex flexDirection="column" alignItems="center" gap={`${vh * 3}px`}>
        <Dialog8Bit>
          <span style={{ whiteSpace: 'nowrap', lineHeight: `${vh * 1}px` }}>
            {coinCount > 0 ? (
              <>
                LFG! <chakra.span color="#AB8010">{`${coinCount}`}</chakra.span> $MEME! <br /> Can those fingers do
                more?
              </>
            ) : (
              <>
                Surely you can do better. <br /> Game on!
              </>
            )}
          </span>
          <span style={{ whiteSpace: 'nowrap' }}></span>
        </Dialog8Bit>
        <HomeButton
          onClick={() => {
            useTeaserStore.getState().onHomeButtonClick();
          }}
        />
      </Flex>
    </MotionBox>
  );
};
