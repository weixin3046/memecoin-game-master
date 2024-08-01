"use client";
import {
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiTokenSwapFill } from "react-icons/ri";
import Image from "next/image";
import { useGuideState } from "@/stores/approveState";

export default function Guide() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const openState = useGuideState((state) => state.open);
  const setOpen = useGuideState((state) => state.setOpen);
  // console.log(openState, "openState=====");
  useEffect(() => {
    if (useGuideState.getState().open) {
      // console.log(openState, "openState");
      onOpen();
    }
  }, [onOpen, openState]);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // size={"sm"}
        isCentered
        colorScheme="blue"
        closeOnOverlayClick={false}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader
              fontSize="lg"
              fontWeight="bold"
              className="text-center"
            >
              遊戲步骤{step}
            </ModalHeader>
            {step === 2 && <ModalCloseButton />}
            <ModalBody>
              <div className="text-center">
                {step === 1
                  ? `開始遊戲前,請先將PEG兌換成TPEG可通過點擊Swap後面的圖標,一鍵兌換TPEG`
                  : `點擊兌換後，需等待兌換結果兌換成功後點擊返回到遊戲頁面`}
              </div>

              <div className="flex items-center justify-center gap-4 flex-col py-8">
                {step === 1 ? (
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setStep(2);
                      setOpen();
                    }}
                  >
                    Swap: <RiTokenSwapFill className="text-white text-2xl" />
                  </Button>
                ) : (
                  <>
                    <Image
                      src={"/setp2.png"}
                      width={630}
                      height={40}
                      alt="setp"
                    />
                    <Image
                      src={"/setp1.png"}
                      width={630}
                      height={40}
                      alt="setp"
                    />
                    {/* <Image/> */}
                  </>
                )}
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
}
