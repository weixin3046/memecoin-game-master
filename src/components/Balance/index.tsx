"use client";
import useToken from "@/hooks/useToken";

export default function Balance() {
  const { balance } = useToken();
  return <div>TPEG:{balance}</div>;
}
