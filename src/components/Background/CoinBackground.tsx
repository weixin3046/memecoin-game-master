import { Box, Flex } from '@chakra-ui/react';
import CloudBg from '@/components/assets/images/background/cloud.svg';
import CoinPiles from '@/components/assets/images/coin-piles.png';
import NextImage from 'next/image';
import React from 'react';

export const CoinBackground: React.FC = () => {
  return (
    <Flex
      backgroundColor="#3DB8ED"
      width="100%"
      height="1024px"
      flexDirection="column"
      justifyContent="flex-end"
      position="relative"
    >
      <Box
        width="100%"
        height="405px"
        position="absolute"
        bottom="0"
        zIndex="1"
        alignItems="center"
        marginBottom="160px"
      >
        <CloudBg />
      </Box>
      <Box width="100%" height="362px" backgroundColor="#FFC600" zIndex="2" />
      <Box
        zIndex="3"
        position="absolute"
        height="362px"
        right="305px"
        left="-47px"
        bottom="-14px"
        overflow="hidden"
        width="50%"
      >
        <NextImage
          src={CoinPiles}
          alt="coin-piles"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </Box>
    </Flex>
  );
};
