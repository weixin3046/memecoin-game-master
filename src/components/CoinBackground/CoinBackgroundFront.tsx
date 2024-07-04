// import NextImage from 'next/image';
import React from 'react';
import { Box } from '@chakra-ui/react';

import { useWindowStore } from '@/stores/window';

import CoinsFront from '@/components/assets/images/background/coins-front.png';

import MotionBox from '@/components/MotionBox';


export const CoinBackgroundFront = ({ style, animation }: any) => {
  const vh = useWindowStore(state => state.vh);

  return (
    <MotionBox
      position="absolute"
      display="flex"
      bottom="0px"
      left="50%"
      transform="translateX(-50%)"
      justifyContent="center"
      width="100%"
      {...style}
      {...animation}
    >
      <Box
        position="absolute"
        bottom="0"
        height={`${vh * 23}px`}
        width="100vw"
        backgroundImage={CoinsFront.src}
        backgroundRepeat="repeat-x"
        backgroundSize={`${vh * 55}px`}
        bgPosition="bottom"
      />
    </MotionBox>
  );
};
