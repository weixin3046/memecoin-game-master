import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import { CustomModal } from "../CustomModal";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="xs">
            通过手机号码登录
          </Button>
          <Button colorScheme="teal" size="sm">
            通过 Google 继续
          </Button>
          <Button colorScheme="teal" size="md">
            通过 Apple 继续
          </Button>
        </Stack>
      </CustomModal>
    </div>
  );
};
