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

export default function CrossModal({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const crossJwt = useApproveState((state) => state.crossJwt);
  const setCrossJwt = useApproveState((state) => state.setCrossJwt);
  const provider = useApproveState((state) => state.provider);
  const crossMetaHash = useApproveState((state) => state.crossMetaHash);
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const cross = useCallback(
    async (crossJwt?: string) => {
      const res = await fetch("/api/cross", {
        method: "POST",
        body: JSON.stringify({
          jwt: crossJwt,
          metaHash: crossMetaHash?.metaHash,
          metaHashB64: crossMetaHash?.metaHashB64,
          feeInfo: crossMetaHash?.feelInfo,
          nonceInfoDto: crossMetaHash?.nonceInfo,
          transactionId: crossMetaHash?.transactionId,
        }),
      });
      const data = await res.json();
      if (data.code !== "0")
        return toast({
          title: data.msg,
          status: "error",
        });
      router.push(`/result/cross/${data.content}`);
      setPending(false);
    },
    [
      crossMetaHash?.feelInfo,
      crossMetaHash?.metaHash,
      crossMetaHash?.metaHashB64,
      crossMetaHash?.nonceInfo,
      crossMetaHash?.transactionId,
      router,
      toast,
    ]
  );
  const onCross = async () => {
    setPending(true);
    if (provider && provider !== "credentials") {
      const response = await fetch(`/api/getCrossMetaHashByActivity`, {
        method: "POST",
        body: JSON.stringify({
          activityType: "mmGame",
        }),
      });
      const crossMetaHash = await response.json();
      if (crossMetaHash !== "0") return console.log(crossMetaHash.msg);
      getOAuthApprove(crossMetaHash.content.metaHashB64, "cross", provider);
    } else {
      await cross();
    }
  };

  useEffect(() => {
    if (crossJwt) {
      onOpen();
      if (crossMetaHash?.metaHash) {
        setPending(true);
        cross();
      }
    }
  }, [crossJwt, onOpen, crossMetaHash?.metaHash, cross]);
  return (
    <div>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={"跨链"}
        footer={
          <ButtonGroup spacing="6" className="w-full">
            <Button
              size={"md"}
              onClick={() => {
                onClose();
                setCrossJwt(null);
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
        <div className="space-y-2">
          <Card>
            <CardBody>
              <div className="space-y-2">
                <div className="flex items-center justify-between  px-1">
                  <div className="flex gap-2 items-center justify-start">
                    <Image src={"/logo.png"} alt="BNB" width={20} height={20} />
                    <span>raq</span>
                  </div>
                  <div>
                    <span>To</span>
                  </div>
                  <div className="flex gap-2 items-center justify-start">
                    <Image src={"/logo.png"} alt="BNB" width={20} height={20} />
                    <span>raq</span>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between px-1">
                  <div>数量</div>
                  <div>28 PEG</div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="space-y-2">
                <div className="flex items-center justify-between  px-1">
                  <div className="flex gap-2 items-center justify-start">
                    手续费
                  </div>
                  <div className="flex gap-2 items-center justify-start">
                    0.0840 PEG
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between px-1">
                  <div>Gas Fee</div>
                  <div>6 PEG</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </CustomModal>
    </div>
  );
}
