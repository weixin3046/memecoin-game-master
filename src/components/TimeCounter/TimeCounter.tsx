import React from 'react';
import { Box, Flex, keyframes } from '@chakra-ui/react';

import { useTeaserStore } from '@/stores/teaser';

import PixelClock from '@/components/assets/images/pixelart/clock.svg';
import PixelColon from '@/components/assets/images/pixelart/colon.svg';
import TimeBackground from '@/components/assets/images/pixelart/time_background.svg';

import MotionBox from '@/components/MotionBox';

import { PixelatedNumber } from '../PixelatedNumber';

const shake = keyframes`
0%, 100% {
  transform: translateX(0);
}
10%, 30%, 50%, 70%, 90% {
  transform: translateX(-2px);
}
20%, 40%, 60%, 80% {
  transform: translateX(2px);
}
`;

const triggerShaking = 10;

export const TimeCounter = ({
  fontSize = '20px',
  style,
  animation,
}: any) => {
  const timeLeft = useTeaserStore(state => state.timeLeft);

  return (
    <MotionBox display="flex" {...style} {...animation} alignItems="center" justifyContent="center">
      <Box key={timeLeft} animation={timeLeft <= triggerShaking && timeLeft !== 0 ? `${shake} 1s linear` : ''}>
        <Box position="absolute" width="164px" height="40px" zIndex="-1">
          <TimeBackground />
        </Box>
        <Flex key={timeLeft} position="relative" alignItems="center" justifyContent="center">
          <Box background="black" width="4px" height="calc(100% - 4px * 4)" />
          <Box background="black" width="8px" height="calc(100% - 4px * 2)" />
          <Flex background="black" alignItems="center" padding="8px 8px" position="relative">
            <Box width="24px" height="24px" marginRight="8px">
              <PixelClock />
            </Box>
            <PixelatedNumber color="black" number={0} fontSize={fontSize} />
            <PixelatedNumber color="black" number={0} fontSize={fontSize} />
            <Box width={`${(20 * 17) / 31}px`} height={fontSize}>
              <PixelColon color="black" />
            </Box>
            {timeLeft < 10 && <PixelatedNumber color="black" number={0} fontSize={fontSize} />}
            <PixelatedNumber color="black" number={timeLeft} fontSize={fontSize} />
          </Flex>
          <Box background="black" width="8px" height="calc(100% - 4px * 2)" />
          <Box background="black" width="4px" height="calc(100% - 4px * 4)" />
        </Flex>
      </Box>
    </MotionBox>
  );
};
