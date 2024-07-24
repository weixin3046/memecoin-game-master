"use client";
import { SkyBackground } from "@/components/Background/SkyBackground";
import {
  CoinBackgroundBack,
  CoinBackgroundFront,
} from "@/components/CoinBackground";
import MotionBox from "@/components/MotionBox";
import { TeaserCharacter } from "@/components/TeaserCharacter";
import { useTeaserStore } from "@/stores/teaser";
import { useWindowStore } from "@/stores/window";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function RecordsPage() {
  const vh = useWindowStore((state) => state.vh);
  const vw = useWindowStore((state) => state.vw);
  const character = useTeaserStore((state) => state.character);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Flex flexDirection="column" alignItems="center" width="100%">
      {show && (
        <MotionBox
          className="teaser"
          height={100 * vh}
          width={100 * vw}
          background="#5FC7FF"
          transform="translate3d(0px, 0px, 0px)"
          overflow="hidden"
          style={{ touchAction: "pan-x pan-y" }}
        >
          <Flex
            margin="auto"
            position="relative"
            width="100%"
            height="100%"
            maxWidth="1440px"
          >
            {/* <Card
          className="!bg-opacity-50 overflow-y-auto !bg-black absolute "
          style={{ zIndex: 10 }}
          top={`${vh * 10}px`}
          width={`${vh * 80}px`}
          height={`${vh * 40}px`}
        >
          <CardBody className="text-opacity-100 text-white text-2xl font-bold">
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
        </Card> */}
            <SkyBackground style={{ zIndex: 0 }} />
            <CoinBackgroundBack style={{ zIndex: 3 }} />
            <TeaserCharacter
              isInGame={false}
              character={character}
              style={{ zIndex: 4 }}
            />
            <CoinBackgroundFront style={{ zIndex: 6 }} />
          </Flex>
        </MotionBox>
      )}
    </Flex>
  );
}
