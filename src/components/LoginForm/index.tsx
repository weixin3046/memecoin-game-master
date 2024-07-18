"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { Button } from "../Button";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [pending, setPending] = useState(false);
  const [phone, setPhone] = useState("");
  const re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setPending(false);
    }
  }, [countdown]);

  const sendVerificationCode = async () => {
    setPending(true);
    setCountdown(60);
    try {
      await fetch("/api/auth/requestcode", {
        method: "POST",
        body: JSON.stringify({
          phoneNo: phone,
        }),
      });
    } catch (error) {}
  };

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="phoneNumber"
            >
              Phone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-1 text-sm outline-2 placeholder:text-gray-500"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile phone"
                required
                minLength={11}
              />
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="code"
            >
              Verification Code
            </label>
            <div className="relative">
              <input
                className="peer relative block w-full rounded-md border border-gray-200 py-[9px] pl-1 text-sm outline-2 placeholder:text-gray-500"
                id="code"
                type="text"
                name="code"
                placeholder="Enter Verification Code"
                required
                minLength={6}
              />
              <Button
                className="absolute z-20 right-0 top-1/2  -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                aria-disabled={pending || !re.test(phone)}
                type="button"
                onClick={sendVerificationCode}
              >
                {pending ? `重新发送${countdown}` : `发送验证码`}
              </Button>
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending} type="submit">
      Log in
      {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
    </Button>
  );
}
