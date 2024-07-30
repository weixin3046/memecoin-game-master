"use client";
import { useOAutToken } from "@/stores/teaser";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("id_token");
  const updateToken = useOAutToken((state) => state.updateToken);
  token && updateToken(token);
  if (!token) {
    return <div>Missing token!</div>;
  }
  return <div>{token}</div>;
}
