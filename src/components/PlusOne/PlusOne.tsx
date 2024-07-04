import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { useTeaserStore } from '@/stores/teaser';

import MotionBox from '@/components/MotionBox';

import { PixelatedNumber } from '../PixelatedNumber';

import styles from './styles.module.css';

import type { PlusOneProps } from '@/stores/teaser';

export const PlusOne = ({ id, initialX, initialY, amount }: PlusOneProps) => {
  useEffect(() => {
    setTimeout(() => {
      useTeaserStore.getState().removePlusOne(id);
    }, 1000);
  }, []);
  return (
    <Box
      position="fixed"
      style={{
        transform: `translate(${initialX}px, ${initialY}px)`,
      }}
    >
      <MotionBox className={styles.floating}>
        <PixelatedNumber number={amount} withSign={true} fontSize={8} color={amount < 0 ? 'red' : '#013043'} />
      </MotionBox>
    </Box>
  );
};
