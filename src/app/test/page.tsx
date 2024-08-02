"use client";
import ApproveModal from "@/components/ApproveModal";
import CrossModal from "@/components/CrossModal";
import useApprove from "@/hooks/useApprove";
import { useDisclosure, Button } from "@chakra-ui/react";

export default function TestPage() {
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
  const { approve, pending: approvePending } = useApprove();

  //   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {approvePending ? 1 : 2}
      {approve === "Y" && <Button onClick={onApproveOpen}>Approve</Button>}

      <Button onClick={onCrossOpen}>swap</Button>
      {approve === "Y" && (
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
