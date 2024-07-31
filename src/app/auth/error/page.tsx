import ErrorCard from "@/components/LoginForm/error-card";
import { ChakraProvider } from "@chakra-ui/react";

const AuthErrorPage = () => {
  return (
    <ChakraProvider>
      <ErrorCard />
    </ChakraProvider>
  );
};

export default AuthErrorPage;
