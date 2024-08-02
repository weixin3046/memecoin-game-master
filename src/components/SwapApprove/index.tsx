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
import ApproveModal from "../ApproveModal";
import CrossModal from "../CrossModal";

export default function SwapApprove() {
  const { approve, pending: approvePending } = useApprove();
  const {
    isOpen: approveOpen,
    onClose: onApproveClose,
    onOpen: onApproveOpen,
  } = useDisclosure();
  const {
    isOpen: crossOpen,
    onClose: onCrossClose,
    onOpen: onCrossOpen,
  } = useDisclosure();

  return (
    <div>
      {/* <button onClick={onSwap} disabled={approvePending}>
        {approvePending ? (
          <Spinner size="xs" className="ml-2" />
        ) : (
          <div className="flex gap-1 items-center">
            <div>Swap：</div>
            <RiTokenSwapFill className="text-white text-2xl" />
          </div>
        )}
      </button> */}
      {approve === "N" && (
        <Button
          onClick={onApproveOpen}
          isLoading={approvePending}
          variant="unstyled"
        >
          <div className="flex gap-1 items-center">
            <div>Approve：</div>
            <RiTokenSwapFill className="text-white text-2xl" />
          </div>
        </Button>
      )}
      <Button
        onClick={onCrossOpen}
        isDisabled={approve === "N"}
        isLoading={approvePending}
        variant="unstyled"
      >
        <div className="flex gap-1 items-center">
          <div>Swap：</div>
          <RiTokenSwapFill className="text-white text-2xl" />
        </div>
      </Button>

      {approve === "N" && (
        <ApproveModal
          isOpen={approveOpen}
          onClose={onApproveClose}
          onOpen={onApproveOpen}
        />
      )}
      {approve === "Y" && (
        <CrossModal
          isOpen={crossOpen}
          onClose={onCrossClose}
          onOpen={onCrossOpen}
        />
      )}
    </div>
  );
}
