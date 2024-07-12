"use client";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter();
  const handleInputChange = (e) => setPhone(e.target.value);
  const re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
  const isError = useMemo(() => {
    return re.test(phone);
  }, [phone]);
  const disabled = useMemo(() => {
    console.log(!!code, "!!code;");
    return !isError || !code;
  }, [code, isError]);

  console.log(!isError, "isError");
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 2000);
  };
  return (
    <ChakraProvider>
      <Box padding={6}>
        <Stack spacing={4}>
          <Text fontSize={"lg"} as={"b"}>
            手机号登录
          </Text>
          <FormControl isInvalid={!isError}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={handleInputChange}
              />
            </InputGroup>
            {!isError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>

          <InputGroup>
            {/* <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement> */}
            <Input
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <InputRightElement width="7.5rem">
              <Button h="1.75rem" size="sm">
                发送验证码
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            colorScheme="yellow"
            isDisabled={disabled}
            isLoading={loading}
            onClick={submit}
            loadingText="Submitting"
          >
            登录
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
