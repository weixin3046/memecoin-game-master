import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import MotionBox from '@/components/MotionBox';

import { useScale } from '@/utils/useScale';

import type { FlexProps, SystemProps } from '@chakra-ui/react';
import { vt323 } from '@/utils/fonts';

const BlackBox = (props: FlexProps) => {
  return <Flex background="black" alignItems="center" justifyContent="center" flexDirection="column" {...props} />;
};

const WhiteBox = (props: FlexProps) => {
  return <Flex background="white" alignItems="center" justifyContent="center" flexDirection="column" {...props} />;
};

const VFlex = (props: FlexProps) => {
  return <Flex alignItems="center" justifyContent="center" flexDirection="column" {...props} />;
};

export const Dialog8Bit = ({
  pixelSize: _pixelSize = 3,
  scale: _scale = 1,
  fontSize = 24,
  padding = 16,
  paddingX,
  paddingY,
  style,
  animation,
  children,
  textAlign = 'center',
}: any & {
  height?: number;
  pixelSize?: number;
  fontSize?: number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  children?: React.ReactNode;
  scale?: number;
  textAlign?: SystemProps['textAlign'];
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scale = _scale ?? useScale(0.12, 0.12);

  const pixelSize = _pixelSize * scale;
  return (
    <MotionBox display="flex" flexDirection="column" width="fit-content" {...style} {...animation}>
      <Flex flexDirection="column" width="fit-content">
        <Flex>
          <Flex alignItems="center" justifyContent="center">
            <BlackBox height={`calc(100% - ${pixelSize * 6}px)`} width={`${pixelSize}px`}></BlackBox>
            <VFlex height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`} marginRight="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
            <VFlex height={`calc(100% - ${pixelSize * 2}px)`} width={`${pixelSize + 1}px`} marginRight="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
            <VFlex height="100%" width={`${pixelSize + 1}px`} marginRight="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
          </Flex>
          <Flex flexDirection="column">
            <BlackBox width="100%" height={`${pixelSize}px`} />
            <Flex padding={`${(paddingY || padding) * scale}px ${(paddingX || padding) * scale}px`} background="white">
              <Text
                fontFamily={vt323.style.fontFamily}
                fontSize={`${fontSize * scale}px`}
                lineHeight={`${fontSize * scale}px`}
                transform="translateY(0)"
                color="black"
                width="100%"
                height="100%"
                textAlign={textAlign}
                textTransform="uppercase"
              >
                {children}
              </Text>
            </Flex>
            <VFlex width="100%" height={`${pixelSize}px`} flexDirection="row">
              <BlackBox height={`${pixelSize + 1}px`} width={`calc(100% - ${pixelSize * 8}px)`}></BlackBox>
              <WhiteBox height={`${pixelSize + 2}px`} width={`${pixelSize * 16}px`}></WhiteBox>
              <BlackBox height={`${pixelSize + 1}px`} width={`calc(100% - ${pixelSize * 8}px)`}></BlackBox>
            </VFlex>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <VFlex height="100%" width={`${pixelSize + 1}px`} marginLeft="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
            <VFlex height={`calc(100% - ${pixelSize * 2}px)`} width={`${pixelSize + 1}px`} marginLeft="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
            <VFlex height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`} marginLeft="-1px">
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
              <WhiteBox height={`calc(100% - ${pixelSize * 4}px)`} width={`${pixelSize + 1}px`}></WhiteBox>
              <BlackBox height={`${pixelSize * 2}px`} width={`${pixelSize + 1}px`}></BlackBox>
            </VFlex>
            <BlackBox height={`calc(100% - ${pixelSize * 6}px)`} width={`${pixelSize}px`}></BlackBox>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <VFlex width={`${pixelSize * 10}px`} height={`${pixelSize + 1}px`} flexDirection="row" marginTop="-1px">
            <BlackBox width={`${pixelSize * 2}px`} height={`${pixelSize + 1}px`} />
            <WhiteBox width={`${pixelSize * 6}px`} height={`${pixelSize + 1}px`} />
            <BlackBox width={`${pixelSize * 2}px`} height={`${pixelSize + 1}px`} />
          </VFlex>
          <VFlex width={`${pixelSize * 8}px`} height={`${pixelSize + 1}px`} flexDirection="row" marginTop="-1px">
            <BlackBox width={`${pixelSize * 2}px`} height={`${pixelSize + 1}px`} />
            <WhiteBox width={`${pixelSize * 4}px`} height={`${pixelSize + 1}px`} />
            <BlackBox width={`${pixelSize * 2}px`} height={`${pixelSize + 1}px`} />
          </VFlex>
          <VFlex width={`${pixelSize * 6}px`} height={`${pixelSize + 1}px`} flexDirection="row" marginTop="-1px">
            <BlackBox width={`${pixelSize * 1}px`} height={`${pixelSize + 1}px`} />
            <WhiteBox width={`${pixelSize * 4}px`} height={`${pixelSize + 1}px`} />
            <BlackBox width={`${pixelSize * 1}px`} height={`${pixelSize + 1}px`} />
          </VFlex>
          <VFlex width={`${pixelSize * 4}px`} height={`${pixelSize + 1}px`} flexDirection="row" marginTop="-1px">
            <BlackBox width={`${pixelSize * 1}px`} height={`${pixelSize + 1}px`} />
            <WhiteBox width={`${pixelSize * 2}px`} height={`${pixelSize + 1}px`} />
            <BlackBox width={`${pixelSize * 1}px`} height={`${pixelSize + 1}px`} />
          </VFlex>
          <BlackBox width={`${pixelSize * 2}px`} height={`${pixelSize}px`} marginTop="-1px">
            <span></span>
          </BlackBox>
        </Flex>
      </Flex>
    </MotionBox>
  );
};
