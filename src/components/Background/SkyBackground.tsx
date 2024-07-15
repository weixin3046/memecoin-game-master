import React from "react";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

import { useWindowStore } from "@/stores/window";

import Sky from "@/components/assets/images/background/sky-1.gif";

import MotionBox from "@/components/MotionBox";

export const SkyBackground = ({ style, animation }: any) => {
  const vh = useWindowStore((state) => state.vh);
  return (
    <MotionBox
      position="absolute"
      top="0"
      left="50%"
      transform="translateX(-50%)"
      display="flex"
      width="100vw"
      userSelect="none"
      pointerEvents="none"
      {...style}
      {...animation}
    >
      <Box position="relative" height={`${vh * 100}px`} width="100%">
        <NextImage
          src={Sky}
          alt="sky"
          fill={true}
          style={{ opacity: 0.3, pointerEvents: "none", userSelect: "none" }}
        />
      </Box>
    </MotionBox>
  );
};
