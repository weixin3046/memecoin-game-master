"use client";
import { logout } from "@/actions/logout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
  // const router = useRouter();
  // useEffect(() => {
  //   // 假设在这里处理退出登录逻辑
  //   // 清除cookie或其他身份验证状态

  //   // 重定向到登录页面
  //   const callbackUrl = encodeURIComponent(router.asPath);
  //   router.push(`/auth/login?callbackUrl=${callbackUrl}`);
  // }, [router]);
  return (
    <button
      type="button"
      onClick={async () => {
        await logout();
        window.location.href = "/auth/login";
        // window.location.reload();
      }}
    >
      <FaSignOutAlt className="text-xl text-white" />
    </button>
  );
}
