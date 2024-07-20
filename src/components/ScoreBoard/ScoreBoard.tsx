import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  chakra,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { useTeaserStore } from "@/stores/teaser";
import { useWindowStore } from "@/stores/window";

import MotionBox from "@/components/MotionBox";

import { Dialog8Bit } from "../Dialog8Bit";
import { HomeButton } from "../HomeButton";

export const ScoreBoard = ({ style, animation }: any) => {
  const coinCount = useTeaserStore((state) => state.coinCount);
  const vh = useWindowStore((state) => state.vh);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState(1);
  const cancelRef = React.useRef(null);
  const onCancel = () => {
    setState(2);
    // onClose();
    // useTeaserStore.getState().onHomeButtonClick();
  };
  const onSumbit = async () => {
    // const res = await fetch("/api/receiveAlipayCoupon", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     sourceActivity: "mmGame",
    //   }),
    // });
    const res = await fetch("/api/receiveAlipayCoupon?sourceActivity=mmGame");
    const data = await res.json();
    if (data.code === "0") {
      setState(3);
    }
  };
  const handleHomeClick = async () => {
    const res = await fetch("/api/queryAlipayCouponList?sourceActivity=mmGame");
    const data = await res.json();
    if (data.code === "0") {
      if (data.content.length < 1) {
        onOpen();
      } else {
        setState(2);
        // useTeaserStore.getState().onHomeButtonClick();
      }
    }
  };

  return (
    <>
      <MotionBox
        position="absolute"
        display="flex"
        left="50%"
        bottom={`${vh * 45}px`}
        alignItems="center"
        justifyContent="center"
        transform="translateX(-50%)"
        {...style}
        {...animation}
      >
        <Flex flexDirection="column" alignItems="center" gap={`${vh * 3}px`}>
          <Dialog8Bit>
            <span style={{ whiteSpace: "nowrap", lineHeight: `${vh * 1}px` }}>
              {coinCount > 0 ? (
                <>
                  LFG!{" "}
                  <chakra.span color="#AB8010">{`${coinCount}`}</chakra.span>{" "}
                  $MEME! <br /> Can those fingers do more?
                </>
              ) : (
                <>
                  Surely you can do better. <br /> Game on!
                </>
              )}
            </span>
            <span style={{ whiteSpace: "nowrap" }}></span>
          </Dialog8Bit>
          <HomeButton onClick={handleHomeClick} />
        </Flex>
      </MotionBox>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            {state === 1 && "领取红包"}
            {state === 2 && "遊戲獎勵"}
            {state === 3 && "領取成功"}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {state === 1 && "您有支付寶紅包未領取，是否領取支付寶紅包"}
            {state === 2 &&
              "已成功為您發放***MEMEToken，預計1小時內到帳，可請前往“我的-資產-ETH鏈”下查看餘額"}
            {state === 3 &&
              "支付寶紅包領取成功，請前往該手機號對應的支付寶帳號查看並使用。"}
          </AlertDialogBody>
          <AlertDialogFooter>
            {state === 1 ? (
              <>
                <Button ref={cancelRef} onClick={onSumbit}>
                  立即领取
                </Button>
                <Button colorScheme="red" ml={3} onClick={onCancel}>
                  取消
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  onClose();
                  useTeaserStore.getState().onHomeButtonClick();
                }}
              >
                确定
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
