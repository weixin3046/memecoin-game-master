import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const Pixel = ({
  height,
  width,
  color,
  z,
  ...props
}: FlexProps & {
  height: number | string;
  width: number | string;
  color: string;
  z?: number;
}) => {
  return (
    <Flex
      background={color}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height={
        typeof height === 'string'
          ? height
          : height < 0
          ? `calc(100% - ${-height}px)`
          : `${height}px`
      }
      width={
        typeof width === 'string'
          ? width
          : width < 0
          ? `calc(100% - ${-width}px)`
          : `${width}px`
      }
      zIndex={z}
      {...props}
    />
  );
};

export const Group = ({
  height,
  width,
  vertical,
  horizontal,
  offsetL,
  offsetR,
  children,
  z,
}: {
  height?: number | string;
  width?: number | string;
  vertical?: boolean;
  horizontal?: boolean;
  offsetL?: boolean;
  offsetR?: boolean;
  children: React.ReactNode;
  z?: number;
}) => {
  const offset = offsetR || offsetL;
  return (
    <Flex
      position="relative"
      flexDirection={vertical ? 'column' : 'row'}
      height={
        height
          ? typeof height === 'string'
            ? height
            : height < 0
            ? `calc(100% - ${-height}px)`
            : `${height}px`
          : undefined
      }
      width={
        width
          ? typeof width === 'string'
            ? width
            : width < 0
            ? `calc(100% - ${-width + (offset && vertical ? 1 : 0)}px)`
            : `${width + (offset && vertical ? 1 : 0)}px`
          : undefined
      }
      justifyContent="center"
      marginLeft={offsetL && vertical ? `-1px` : undefined}
      marginRight={offsetR && vertical ? `-1px` : undefined}
      marginTop={offsetR && horizontal ? `-1px` : undefined}
      zIndex={z}
    >
      {children}
    </Flex>
  );
};
