import { useWindowStore } from "@/stores/window";
import { Button8Bit2 } from "../Button8Bit2";
import { useBalanceStore, useTeaserStore } from "@/stores/teaser";
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
import { useCallback, useEffect, useState } from "react";
import { CustomModal } from "../CustomModal";
import { useRouter } from "next/navigation";
import PointButton from "./PointButton";
import { MetaHashResponseProps, useApproveState } from "@/stores/approveState";
import { getOAuthApprove } from "@/utils/getOAuthApprove";

async function getAppleLogin() {
  const url =
    "https://appleid.apple.com/auth/authorize?client_id=com.changyouintl.js&redirect_uri=https://api.qwerty2.com/changyou-api-service/appleAuth/redirect&response_type=code%20id_token&state=apple&scope=email%20name&response_mode=form_post&nonce=" +
    "1";
  window.location.href = url;
}

export const StartButton = () => {
  const isMobile = useWindowStore((state) => state.isMobile);

  const setJoinGameMetaHash = useApproveState(
    (state) => state.setJoinGameMetaHash
  );
  const joinGameMetaHash = useApproveState((state) => state.joinGameMetaHash);
  const token = useApproveState((state) => state.joinJwt);
  const router = useRouter();
  const balance = useBalanceStore((state) => state.balance);
  const [ticketNumber, setTicketNumber] = useState(10);
  const provider = useApproveState((state) => state.provider);
  const updateToken = useApproveState((state) => state.setJoinJwt);
  const { state } = useTeaserStore((state) => ({
    state: state.state,
  }));

  const ctaBtnStyle = {
    visibility: state === "initial" ? "visible" : "hidden",
    minW: "200px",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const GetMetaHash = useCallback(async () => {
    const hash = await fetch("/api/getMetaHash");
    const hashRes = await hash.json();
    const data = hashRes.content as MetaHashResponseProps;

    setJoinGameMetaHash(data);
    return data;
  }, [setJoinGameMetaHash]);

  const JoinGame = useCallback(
    async (idToken?: string) => {
      if (!joinGameMetaHash) return;
      await fetch("/api/joinGame", {
        method: "POST",
        body: JSON.stringify({
          feelInfo: joinGameMetaHash.feelInfo,
          metaHash: joinGameMetaHash.metaHash,
          nonceInfo: joinGameMetaHash.nonceInfo,
          sourceActivity: "mmGame",
          idToken: idToken,
          metaHashB64: joinGameMetaHash.metaHashB64, //
        }),
      });

      // setJoinGameMetaHash(null);
      updateToken(null); //加入游戏之后清除之前jwt
    },
    [joinGameMetaHash, updateToken]
  );

  // // 三方登录授权验证
  useEffect(() => {
    console.log(token);
    if (token) {
      playButtonSound();
      useTeaserStore.getState().onStartButtonClick();
      JoinGame(token);
    }
  }, [JoinGame, token]);

  const playButtonSound = () => {
    if (!useTeaserStore.getState().playingAudio) return;
    const audio = new Audio(ClickStartButtonSound);
    audio.volume = 0.2;
    audio.play();
  };
  // 开始游戏
  const onStartButtonClick = async () => {
    if (provider && provider === "credentials") {
      playButtonSound();
      useTeaserStore.getState().onStartButtonClick();
      try {
        await GetMetaHash();
        await JoinGame();
      } catch (error) {}
    } else {
      try {
        updateToken("");
        const metaHash = await GetMetaHash();
        if (!provider) return console.log(provider, "provider 不存在");
        getOAuthApprove(metaHash.metaHashB64, "join", provider);
      } catch (error) {}
    }
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
              router.push("/auth/login");
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
        </VStack>
      </CustomModal>
    </>
  );
};
