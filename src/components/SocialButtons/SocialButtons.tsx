import React from "react";
import { Box, Icon, Link } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

import { useTeaserStore } from "@/stores/teaser";

import SpeakerOffIcon from "@/components/assets/icons/common/speaker-off.svg";
import SpeakerOnIcon from "@/components/assets/icons/common/speaker-on.svg";
import TwitterIcon8Bit from "@/components/assets/icons/social/twitter-x.svg";

import MotionBox from "@/components/MotionBox";

export const SocialButtons = ({ style, animation, size = "48px" }: any) => {
  const playingAudio = useTeaserStore((state) => state.playingAudio);
  const state = useTeaserStore((state) => state.state);
  return (
    <MotionBox display="flex" gap="24px" {...style} {...animation}>
      {/* {(state === "initial" || state === "count-down") && (
        <>
          <Link href="https://twitter.com/memecoin" isExternal={true}>
            <Box height={size} width={size} padding="8px">
              <TwitterIcon8Bit height="100%" width="100%" />
            </Box>
          </Link>
        </>
      )} */}

      {/* <Link
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          useTeaserStore.setState(state => ({
            playingAudio: !state.playingAudio,
          }));
        }}
      >
        <Box height={size} width={size} padding="8px">
          {playingAudio ? <SpeakerOffIcon height="100%" width="100%" /> : <SpeakerOnIcon height="100%" width="100%" />}
        </Box>
      </Link> */}
      <Link href="/rule" className="hover:!no-underline no-underline">
        <div className="flex justify-center flex-col items-center text-white">
          <Box height={size} width={size} padding="8px">
            <Icon as={FaFileAlt} height="100%" width="100%" />
          </Box>
          <div>游戏规则</div>
        </div>
      </Link>
    </MotionBox>
  );
};
