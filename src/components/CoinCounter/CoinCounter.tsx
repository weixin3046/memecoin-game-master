import React from "react";
import NextImage from "next/image";
import { Box, Flex, keyframes } from "@chakra-ui/react";

import { useTeaserStore } from "@/stores/teaser";

import MemeCoin from "@/components/assets/images/memecoin.png";
import PixelX from "@/components/assets/images/pixelart/x.svg";

import MotionBox from "@/components/MotionBox";

import { PixelatedNumber } from "../PixelatedNumber";
import Link from "next/link";

const bounce = keyframes`
0%, 20% {
  transform: translateY(0);
}
10% {
  transform: translateY(-15px);
}
`;

export const CoinCounter = ({ style, animation }: any) => {
  const count = useTeaserStore((state) => state.coinCount);
  const targetedScore = useTeaserStore(
    (state) => state.gameConfig.targetedScore
  );
  const state = useTeaserStore((state) => state.state);
  const gameConfig = useTeaserStore((state) => state.gameConfig);

  return (
    <MotionBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      {...style}
      {...animation}
    >
      <Box width="48px" height="48px">
        <NextImage
          src={MemeCoin}
          alt="MEMECOIN"
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </Box>
      <Box color="#013043" width={`${(28 * 21) / 32}px`} height="100%">
        <PixelX />
      </Box>
      <Flex>
        <PixelatedNumber
          number={count}
          fontSize="28px"
          animation={
            count !== 0 && state === "in-game" ? `${bounce} 1s ease-in-out` : ""
          }
        />
      </Flex>
    </MotionBox>
  );
};
