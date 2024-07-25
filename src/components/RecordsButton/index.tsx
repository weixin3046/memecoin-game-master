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
import { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";

interface ListProps {
  createTime: string;
  issueState: number; //0待发放 1发放中 2发放成功 3发放失败
  rewardQuantity: number;
}

export default function RecordsButton({}: {}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(true);
  const [list, setList] = useState<ListProps[]>([]);
  const fetchData = async () => {
    const res = await fetch("/api/getUserRecords");
    const data = await res.json();
    setList(data.content);
  };

  useEffect(() => {
    fetchData();
  }, [isOpen]);

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
          <ModalHeader className="text-center">參與記錄</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={0}>
            <TableContainer paddingBottom={20}>
              <Table variant="simple" size={"sm"}>
                <Thead>
                  <Tr>
                    <Th color={"#fff"} border={0} textAlign={"center"}>
                      參與時間
                    </Th>
                    <Th color={"#fff"} border={0} textAlign={"center"}>
                      獎勵數量
                    </Th>
                    <Th color={"#fff"} textAlign={"right"} border={0}>
                      狀態
                    </Th>
                  </Tr>
                </Thead>
                <Tbody border={0}>
                  {/* <Tr> */}
                  {list.map((item, index) => (
                    <Tr key={index}>
                      <Td border={0} textAlign={"center"}>
                        {item.createTime}
                      </Td>
                      <Td border={0} textAlign={"center"}>
                        {item.rewardQuantity}
                      </Td>
                      <Td border={0} textAlign={"right"}>
                        {item.issueState === 2 && "發放成功"}
                        {item.issueState === 3 && "發放失敗"}
                        {(item.issueState === 0 || item.issueState) && "待发放"}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
