"use client";

import * as z from "zod";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  FormErrorMessage,
  Card,
  CardBody,
  InputGroup,
  InputRightElement,
  CardHeader,
  Heading,
  InputLeftElement,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticate } from "@/app/api/auth/signIn/server";
import { CustomModal } from "../CustomModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import NextImage from "next/image";
{
  /* <PixelClock /> */
}
export default function LoginForm() {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    mode: "all",
    defaultValues: {
      phone: "",
      verifcode: "",
      areaCode: "+86",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [areas, setAreas] = useState([
    {
      country: "中国大陆",
      area: "+86",
      flag: "cn",
    },
    {
      country: "香港地区(中国)",
      area: "+852",
      flag: "hk",
    },
    {
      country: "澳门地区(中国)",
      area: "+853",
      flag: "mc",
    },
    {
      country: "台湾地区(中国)",
      area: "+886",
      flag: "tw",
    },
  ]);
  const [currentArea, setCurrentArea] = useState(areas[0]);
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isPending, startTransiton] = useTransition();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setPending(false);
    }
  }, [countdown]);
  const sendVerificationCode = async () => {
    setPending(true);
    setCountdown(60);
    try {
      await fetch("/api/auth/requestcode", {
        method: "POST",
        body: JSON.stringify({
          phoneNo: watch("phone"),
          areaCode: watch("areaCode"),
        }),
      });
    } catch (error) {}
  };

  const onSubmit = async (values: z.infer<typeof LoginSchemas>) => {
    setError("");
    setSuccess("");
    startTransiton(() => {
      authenticate(values).then((data) => {
        console.log(data, "data=========");
        setError(data);
        // setSuccess(data.success);
      });
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardHeader>
            <Heading size="md">请登录访问更多内容</Heading>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">手机号</FormLabel>
              <InputGroup>
                <InputLeftElement width={"6rem"}>
                  <Button width={"6rem"} type="button" onClick={onOpen}>
                    <span className="flex gap-1 items-center">
                      <NextImage
                        src={`/flag/${currentArea.flag}.svg`}
                        width={20}
                        height={15}
                        alt="flag"
                      />
                      <span>{currentArea.area}</span>
                      <ChevronDownIcon />
                    </span>
                  </Button>
                </InputLeftElement>
                <Input
                  paddingLeft={"6.2rem"}
                  id="phone"
                  placeholder="phone"
                  {...register("phone")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.verifcode}>
              <FormLabel htmlFor="verifcode">验证码</FormLabel>
              <InputGroup>
                <Input
                  id="verifcode"
                  placeholder="Verification Code"
                  {...register("verifcode")}
                />
                <InputRightElement width={"auto"}>
                  <Button
                    type="button"
                    onClick={sendVerificationCode}
                    isDisabled={pending || !watch("phone") || !!errors.phone}
                  >
                    {pending ? `重新发送 ${countdown}` : `发送验证码`}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.verifcode && errors.verifcode.message}
              </FormErrorMessage>
            </FormControl>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              mt={4}
              width={"100%"}
              background="#5FC7FF"
              disabled={isPending}
              isLoading={isSubmitting}
              type="submit"
            >
              登录
            </Button>
          </form>
        </CardBody>
      </Card>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <List spacing={3}>
          {areas.map((area) => (
            <ListItem
              key={area.area}
              onClick={() => (
                setCurrentArea(area), onClose(), setValue("areaCode", area.area)
              )}
            >
              {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div>
                    <NextImage
                      src={`/flag/${area.flag}.svg`}
                      width={20}
                      height={15}
                      alt="flag"
                    />
                  </div>
                  <div>{area.country}</div>
                </div>
                <div> {area.area}</div>
              </div>
            </ListItem>
          ))}
        </List>
      </CustomModal>
    </>
  );
}
