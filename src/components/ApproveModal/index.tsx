import { CustomModal } from "@/components/CustomModal";
import { useApproveState } from "@/stores/approveState";
import { getOAuthApprove } from "@/utils/getOAuthApprove";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ApproveModal({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const approveJwt = useApproveState((state) => state.approveJwt);
  const setApproveJwt = useApproveState((state) => state.setApproveJwt);
  const provider = useApproveState((state) => state.provider);
  const approveMetaHash = useApproveState((state) => state.approveMetaHash);
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const approve = useCallback(
    async (crossJwt?: string) => {
      const res = await fetch("/api/approvecross", {
        method: "POST",
        body: JSON.stringify({
          jwt: approveJwt,
          metaHash: approveMetaHash?.metaHash,
          metaHashB64: approveMetaHash?.metaHashB64,
          feeInfo: approveMetaHash?.feelInfo,
          nonceInfo: approveMetaHash?.nonceInfoDto,
        }),
      });
      const data = await res.json();
      if (data.code !== "0")
        return toast({
          title: data.msg,
          status: "error",
        });
      router.push(`/result/${data.content}`);
      setPending(false);
    },
    [
      approveJwt,
      approveMetaHash?.feelInfo,
      approveMetaHash?.metaHash,
      approveMetaHash?.metaHashB64,
      approveMetaHash?.nonceInfoDto,
      router,
      toast,
    ]
  );
  const onCross = async () => {
    setPending(true);
    if (provider && provider !== "credentials") {
      const response = await fetch(`/api/getApproveEmpowerMetaHashByActivity`, {
        method: "POST",
        body: JSON.stringify({
          activityType: "mmGame",
        }),
      });
      const approveMetaHash = await response.json();
      if (approveMetaHash !== "0") return console.log(approveMetaHash.msg);
      getOAuthApprove(approveMetaHash.content.metaHashB64, "approve", provider);
    } else {
      await approve();
    }
  };

  useEffect(() => {
    if (approveJwt) {
      onOpen();
      if (approveMetaHash?.metaHash) {
        setPending(true);
        approve();
      }
    }
  }, [onOpen, approveJwt, approveMetaHash?.metaHash, approve]);
  return (
    <div>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={<div className="text-center">授权代币交易权限给智能合约</div>}
        footer={
          <ButtonGroup spacing="6" className="w-full">
            <Button
              size={"md"}
              onClick={() => {
                onClose();
                setApproveJwt(null);
              }}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              colorScheme="blue"
              size={"md"}
              className="flex-1"
              onClick={onCross}
              isLoading={pending}
            >
              确定
            </Button>
          </ButtonGroup>
        }
      >
        <div className="flex items-center justify-center flex-col gap-3 pb-3">
          <div>合约地址:0xaasdf...ss7f </div>
          <div className="flex">
            <div className="flex gap-2 items-center justify-start border rounded-full px-4">
              <Image src="/logo.png" alt="" width={20} height={20} />
              <span>raq</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Card>
            <CardBody>
              <div className="space-y-2">
                <div className="flex items-center justify-between  px-1">
                  <div className="flex gap-2 items-center justify-start">
                    <Image src={"/logo.png"} alt="BNB" width={20} height={20} />
                    <span>PEG</span>
                  </div>

                  <div className="flex gap-2 items-center justify-start">
                    无限额度
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between px-1">
                  <div>永久有效</div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="space-y-2">
                <div className="flex items-center justify-between  px-1">
                  <div className="flex gap-2 items-center justify-start">
                    钱包地址
                  </div>
                  <div className="flex gap-2 items-center justify-start">
                    0xaasdf...ss7f
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between px-1">
                  <div>Gas Fee</div>
                  <div>0 PEG</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </CustomModal>
    </div>
  );
}
