import { useWindowStore } from "@/stores/window";
import { Button8Bit2 } from "../Button8Bit2";
import { useTeaserStore } from "@/stores/teaser";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
export default function PointButton() {
  const isMobile = useWindowStore((state) => state.isMobile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { state } = useTeaserStore((state) => ({
    state: state.state,
  }));
  const ctaBtnStyle = {
    visibility: state === "initial" ? "visible" : "hidden",
    minW: "200px",
  };
  return (
    <>
      <Button8Bit2
        padding={4}
        width={isMobile ? "100%" : 272}
        style={ctaBtnStyle}
        onClick={onOpen}
      >
        PRESS START
      </Button8Bit2>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="!mx-9">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              積分不足
            </AlertDialogHeader>

            <AlertDialogBody>當前PEG積分不足，請先充值再兌換</AlertDialogBody>

            <AlertDialogFooter className="!justify-center">
              <Button
                colorScheme="blue"
                onClick={() => {
                  onClose();
                  window.open(
                    "https://h5.blossomchain.net/integralConvert",
                    "_blank"
                  );
                  // window.open('https://h5.qwerty2.com/integralConvert')
                }}
                ml={3}
              >
                確定
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
