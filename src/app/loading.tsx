"use client";
import { SpinnerIcon } from "@chakra-ui/icons";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center items-center pb-2">
          <SpinnerIcon className="animate-spin " />
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
}
