"use client";
import { CustomModal } from "@/components/CustomModal";
import { Button, ButtonGroup, useDisclosure, VStack } from "@chakra-ui/react";
import NextImage from "next/image";
import { Button8Bit2 } from "../Button8Bit2";
import { useTeaserStore } from "@/stores/teaser";
import { useWindowStore } from "@/stores/window";

export default function ApproveModal() {
  const isMobile = useWindowStore((state) => state.isMobile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useTeaserStore((state) => ({
    state: state.state,
  }));
  const ctaBtnStyle = {
    visibility: state === "initial" ? "visible" : "hidden",
    minW: "200px",
  };
  return (
    <div>
      <Button8Bit2
        padding={4}
        width={isMobile ? "100%" : 272}
        style={ctaBtnStyle}
        onClick={onOpen}
      >
        PRESS START
      </Button8Bit2>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={<div className="text-center">授权代币交易权限给智能合约</div>}
        footer={
          <ButtonGroup spacing="6" className="w-full">
            <Button size={"md"} onClick={onClose} className="flex-1">
              取消
            </Button>
            <Button colorScheme="blue" size={"md"} className="flex-1">
              确定
            </Button>
          </ButtonGroup>
        }
      >
        <div className="flex items-center justify-center flex-col gap-3">
          <div>合约地址:0xaasdf...ss7f </div>
          <div className="flex">
            <div className="flex gap-2 items-center justify-start border rounded-full px-4">
              <NextImage src="/logo.svg" alt="" width={20} height={20} />
              <span>ERC</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>授权额度</div>
          <div className="border p-4 rounded-xl ">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center justify-center gap-1">
                <NextImage
                  src={"/logo.png"}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <div>TPEG</div>
              </div>
              <div>无限额度</div>
            </div>
            <div className="pt-2">
              <div>永久有效</div>
            </div>
          </div>
          <div className="border p-4 rounded-xl ">
            <div className="flex items-center justify-between border-b p-2">
              <div>
                <div>钱包地址</div>
              </div>
              <div>0xaasdf...ss7f</div>
            </div>
            <div className="p-2 flex justify-between items-center">
              <div>矿工费</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
