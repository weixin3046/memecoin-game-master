import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import MotionBox from '@/components/MotionBox';
import { Group, Pixel } from '@/components/Pixel/Pixel';
import { spinner8bit } from './spinner8bit';

import { useScale } from '@/utils/useScale';

import type { MouseEventHandler } from 'react';

const colors: any = {
  black: {
    lighter: '#F3F3F3',
    darker: '#9C9C9C',
    primary: '#E5E5E5',
  },
  yellow: {
    lighter: '#FDEDC9',
    darker: '#AB8010',
    primary: '#F8C34B',
  },
  green: {
    lighter: '#93DEA4',
    darker: '#2F791E',
    primary: '#30CC53',
  },
  red: {
    lighter: '#FF8E8E',
    darker: '#953B3B',
    primary: '#F84B4B',
  },
  blue: {
    lighter: '#75C7FF',
    darker: '#27638B',
    primary: '#1D9BF0',
  },
  gray: {
    lighter: '#F3F3F3',
    darker: '#9C9C9C',
    primary: '#E5E5E5',
  },
};

export const Button8Bit2 = ({
  height,
  width,
  px: _pixelSize = 3,
  style,
  animation,
  padding = 12,
  fontSize = 18,
  lineHeight = 28,
  children,
  color = 'yellow',
  useScale: _useScale,
  loading = false,
  onClick = undefined,
  ...props
}: any & {
  px?: number;
  padding?: number;
  fontSize?: number;
  lineHeight?: number;
  children?: React.ReactNode;
  useScale?: boolean;
  color?: keyof typeof colors;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  loading?: boolean;
  spinnerSize?: number;
  onClick?: MouseEventHandler<Element> | undefined;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scale = _useScale ? useScale(0.12, 0.12) : 1;
  const spinnerSize = props.spinnerSize || _pixelSize;
  const disabled = loading ? true : props.disabled;

  const px = _pixelSize * scale;
  const { primary, lighter, darker } = colors[color];

  return (
    <MotionBox
      display="flex"
      position="relative"
      flexDirection="column"
      width={typeof width === 'string' ? width : 'fit-content'}
      zIndex="10"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.4 : 1.0}
      userSelect="none"
      onClick={onClick}
      sx={{
        '--primary-color': primary,
        '--lighter-shade': lighter,
        '--darker-shade': darker,
        '&:active': disabled
          ? {}
          : {
              'transform': 'translate(2px, 2px)',
              '--lighter-shade': darker,
              '--darker-shade': lighter,
            },
      }}
      {...style}
      {...animation}
    >
      <Group horizontal width={typeof width === 'string' ? width : 'fit-content'}>
        <Group horizontal>
          <Group vertical width={px} offsetR>
            <Pixel height={px} width="100%" color="var(--lighter-shade)" />
            <Pixel height={-px * 6} width="100%" color="var(--primary-color)" />
            <Pixel height={px} width="100%" color="var(--darker-shade)" />
          </Group>
          <Group vertical width={px} offsetR>
            <Pixel height={px} width="100%" color="var(--lighter-shade)" />
            <Pixel height={-px * 4} width="100%" color="var(--primary-color)" />
            <Pixel height={px} width="100%" color="var(--darker-shade)" />
          </Group>
        </Group>
        <Group vertical width="100%" z={3}>
          <Group vertical width="100%">
            <Pixel height={px} width="100%" color="var(--lighter-shade)" />
            <Flex
              padding={`${Math.round(padding * scale)}px ${Math.round(padding * scale)}px`}
              background="var(--primary-color)"
              height={typeof height === 'string' ? height : height ? `${Math.round(height * scale)}px` : undefined}
              width={typeof width === 'string' ? width : width ? `${Math.round(width * scale)}px` : undefined}
              fontSize={`${Math.round(fontSize * scale)}px`}
              lineHeight={`${Math.round(lineHeight * scale)}px`}
              color="black"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              textTransform="uppercase"
            >
              {loading && (
                <Box
                  position="absolute"
                  height={`${spinnerSize}px`}
                  width={`${spinnerSize}px`}
                  transition="none"
                  animation={spinner8bit({ size: spinnerSize })}
                ></Box>
              )}
              <Box fontWeight={700} height="100%" opacity={loading ? 0 : 1} transition="none">
                {children}
              </Box>
            </Flex>
            <Pixel height={px} width="100%" color="var(--darker-shade)" />
          </Group>
        </Group>
        <Group horizontal>
          <Group vertical width={px} offsetL z={2}>
            <Pixel height={px} width="100%" color="var(--lighter-shade)" />
            <Pixel height={-px * 4} width="100%" color="var(--primary-color)" />
            <Pixel height={px} width="100%" color="var(--darker-shade)" />
          </Group>
          <Group vertical width={px} offsetL z={1}>
            <Pixel height={px} width="100%" color="var(--lighter-shade)" />
            <Pixel height={-px * 6} width="100%" color="var(--primary-color)" />
            <Pixel height={px} width="100%" color="var(--darker-shade)" />
          </Group>
        </Group>
      </Group>
    </MotionBox>
  );
};
