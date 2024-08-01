import { useWindowStore } from "@/stores/window";
import { Button8Bit2 } from "../Button8Bit2";
import { useBalanceStore, useTeaserStore } from "@/stores/teaser";
import ClickStartButtonSound from "@/components/assets/audios/click-start-button.mp3";
import { FaUser } from "react-icons/fa";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Icon,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { CustomModal } from "../CustomModal";
import { useRouter } from "next/navigation";
import PointButton from "./PointButton";
import { MetaHashResponseProps, useApproveState } from "@/stores/approveState";
import { getOAuthApprove } from "@/utils/getOAuthApprove";

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
  const toast = useToast();
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
    async (joinGameMetaHash: MetaHashResponseProps, idToken?: string) => {
      // if (!joinGameMetaHash) return;
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
    [updateToken]
  );

  // // 三方登录授权验证
  useEffect(() => {
    console.log(token);
    if (token) {
      playButtonSound();
      useTeaserStore.getState().onStartButtonClick();
      if (!joinGameMetaHash) return console.log("没有joinGameMetaHash");
      JoinGame(joinGameMetaHash, token);
    }
  }, [JoinGame, joinGameMetaHash, token]);

  const playButtonSound = () => {
    if (!useTeaserStore.getState().playingAudio) return;
    const audio = new Audio(ClickStartButtonSound);
    audio.volume = 0.2;
    audio.play();
  };
  // 开始游戏
  const onStartButtonClick = async () => {
    const response = await fetch("api/getJoinGameNum");
    const joinGameNum = await response.json();
    if (joinGameNum !== "0") {
      toast({
        title: "活動已達上限！",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (provider && provider === "credentials") {
      playButtonSound();
      useTeaserStore.getState().onStartButtonClick();
      try {
        const metaHash = await GetMetaHash();
        await JoinGame(metaHash);
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
