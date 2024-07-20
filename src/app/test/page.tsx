import { auth } from "@/auth";
import ApproveModal from "@/components/ApproveModal/ApproveModal";
import { CustomModal } from "@/components/CustomModal";
import { ChakraProvider } from "@chakra-ui/react";

export default async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <ChakraProvider>
      <ApproveModal />
    </ChakraProvider>
  );
}
