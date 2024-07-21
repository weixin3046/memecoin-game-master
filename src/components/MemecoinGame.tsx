"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";

import { GAME_CONFIG_V1, useTeaserStore } from "@/stores/teaser";
import { Show, useWindowStore } from "@/stores/window";

import BackgroundMusic from "./assets/audios/background-music.mp3";

import { SkyBackground } from "./Background/SkyBackground";
import { CoinBackgroundBack, CoinBackgroundFront } from "./CoinBackground";
import { CoinCounter } from "./CoinCounter";
import { CoinThrowing, PlusOneFloating } from "./CoinThrowing";
import MotionBox from "./MotionBox";
import { PreloadAssets } from "./PreloadAssets";
import { ScoreBoard } from "./ScoreBoard";
import { SocialButtons } from "./SocialButtons";
import { StartCount } from "./StartCount";
import { TeaserCharacter } from "./TeaserCharacter";
import { BrandHeader } from "./BrandHeader";
import useToken from "@/hooks/useToken";

export const MemecoinGame = () => {
  const vh = useWindowStore((state) => state.vh);
  const vw = useWindowStore((state) => state.vw);
  const { balance } = useToken();

  const character = useTeaserStore((state) => state.character);
  const state = useTeaserStore((state) => state.state);
  const playingAudio = useTeaserStore(
    (state) => state.playingAudio && state.browserActive
  );
  const bgMusic = useRef() as React.MutableRefObject<HTMLAudioElement>;

  useEffect(() => {
    useTeaserStore.getState().setGameConfig(GAME_CONFIG_V1);
    return () => {
      bgMusic.current?.play();
    };
  }, []);

  const startMusic = async (force = false) => {
    const play = playingAudio || force;
    if (bgMusic.current) {
      if (play && bgMusic.current.paused) {
        await bgMusic.current?.play();
        useTeaserStore.setState({ playedAudio: true, playingAudio: true });
      }
      if (!play && !bgMusic.current.paused) {
        bgMusic.current?.pause();
        if (!useTeaserStore.getState().playedAudio)
          useTeaserStore.setState({ playingAudio: false });
      }
    } else {
      if (play) {
        const audio = new Audio(BackgroundMusic);
        bgMusic.current = audio;
        audio.loop = true;
        audio.volume = 0.2;
        try {
          await audio.play();
          useTeaserStore.setState({ playedAudio: true, playingAudio: true });
        } catch {
          useTeaserStore.setState({ playingAudio: false });
        }
      }
    }
  };

  useEffect(() => {
    startMusic();
  }, [playingAudio]);

  useEffect(() => {
    return () => {
      bgMusic.current?.pause();
    };
  }, []);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      {show && (
        <MotionBox
          className="teaser"
          height={100 * vh}
          width={100 * vw}
          background="#5FC7FF"
          transform="translate3d(0px, 0px, 0px)"
          overflow="hidden"
          style={{ touchAction: "pan-x pan-y" }} // To disable pinch zoom on iOS
          onClick={() => {
            if (!useTeaserStore.getState().playedAudio) startMusic(true);
          }}
        >
          <Flex
            margin="auto"
            position="relative"
            width="100%"
            height="100%"
            maxWidth="1440px"
          >
            <PreloadAssets />
            {state === "score-board" && <ScoreBoard style={{ zIndex: 20 }} />}
            {state === "count-down" && <StartCount style={{ zIndex: 20 }} />}

            {/** Upper Part **/}
            {/* {(state === "in-game" || state === "score-board") && (
        <Show isDesktop>
          <CoinCounter
            style={{
              position: "absolute",
              top: `${vh * 3}px`,
              left: `${vh * 3}px`,
              zIndex: 10,
            }}
          />
        </Show>
      )} */}
            <BrandHeader
              balance={balance}
              style={{
                position: "absolute",
                zIndex: 10,
              }}
            />

            {/** Backgrounds **/}
            <SkyBackground style={{ zIndex: 0 }} />
            <CoinBackgroundBack style={{ zIndex: 3 }} />
            {(state === "initial" ||
              state === "count-down" ||
              state === "in-game" ||
              state === "score-board") && (
              <TeaserCharacter
                isInGame={state === "in-game"}
                character={character}
                style={{ zIndex: 4 }}
              />
            )}
            <CoinThrowing style={{ zIndex: 5 }} />
            <PlusOneFloating style={{ zIndex: 6 }} />
            <CoinBackgroundFront style={{ zIndex: 6 }} />
          </Flex>
        </MotionBox>
      )}
    </>
  );
};
