"use client";
import {
  AlertDialog,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiTokenSwapFill } from "react-icons/ri";
import Image from "next/image";

export default function Guide() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [step, setStep] = useState(1);
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={"sm"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              遊戲步骤{step}
            </AlertDialogHeader>
            {step === 2 && <AlertDialogCloseButton />}
            <AlertDialogBody>
              <div className="text-center">
                {step === 1
                  ? `開始遊戲前,請先將PEG兌換成TPEG可通過點擊Swap後面的圖標,一鍵兌換TPEG`
                  : `點擊兌換後，需等待兌換結果兌換成功後點擊返回到遊戲頁面`}
              </div>

              <div className="flex items-center justify-center gap-4 flex-col py-8">
                {step === 1 ? (
                  <Button colorScheme="blue" onClick={() => setStep(2)}>
                    Swap: <RiTokenSwapFill className="text-white text-2xl" />
                  </Button>
                ) : (
                  <>
                    <Image
                      src={"/setp1.png"}
                      width={630}
                      height={40}
                      alt="setp"
                    />
                    <Image
                      src={"/setp2.png"}
                      width={630}
                      height={40}
                      alt="setp"
                    />
                    {/* <Image/> */}
                  </>
                )}
              </div>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
