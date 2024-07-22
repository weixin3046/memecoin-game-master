// "use client";
import { ChakraProvider, Flex, IconButton } from "@chakra-ui/react";
import { MemecoinGame } from "../components/MemecoinGame";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { signOut } from "@/auth";

import Link from "next/link";
import SwapApprove from "@/components/SwapApprove";
import Balance from "@/components/Balance";

export function TeaserGame() {
  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        className="relative"
        alignItems="center"
        width="100%"
      >
        <div className="bg  absolute top-0 left-0 w-full h-20 z-30 p-5">
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-start flex-col">
              <Balance />
              <SwapApprove />
            </div>
            <div className="flex flex-col gap-4 items-end">
              <Link href="/rule" className="hover:!no-underline no-underline">
                <FaFileAlt className="text-2xl text-white" />
              </Link>
              <FaSignOutAlt
                className="text-xl text-white"
                // onClick={async () => {
                //   await signOut();
                // }}
              />
            </div>
          </div>
        </div>
        <MemecoinGame />
      </Flex>
    </ChakraProvider>
  );
}

export default TeaserGame;
