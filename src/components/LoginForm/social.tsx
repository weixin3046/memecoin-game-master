"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { Button } from "@chakra-ui/react";
import { useApproveState } from "@/stores/approveState";

const Social = () => {
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const setProvider = useApproveState((state) => state.setProvider);
  const onClick = (provider: "google" | "apple") => {
    console.log(provider);
    setProvider(provider);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full justify-center flex-col gap-2">
      <Button
        size="lg"
        className="w-full gap-1"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
        通過Google帳號登入
      </Button>
      {/* <Button
        size="lg"
        className="w-full gap-1"
        variant="outline"
        onClick={() => onClick("apple")}
      >
        <FaApple className="h-5 w-5" />
        通過Apple帳號登入
      </Button> */}
    </div>
  );
};

export default Social;
