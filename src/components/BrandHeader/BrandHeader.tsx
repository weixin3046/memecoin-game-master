import React from "react";
import NextImage from "next/image";
import { Flex } from "@chakra-ui/react";

import { useTeaserStore } from "@/stores/teaser";
import { Hide, Show, useWindowStore } from "@/stores/window";

import ClickStartButtonSound from "@/components/assets/audios/click-start-button.mp3";
import MemeCoinBanner from "@/components/assets/images/memecoin-banner.gif";
import MemelandPresents from "@/components/assets/images/pixelart/memeland_presents.svg";
import OneMemeToRuleThemAll from "@/components/assets/images/pixelart/one_meme_to_rule_them_all.svg";

import MotionBox from "@/components/MotionBox";
import { Button8Bit2 } from "@/components/Button8Bit2";

import { useScale } from "@/utils/useScale";

import { CoinCounter } from "../CoinCounter";
import { TimeCounter } from "../TimeCounter";
import { StartButton } from "../StartButton";

const getInfoContainerWidth = (vw: number) => {
  const isMobile = vw * 100 < 480;
  const isMd = vw * 100 < 640;

  if (isMobile) {
    return "80%";
  } else if (isMd) {
    return "50%";
  } else {
    return "32%";
  }
};

export const BrandHeader = ({ style, animation, balance }: any) => {
  const { state } = useTeaserStore((state) => ({
    state: state.state,
  }));
  const vh = useWindowStore((state) => state.vh);
  const vw = useWindowStore((state) => state.vw);

  const infoContainerWidth = getInfoContainerWidth(vw);

  const shouldShowMemelandPresent =
    state !== "in-game" && state !== "count-down" && state !== "score-board";

  return (
    <MotionBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      {...style}
      {...animation}
      marginTop={{
        base: `${vh * 10}px`,
        lg: `${vh * 8}px`,
      }}
      gap={`${vh * 2}px`}
      pointerEvents={state === "in-game" ? "none" : undefined}
    >
      <Flex
        width={`${vh * 22}px`}
        marginTop={`${useScale(4)}px`}
        maxWidth="60vw"
        alignItems="center"
        justifyContent="center"
        visibility={shouldShowMemelandPresent ? "visible" : "hidden"}
        pointerEvents="none"
        className="memeland-presented-flex-wrapper"
      >
        <MemelandPresents height="100%" width="100%" />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        width={`${vh * 40}px`}
        maxWidth="78vw"
        pointerEvents="none"
        as="h1"
        fontSize="0px"
        className="memecoin-flex-wrapper"
      >
        Memecoin
        <NextImage src={MemeCoinBanner} alt="Memecoin" />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        width={`${vh * 40}px`}
        maxWidth="78vw"
        pointerEvents="none"
        as="h1"
        fontSize="0px"
        className="one-meme-rule-them-all-flex-wrapper"
      >
        One $meme to rule them all.
        <OneMemeToRuleThemAll height="100%" width="100%" />
      </Flex>
      <Hide isDesktop>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginTop={`${vh * 1}px`}
          display={state === "in-game" ? "initial" : "none"}
          width={"100%"}
        >
          <TimeCounter
            style={{
              position: "absolute",
              zIndex: 10,
              pointerEvents: "none",
              transform: `scale(${useScale(0.13)})`,
              width: "100%",
              visibility: state === "in-game" ? "visible" : "hidden",
            }}
          />
          <CoinCounter
            style={{
              position: "absolute",
              width: "100%",
              transform: `translateY(${vh * 13}px)`,
              zIndex: 10,
              visibility: state === "in-game" ? "visible" : "hidden",
            }}
          />
        </Flex>
      </Hide>

      <Flex
        flexDirection="column"
        alignItems="center"
        gap="24px"
        justifyContent="center"
        marginBottom={`${vh * 3}px`}
        width={infoContainerWidth}
        display={state === "in-game" ? "none" : "initial"}
      >
        <Flex justifyContent={"center"} mb={"16px"}>
          <StartButton balance={balance} />
        </Flex>
      </Flex>
      <Show isDesktop>
        <TimeCounter
          style={{
            zIndex: 10,
            pointerEvents: "none",
            visibility: state === "in-game" ? "visible" : "hidden",
          }}
        />
      </Show>
    </MotionBox>
  );
};
