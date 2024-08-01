// app/providers.tsx
"use client";

import { modalTheme } from "@/theme/components/modal";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Modal: modalTheme,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
