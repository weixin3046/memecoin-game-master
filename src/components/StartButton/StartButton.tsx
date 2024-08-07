import { useWindowStore } from "@/stores/window";
import { Button8Bit2 } from "../Button8Bit2";
import {
  useBalanceStore,
  useTeaserStore,
  useTransactionStore,
} from "@/stores/teaser";
import ClickStartButtonSound from "@/components/assets/audios/click-start-button.mp3";
import { FaApple, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Icon,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomModal } from "../CustomModal";
import { useRouter } from "next/navigation";
import PointButton from "./PointButton";
import useToken from "@/hooks/useToken";

const googleInfo = {
  client_id:
    "191629411062-fepnoc22qk6e8hq5bv9n0mbjjb58sj0h.apps.googleusercontent.com",
  redirect_uri: "https://h5-auth.blossomchain.net/authorization/success",
  scope: "email",
  state: "eyJvcGVyYXRlIjoibG9na",
  response_type: "id_token",
  // access_type: "offline",
  nonce: "1",
  flowName: "GeneralOAuthFlow",
};

async function getGoogleLogin() {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?";
  const query = Object.keys(googleInfo)
    .map((key) => `${key}=${(googleInfo as Record<string, string>)[key]}`)
    .join("&");
  const link = url + query;
  window.location.href = link;
}
async function getAppleLogin() {
  const url =
    "https://appleid.apple.com/auth/authorize?client_id=com.changyouintl.js&redirect_uri=https://api.qwerty2.com/changyou-api-service/appleAuth/redirect&response_type=code%20id_token&state=apple&scope=email%20name&response_mode=form_post&nonce=" +
    "1";
  window.location.href = url;
}

export const StartButton = () => {
  const isMobile = useWindowStore((state) => state.isMobile);
  const setMetaHash = useTransactionStore((state) => state.setMetaHash);
  const router = useRouter();
  const balance = useBalanceStore((state) => state.balance);

  const [ticketNumber, setTicketNumber] = useState(10);
  const { state } = useTeaserStore((state) => ({
    state: state.state,
  }));
  const ctaBtnStyle = {
    visibility: state === "initial" ? "visible" : "hidden",
    minW: "200px",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const playButtonSound = () => {
    if (!useTeaserStore.getState().playingAudio) return;
    const audio = new Audio(ClickStartButtonSound);
    audio.volume = 0.2;
    audio.play();
  };
  const onStartButtonClick = async () => {
    playButtonSound();
    useTeaserStore.getState().onStartButtonClick();
    try {
      const hash = await fetch("/api/getMetaHash");

      const hashRes = await hash.json();
      setMetaHash(hashRes.content.metaHash);
      const joinGame = await fetch("/api/joinGame", {
        method: "POST",
        body: JSON.stringify({
          feelInfo: hashRes.content.feelInfo,
          metaHash: hashRes.content.metaHash,
          nonceInfo: hashRes.content.nonceInfo,
          sourceActivity: "mmGame",
        }),
      });
    } catch (error) {}
    return;
  };
  const fetchTickerNum = async () => {
    const res = await fetch("/api/tickerNumber");
    const data = await res.json();
    setTicketNumber(Number(data.content));
  };
  useEffect(() => {
    fetchTickerNum();
  }, []);
  const googleLogin = async () => {
    const data = await getGoogleLogin();
  };

  const appleLogin = async () => {
    const data = await getAppleLogin();
  };
  return (
    <>
      {Number(balance) < ticketNumber && <PointButton />}
      {Number(balance) >= ticketNumber && (
        <Button8Bit2
          padding={4}
          width={isMobile ? "100%" : 272}
          style={ctaBtnStyle}
          onClick={onStartButtonClick}
        >
          PRESS START
        </Button8Bit2>
      )}

      <CustomModal isOpen={isOpen} onClose={onClose}>
        <VStack spacing={4} align="stretch">
          <Button
            colorScheme="yellow"
            leftIcon={<Icon as={FaUser} />}
            onClick={() => {
              onClose();
              router.push("/login");
            }}
          >
            通过手机号码登录
          </Button>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              或者
            </AbsoluteCenter>
          </Box>
          <Button leftIcon={<Icon as={FcGoogle} />} onClick={googleLogin}>
            通过 Google 继续
          </Button>
          <Button leftIcon={<Icon as={FaApple} />} onClick={appleLogin}>
            通过 Apple 继续
          </Button>
        </VStack>
      </CustomModal>
    </>
  );
};
