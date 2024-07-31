"use client";
import { logout } from "@/actions/logout";
import { useApproveState } from "@/stores/approveState";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
  const reset = useApproveState((state) => state.reset);
  return (
    <button
      type="button"
      onClick={async () => {
        await logout();
        reset();
      }}
    >
      <FaSignOutAlt className="text-xl text-white" />
    </button>
  );
}
