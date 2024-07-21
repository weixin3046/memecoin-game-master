"use client";
import useToken from "@/hooks/useToken";
import { Spinner } from "@chakra-ui/react";

export default function Balance() {
  const { balance, pending } = useToken();
  return <div>TPEG:{pending ? <Spinner size="xs" /> : balance}</div>;
}
