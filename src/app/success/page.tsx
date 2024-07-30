"use client";
import { useOAutToken } from "@/stores/teaser";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("id_token");
  const updateToken = useOAutToken((state) => state.updateToken);
  useEffect(() => {
    if (window && window.location) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const id = params.get("id_token");
      if (id) {
        updateToken(id);
        router.push("/");
      }
      // setParams({ id_token: id })
    }
  }, [router, updateToken]);
  if (!token) {
    return <div>Missing token!</div>;
  }
  return <div>{token}</div>;
}
