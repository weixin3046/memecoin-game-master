"use client";
import {
  Button,
  ButtonGroup,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CustomModal } from "../CustomModal";
import NextImage from "next/image";
import useApprove from "@/hooks/useApprove";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiTokenSwapFill } from "react-icons/ri";

export default function SwapApprove() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [apprveFee, setApproveFee] = useState("");
  const { approve, pending: approvePending } = useApprove();
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const fee = await fetch("/api/approvefee", {
        method: "post",
      });
      const data = await fee.json();
      setApproveFee(data.content.approveFee);
    })();
  }, []);

  const onSwap = () => {
    if (approve === "N") {
      onOpen();
    } else {
      handleSwap();
    }
  };
  const onExchange = async () => {
    setPending(true);
    try {
      const res = await fetch("/api/approvecross", {
        method: "POST",
      });
      const data = await res.json();
      if (data.code === "0") {
        router.push(`/result/${data.content}`);
      }
    } catch (error) {
      toast({
        title: `Transaction execution failed`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setPending(false);
    }
  };
  const handleSwap = async () => {
    const cross = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/cross", {
          method: "POST",
        });
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(cross, {
      success: (res: any) => {
        router.push(`/result/cross/${res.content}`);
        return {
          title: "🎉🎉🎉 success",
          description: "Cross chain transaction execution successful",
        };
      },
      error: (res: any) => {
        return { title: "failed", description: "Cross chain execution failed" };
      },
      loading: { title: "Promise pending", description: "Please wait" },
    });
  };

  return (
    <div>
      <button onClick={onSwap} disabled={approvePending}>
        {approvePending ? (
          <Spinner size="xs" className="ml-2" />
        ) : (
          <div className="flex gap-1 items-center">
            <div>Swap：</div>
            <RiTokenSwapFill className="text-white text-2xl" />
          </div>
        )}
      </button>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={<div className="text-center">授权代币交易权限给智能合约</div>}
        footer={
          <ButtonGroup spacing="6" className="w-full">
            <Button size={"md"} onClick={onClose} className="flex-1">
              取消
            </Button>
            <Button
              colorScheme="blue"
              size={"md"}
              className="flex-1"
              isLoading={pending}
              onClick={onExchange}
            >
              确定
            </Button>
          </ButtonGroup>
        }
      >
        <div className="flex items-center justify-center flex-col gap-3">
          <div>合约地址:0xaasdf...ss7f </div>
          <div className="flex">
            <div className="flex gap-2 items-center justify-start border rounded-full px-4">
              <NextImage src={"/bnb.svg"} alt="BNB" width={20} height={20} />
              <span>BNB</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>授权额度</div>
          <div className="border p-4 rounded-xl ">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex gap-1 items-center">
                <NextImage
                  src={"/raq-bsc.png"}
                  alt="BNB"
                  width={20}
                  height={20}
                />
                <div>TPEG</div>
              </div>
              {/* <div>无限额度</div> */}
            </div>
            <div className="pt-2 justify-between flex items-center">
              <div>矿工费</div>
              <div>{apprveFee}</div>
            </div>
          </div>
          {/* <div className="border p-4 rounded-xl ">
            <div className="flex items-center justify-between border-b p-2">
              <div>
                <div>blc</div>
              </div>
              <div>无限额度</div>
            </div>
            <div className="pt-2">
              <div>永久有效</div>
            </div>
          </div> */}
        </div>
      </CustomModal>
    </div>
  );
}
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
