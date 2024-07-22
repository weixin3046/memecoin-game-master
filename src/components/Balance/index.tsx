"use client";
import useToken from "@/hooks/useToken";
import { useBalanceStore } from "@/stores/teaser";
import { RepeatIcon } from "@chakra-ui/icons";
import { Button, IconButton, Spinner } from "@chakra-ui/react";

export default function Balance() {
  const { refetch } = useToken();
  const balances = useBalanceStore((state) => state.balance);
  const pending = useBalanceStore((state) => state.pending);
  return (
    <div className="flex items-center justify-start gap-2">
      <div>
        TPEG:{pending ? <Spinner size="xs" className="ml-2" /> : balances}
      </div>
      <button onClick={refetch} aria-label={"刷新"}>
        <RepeatIcon />
      </button>
    </div>
  );
}
