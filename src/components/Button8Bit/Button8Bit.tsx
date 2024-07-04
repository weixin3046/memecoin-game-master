import React from 'react';
import { Button, Flex, Spacer } from '@chakra-ui/react';

import MotionBox from '@/components/MotionBox';

import type { ButtonProps } from '@chakra-ui/react';

const _primaryColor = '#F8C34B';
const _lighterColor = 'rgba(255, 255, 255, 0.7)';
const _darkerColor = 'rgba(0, 0, 0, 0.35)';
const _pixelSize = 3;

export const Button8Bit = ({
  style,
  animation,
  padding,
  primaryColor = _primaryColor,
  lighterColor = _lighterColor,
  darkerColor = _darkerColor,
  pixelSize = _pixelSize,
  children,
  ...props
}: Omit<ButtonProps, 'animation' | 'style'> &
  any & {
    pixelSize?: number;
    lighterColor?: string;
    darkerColor?: string;
    primaryColor?: string;
    buttonProps?: ButtonProps;
    children?: React.ReactNode;
    padding?: string;
  }) => {
  return (
    <MotionBox display="flex" flex="1" {...style} {...animation}>
      <Button
        outline="none !important"
        background="none !important"
        border="none !important"
        height="unset !important"
        padding="unset !important"
        transition="none !important"
        sx={{
          '--primary-color': primaryColor,
          '--lighter-shade': lighterColor,
          '--darker-shade': darkerColor,
          '--pixel-size': `${pixelSize}px`,
          '&:active': {
            'transform': 'translate(2px, 2px)',
            '--lighter-shade': darkerColor,
            '--darker-shade': lighterColor,
          },
        }}
        {...props}
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) + 1px)"
            height="calc(100% - calc(var(--pixel-size) * 4))"
            marginRight="-1px"
          >
            <Flex background="var(--lighter-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
          </Flex>
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) + 1px)"
            height="calc(100% - calc(var(--pixel-size) * 2))"
            marginRight="-1px"
          >
            <Flex background="var(--lighter-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
          </Flex>
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) * 4 + 1px)"
            height="100%"
            marginRight="-1px"
          >
            <Flex background="var(--lighter-shade)" width="100%" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="100%" height="var(--pixel-size)"></Flex>
          </Flex>
          <Flex position="relative" padding={padding} background="var(--primary-color)">
            <Flex
              position="absolute"
              top={0}
              left={0}
              background="var(--lighter-shade)"
              width="100%"
              height="var(--pixel-size)"
            ></Flex>
            {children}
            <Flex
              position="absolute"
              bottom={0}
              left={0}
              background="var(--darker-shade)"
              width="100%"
              height="var(--pixel-size)"
            ></Flex>
          </Flex>
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) * 4 + 1px)"
            height="100%"
            alignItems="flex-end"
            marginLeft="-1px"
          >
            <Flex background="var(--lighter-shade)" width="100%" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="100%" height="var(--pixel-size)"></Flex>
          </Flex>
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) + 1px)"
            height="calc(100% - calc(var(--pixel-size) * 2))"
            alignItems="flex-end"
            marginLeft="-1px"
          >
            <Flex background="var(--lighter-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
          </Flex>
          <Flex
            position="relative"
            flexDirection="column"
            background="var(--primary-color)"
            width="calc(var(--pixel-size) + 1px)"
            height="calc(100% - calc(var(--pixel-size) * 4))"
            alignItems="flex-end"
            marginLeft="-1px"
          >
            <Flex background="var(--lighter-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
            <Spacer />
            <Flex background="var(--darker-shade)" width="var(--pixel-size)" height="var(--pixel-size)"></Flex>
          </Flex>
        </Flex>
      </Button>
    </MotionBox>
  );
};
