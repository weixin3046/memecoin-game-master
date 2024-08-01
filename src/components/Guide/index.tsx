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
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

export default function Guide() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const openState = useGuideState((state) => state.open);
  const setOpen = useGuideState((state) => state.setOpen);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (useGuideState.getState().open) {
      // console.log(openState, "openState");
      onOpen();
    }
  }, [onOpen, openState]);
  if (!isClient) {
    return <></>;
  }

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
            <ModalBody className="!px-4">
              <div className="text-center">
                {step === 1 && (
                  <div className=" px-8">
                    <div>
                      <div>
                        開始遊戲前,請先將PEG兌換成TPEG可通過點擊Swap後面的圖標,一鍵兌換TPEG
                      </div>
                      <div className=" flex items-center justify-center gap-4 flex-col py-8">
                        <div className="relative">
                          <Button
                            colorScheme="blue"
                            className="w-48"
                            onClick={() => {
                              setOpen();
                              setStep(2);
                            }}
                          >
                            Swap:
                            <RiTokenSwapFill className="text-white text-2xl" />
                          </Button>
                          <div className="absolute top-[27px] right-8 w-12 h-12">
                            <Image src={"hand.png"} alt="hand" fill />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-gray-200 rounded-full absolute w-8 h-8 flex items-center justify-center right-3  top-1/2 -translate-y-1/2"
                      onClick={() => {
                        setOpen();
                        setStep(2);
                      }}
                    >
                      <ChevronRightIcon color={"gray.500"} boxSize={6} />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="px-8">
                    <div>
                      <div>
                        點擊兌換後，需等待兌換結果兌換成功後點擊返回到遊戲頁面
                      </div>
                      <div className=" flex items-center justify-center gap-4 flex-col py-8">
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
                      </div>
                    </div>
                    <div
                      className="bg-gray-200 rounded-full absolute w-8 h-8 flex items-center justify-center left-3  top-1/2 -translate-y-1/2"
                      onClick={() => setStep(1)}
                    >
                      <ChevronLeftIcon color={"gray.500"} boxSize={6} />
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
}
