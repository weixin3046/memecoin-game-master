"use client";

import * as z from "zod";
import {
  Button,
  FormControl,
  FormLabel,
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
} from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomModal } from "../CustomModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import CnFlag from "@/components/assets/flag/cn.svg";
import HkFlag from "@/components/assets/flag/hk.svg";
import McFlag from "@/components/assets/flag/mc.svg";
import TwFlag from "@/components/assets/flag/tw.svg";
import { login } from "@/actions/login";
import CardWrapper from "@/components/LoginForm/card-wrapper";
import { useApproveState } from "@/stores/approveState";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const setProvider = useApproveState((state) => state.setProvider);
  const searchParams = useSearchParams();
  const phoneNo = searchParams.get("phoneNo");
  const areaCode = searchParams.get("areaCode");
  console.log(areaCode);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    defaultValues: {
      phone: phoneNo ? phoneNo : "",
      verifcode: "",
      areaCode: areaCode ? "+" + areaCode : "+86",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [areas, setAreas] = useState([
    {
      country: "中國大陸",
      area: "+86",
      flag: (
        <div>
          <CnFlag />
        </div>
      ),
    },
    {
      country: "香港地區(中國)",
      area: "+852",
      flag: (
        <div>
          <HkFlag />
        </div>
      ),
    },
    {
      country: "澳門地區(中國)",
      area: "+853",
      flag: (
        <div>
          <McFlag />
        </div>
      ),
    },
    {
      country: "臺灣地區(中國)",
      area: "+886",
      flag: (
        <div>
          <TwFlag />
        </div>
      ),
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

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransiton(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        setProvider("credentials");
        // setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      backButtonLabel={
        "為了確保您能順利領取到平台提供的福利，我們建議您使用登錄Blossom Chain時的帳號登錄遊戲，保持帳號一致，謝謝！"
      }
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor="phone">手機號</FormLabel>
          <InputGroup>
            <InputLeftElement width={"6rem"}>
              <Button width={"6rem"} type="button" onClick={onOpen}>
                <span className="flex gap-1 items-center">
                  {currentArea.flag}
                  <span>{currentArea.area}</span>
                  <ChevronDownIcon />
                </span>
              </Button>
            </InputLeftElement>
            <Input
              paddingLeft={"6.2rem"}
              id="phone"
              isDisabled={isPending || !!phoneNo}
              placeholder="請輸入"
              {...register("phone")}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.phone && errors.phone.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.verifcode}>
          <FormLabel htmlFor="verifcode">驗證碼</FormLabel>
          <InputGroup>
            <Input
              isDisabled={isPending}
              id="verifcode"
              placeholder="請輸入"
              {...register("verifcode")}
            />
            <InputRightElement width={"auto"}>
              <Button
                type="button"
                onClick={sendVerificationCode}
                isDisabled={
                  pending || !watch("phone") || !!errors.phone || isPending
                }
              >
                {pending ? `重新發送 ${countdown}` : `發送驗證碼`}
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
          isDisabled={isPending}
          isLoading={isSubmitting}
          type="submit"
        >
          登錄
        </Button>
      </form>
    </CardWrapper>
  );
  return (
    <>
      <Card>
        <CardBody>
          <CardHeader>
            <Heading size="md" className="text-center">
              MEMELAND GAME
            </Heading>
          </CardHeader>
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
                    {area.flag}
                    {/* <NextImage src={CnFlag} width={20} height={15} alt="flag" /> */}
                    {/* <CnFlag className={"w-[20px] h-[15px]"} /> */}
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
