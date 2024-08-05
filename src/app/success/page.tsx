"use client";
import { useApproveState } from "@/stores/approveState";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("id_token");
  const setApproveJwt = useApproveState((state) => state.setApproveJwt);
  const setCrossJwt = useApproveState((state) => state.setCrossJwt);
  const setJoinJwt = useApproveState((state) => state.setJoinJwt);
  useEffect(() => {
    if (window && window.location) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("id_token");
      const state = params.get("state");
      if (token) {
        switch (state) {
          case "cross":
            setCrossJwt(token);
            break;
          case "join":
            setJoinJwt(token);
            break;
          case "approve":
            setApproveJwt(token);
            break;
        }
        router.push("/");
      }
      // setParams({ id_token: id })
    }
  }, [router, setApproveJwt, setCrossJwt, setJoinJwt]);
  if (!token) {
    return null;
  }
  return <div>{token}</div>;
}
