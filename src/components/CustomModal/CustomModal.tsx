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
  closable,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  closable?: boolean;
}) => {
  // 使用 useBreakpointValue 钩子来设置模态框的位置
  const modalPlacement = useBreakpointValue({ base: "bottom", md: "center" });

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered={modalPlacement === "center"}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          position={modalPlacement === "bottom" ? "fixed" : "relative"}
          bottom={modalPlacement === "bottom" ? 0 : "auto"}
          marginBottom={modalPlacement === "bottom" ? 0 : "auto"}
          borderBottomRadius={modalPlacement === "bottom" ? "none" : "md"}
        >
          <ModalHeader>{header}</ModalHeader>
          {closable && <ModalCloseButton />}
          <ModalBody padding={5}>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
