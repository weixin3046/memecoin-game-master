"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const CustomModal = ({
  header,
  footer,
  children,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // 使用 useBreakpointValue 钩子来设置模态框的位置
  const modalPlacement = useBreakpointValue({ base: "bottom", md: "center" });

  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered={modalPlacement === "center"}
      >
        <ModalOverlay />
        <ModalContent
          position={modalPlacement === "bottom" ? "fixed" : "relative"}
          bottom={modalPlacement === "bottom" ? 0 : "auto"}
          marginBottom={modalPlacement === "bottom" ? 0 : "auto"}
          borderBottomRadius={modalPlacement === "bottom" ? "none" : "md"}
        >
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={5}>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
