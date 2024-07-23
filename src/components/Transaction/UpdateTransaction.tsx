import { Transaction, useTransactionStore } from "@/stores/teaser";
import { ListIcon, ListItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

export default function UpdateTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  //   const targetModal = useTransactionStore((state) => state.targetModal);
  const openTargetModalStatus = useTransactionStore(
    (state) => state.openTargetModalStatus
  );
  const updateTransactionStatus = useTransactionStore(
    (state) => state.updateTransactionStatus
  );
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `/api/txStatus?metaHash=${transaction.hash}`
        );

        const data = await result.json();
        if (data.code === "0") {
          updateTransactionStatus(
            data.content.transactionHash,
            data.content.status
          );

          if (data.content.status === "1") {
            openTargetModalStatus();
            removeTransaction(data.content.transactionHash);
            return true;
          }
          return false;
        }

        return false;
      } catch (error) {
        return false;
      }
    };
    const startFetching = async () => {
      while (true) {
        const isReady = await fetchData();
        console.log(isReady);
        if (isReady) {
          break;
        }
        // 等待一段时间后再重新请求，假设是 5 秒
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };
    startFetching();
  }, [transaction.hash, openTargetModalStatus, updateTransactionStatus]);

  return (
    <>
      {false && (
        <ListItem>
          {transaction.status === "2" && (
            <ListIcon
              as={FaSpinner}
              className="animate-spin"
              color={"green.500"}
            />
          )}
          {transaction.status === "1" && (
            <ListIcon as={MdCheckCircle} color="green.500" />
          )}
          {transaction.status === "0" && (
            <ListIcon as={IoMdCloseCircle} color={"red.500"} />
          )}

          {transaction.hash}
        </ListItem>
      )}
    </>
  );
}
