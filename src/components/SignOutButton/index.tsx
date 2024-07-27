"use client";
import { logout } from "@/actions/logout";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
  return (
    <button type="button" onClick={() => logout()}>
      <FaSignOutAlt className="text-xl text-white" />
    </button>
  );
}
