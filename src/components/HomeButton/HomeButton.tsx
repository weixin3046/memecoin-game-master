import React from 'react';

import { useTeaserStore } from '@/stores/teaser';

import ClickStartButtonSound from '@/components/assets/audios/click-start-button.mp3';

import MotionBox from '@/components/MotionBox';

import { useScale } from '@/utils/useScale';

import { Button8Bit } from '../Button8Bit';

import type { ButtonProps } from '@chakra-ui/react';

const playSound = () => {
  if (!useTeaserStore.getState().playingAudio) return;
  const audio = new Audio(ClickStartButtonSound);
  audio.volume = 0.2;
  audio.play();
};

export const HomeButton = ({
  style,
  animation,
  ...props
}: Omit<ButtonProps, 'animation' | 'style' | 'padding'> &
  any & {
    padding?: string;
  }) => {
  const scale = useScale(0.15, 0.13);

  return (
    <MotionBox {...style} {...animation}>
      <Button8Bit
        pixelSize={3 * scale}
        padding={`${8 * scale}px ${18 * scale}px`}
        onMouseDown={(e: any) => {
          playSound();
          props.onMouseDown?.(e);
        }}
        onTouchStart={(e: any) => {
          playSound();
          props.onTouchStart?.(e);
        }}
        onClick={(e: any) => {
          useTeaserStore.getState().onHomeButtonClick();
          props.onClick?.(e);
        }}
        {...props}
      >
        <svg
          width={`${24 * scale}px`}
          height={`${24 * scale}px`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 2H14V4H12V6H10V8H8V10H6V12H4V20V28H12V22H14V20H18V22H20V28H28V20V12H26V10H24V8H22V6H20V4H18V2Z"
            fill="black"
          />
        </svg>
      </Button8Bit>
    </MotionBox>
  );
};
