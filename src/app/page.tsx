"use client";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { MemecoinGame } from "../components/MemecoinGame";
import { useEffect, useState } from "react";

export function TeaserGame() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <ChakraProvider>
      <Flex flexDirection="column" alignItems="center" width="100%">
        {show && <MemecoinGame />}
      </Flex>
    </ChakraProvider>
  );
}

export default TeaserGame;
