/* eslint-disable react/jsx-key */
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Pixel0 from '../assets/images/pixelart/0.svg';
import Pixel1 from '../assets/images/pixelart/1.svg';
import Pixel2 from '../assets/images/pixelart/2.svg';
import Pixel3 from '../assets/images/pixelart/3.svg';
import Pixel4 from '../assets/images/pixelart/4.svg';
import Pixel5 from '../assets/images/pixelart/5.svg';
import Pixel6 from '../assets/images/pixelart/6.svg';
import Pixel7 from '../assets/images/pixelart/7.svg';
import Pixel8 from '../assets/images/pixelart/8.svg';
import Pixel9 from '../assets/images/pixelart/9.svg';
import Minus from '../assets/images/pixelart/minus.svg';
import Plus from '../assets/images/pixelart/plus.svg';

import type { BoxProps } from '@chakra-ui/react';

const pixelNumbers = [
  <Pixel0 />,
  <Pixel1 />,
  <Pixel2 />,
  <Pixel3 />,
  <Pixel4 />,
  <Pixel5 />,
  <Pixel6 />,
  <Pixel7 />,
  <Pixel8 />,
  <Pixel9 />,
];

export const PixelatedNumber = ({
  number,
  withSign,
  color = '#013043',
  fontSize = '48px',
  ...props
}: BoxProps & { color?: string; number: number; withSign?: boolean }) => {
  const numberAsString = number.toString().split('');

  return (
    <Flex color={color}>
      {withSign && number > 0 ? (
        <Box key="sign" width={fontSize} height={fontSize}>
          <Plus />
        </Box>
      ) : undefined}
      {numberAsString.map((digit, index) => (
        <Box
          key={`${index}-${digit}`}
          {...props}
          width={fontSize}
          height={fontSize}
        >
          {digit === '-' ? <Minus /> : pixelNumbers[parseInt(digit)]}
        </Box>
      ))}
    </Flex>
  );
};
