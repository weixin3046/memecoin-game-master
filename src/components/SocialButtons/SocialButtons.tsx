import { Box, Button, Icon, Link } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";
import MotionBox from "@/components/MotionBox";

export const SocialButtons = ({ style, animation, size = "48px" }: any) => {
  return (
    <MotionBox display="flex flex-col" gap="24px" {...style} {...animation}>
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
    </MotionBox>
  );
};
