"use client";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillBell } from "react-icons/ai";
export default function RecordsButton({}: {}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  return (
    <>
      {show && (
        <div className="flex items-center justify-center">
          <span className="relative inline-flex">
            <button onClick={onOpen}>
              <AiFillBell className="text-white text-2xl" />
            </button>
            <span className="absolute flex h-2 w-2  top-0 right-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </span>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalContent className="!bg-opacity-50 !bg-black" color={"#fff"}>
          <ModalHeader className="text-center">参与记录</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={0}>
            <TableContainer paddingBottom={20}>
              <Table variant="simple" size={"sm"}>
                <Thead>
                  <Tr>
                    <Th color={"#fff"} border={0} textAlign={"center"}>
                      参与时间
                    </Th>
                    <Th color={"#fff"} border={0}>
                      MetaHash
                    </Th>
                    <Th color={"#fff"} textAlign={"right"} border={0}>
                      状态
                    </Th>
                  </Tr>
                </Thead>
                <Tbody border={0}>
                  <Tr>
                    <Td border={0}>2024-07-23 11:12:12</Td>
                    <Td border={0}>9X58772953552...</Td>
                    <Td border={0}>success</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
