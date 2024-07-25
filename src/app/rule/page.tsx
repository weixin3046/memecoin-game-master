"use client";

import NextImage from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function RulePage() {
  return (
    <div className="w-full h-screen relative">
      <NextImage
        src="/MemeRule.png"
        alt="Meme Rule"
        layout="fill"
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="absolute top-0 left-0">
        <Link href={"/"} className="absolute left-0 top-4">
          <ChevronLeftIcon className="text-4xl" />
        </Link>
      </div>
    </div>
  );
}
