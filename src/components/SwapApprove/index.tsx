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
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiTokenSwapFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { getOAuthApprove } from "@/utils/getOAuthApprove";
import { useApproveState } from "@/stores/approveState";

export default function SwapApprove() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [apprveFee, setApproveFee] = useState("");
  const { approve, pending: approvePending } = useApprove();
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const crossJwt = useApproveState((state) => state.crossJwt);
  const crossMetaHash = useApproveState((state) => state.crossMetaHash);
  const setApproveMetaHash = useApproveState(
    (state) => state.setApproveMetaHash
  );

  const approveJwt = useApproveState((state) => state.approveJwt);
  const setApproveJwt = useApproveState((state) => state.setApproveJwt);
  const approveMetaHash = useApproveState((state) => state.approveMetaHash);
  // const setApproveMetaHash = useApproveState((state)=>state.setApproveMetaHash)
  const { data: session, status } = useSession();
  const provider = useApproveState((state) => state.provider);
  const router = useRouter();

  const cross = useCallback(
    (crossJwt?: string) => {
      const response = new Promise(async (resolve, reject) => {
        try {
          const res = await fetch("/api/cross", {
            method: "POST",
            body: JSON.stringify({
              jwt: crossJwt,
              metaHash: crossMetaHash?.metaHash,
              metaHashB64: crossMetaHash?.metaHashB64,
              feeInfo: crossMetaHash?.feelInfo,
              nonceInfo: crossMetaHash?.nonceInfo,
            }),
          });
          const data = await res.json();
          if (data.code === "0") {
            resolve(data);
          } else {
            reject("error");
          }
        } catch (error) {
          reject(error);
        }
      });
      toast.promise(response, {
        success: (res: any) => {
          router.push(`/result/cross/${res.content}`);
          return {
            title: "🎉🎉🎉 success",
            description: "Cross chain transaction execution successful",
          };
        },
        error: (res: any) => {
          return {
            title: "failed",
            description: "Cross chain execution failed",
          };
        },
        loading: { title: "Promise pending", description: "Please wait" },
      });
    },
    [
      crossMetaHash?.feelInfo,
      crossMetaHash?.metaHash,
      crossMetaHash?.metaHashB64,
      crossMetaHash?.nonceInfo,
      router,
      toast,
    ]
  );

  useEffect(() => {
    (async () => {
      const fee = await fetch("/api/approvefee", {
        method: "post",
      });
      const data = await fee.json();
      setApproveFee(data.content.approveFee);
    })();
  }, []);

  useEffect(() => {
    if ((provider === "google" || provider === "apple") && crossJwt) {
      cross(crossJwt);
    }
  }, [cross, crossJwt, provider]);

  const onSwap = () => {
    if (approve === "N") {
      onOpen();
    } else {
      handleSwap();
    }
  };
  const approvecross = useCallback(async () => {
    const res = await fetch("/api/approvecross", {
      method: "POST",
      body: JSON.stringify({
        jwt: approveJwt,
        metaHash: approveMetaHash?.metaHash,
        metaHashB64: approveMetaHash?.metaHashB64,
        feeInfo: approveMetaHash?.feelInfo,
        nonceInfo: approveMetaHash?.nonceInfo,
      }),
    });
    const data = await res.json();
    if (data.code === "0") {
      router.push(`/result/${data.content}`);
      setApproveJwt(null);
    }
  }, [
    approveJwt,
    approveMetaHash?.feelInfo,
    approveMetaHash?.metaHash,
    approveMetaHash?.metaHashB64,
    approveMetaHash?.nonceInfo,
    router,
    setApproveJwt,
  ]);
  useEffect(() => {
    if (approveJwt) {
      onOpen();
      setPending(true);
      approvecross().then((res) => {
        setPending(false);
      });
    }
  }, [approveJwt, approvecross, onOpen]);

  const onExchange = async () => {
    setPending(true);

    try {
      if (provider && provider !== "credentials") {
        // 获取收取metahash
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/changyou-wap-service/crossChainActivity/getApproveEmpowerMetaHashByActivity`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `${session?.accessToken}`,
            },
            body: JSON.stringify({
              activityType: "mmGame",
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch account balance");
        }
        const data = await response.json();
        if (data.code === "0") {
          setApproveMetaHash(data.content);
          getOAuthApprove(data.content.metaHashB64, "approve", provider); // 三方登录授权
        }
      } else {
        await approvecross();
      }
    } catch (error) {
    } finally {
      setPending(false);
    }
  };
  const handleSwap = async () => {
    // console.log(provider, token);
    // 第三方登录
    if (provider !== "credentials") {
      // 获取跨链meta
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/changyou-wap-service/crossChainActivity/getCrossMetaHashByActivity`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `${session?.accessToken}`,
          },
          body: JSON.stringify({
            activityType: "mmGame",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch account balance");
      }
      const data = await response.json();
      setApproveMetaHash(data.content);
      if (provider) {
        getOAuthApprove(data.content.metaHashB64, "cross", provider); // 三方登录授权
      }
    } else {
      cross();
    }
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
          <div>合约地址:0xaasdf...ss7f</div>
          <div className="flex">
            <div className="flex gap-2 items-center justify-start border rounded-full px-4">
              <NextImage src={"/logo.png"} alt="BNB" width={20} height={20} />
              <span>BNB</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>授权额度</div>
          <div className="border p-4 rounded-xl ">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex gap-1 items-center">
                <NextImage src={"/logo.png"} alt="BNB" width={20} height={20} />
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
