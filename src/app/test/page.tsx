import { CustomModal } from "@/components/CustomModal";
import { ChakraProvider } from "@chakra-ui/react";

export default function Page() {
  return (
    <ChakraProvider>
      <CustomModal />
    </ChakraProvider>
  );
}
