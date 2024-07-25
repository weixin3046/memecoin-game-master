"use client";
import {
  Alert,
  AlertIcon,
  ChakraProvider,
  Container,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import NextImage from "next/image";

export default function RusltPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    const fetchData = async () => {
      try {
        const result = await fetch(
          `/api/crossresult?crossChainId=${params.id}`
        );

        const data = await result.json();
        if (data.content === "SUCCESS") {
          if (isMounted) {
            setStatus("success");
            isMounted = false;
          }
          return true;
        }
        if (data.content === "FAIL") {
          if (isMounted) {
            setStatus("error");
            isMounted = false;
          }
        }
        return false;
      } catch (error) {
        if (isMounted) {
          setError("error");
          isMounted = false;
        }
        return false;
      }
    };

    // 循环请求 API 的函数
    const startFetching = async () => {
      while (isMounted) {
        const isReady = await fetchData();
        if (isReady) {
          break;
        }
        // 等待一段时间后再重新请求，假设是 5 秒
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    startFetching();
    // Cleanup function to set the isMounted flag to false
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (error) {
    return <div>请求出错了，刷新试一试</div>;
  }
  return (
    <>
      <div className="relative w-full h-screen">
        <NextImage
          src={"/loading.png"}
          layout="fill"
          alt="bg"
          className="absolute top-0 left-0 right-0 bottom-0"
        />
        <div className="absolute top-0 left-0">
          <Link href={"/"} className="absolute left-0 top-4">
            <ChevronLeftIcon className="text-4xl" />
          </Link>
        </div>
        <div className="absolute bottom-5 left-0 right-0 px-8">
          <Alert status={status}>
            <AlertIcon />
            Transaction result query in progress
            <div>{error}</div>
          </Alert>
        </div>
      </div>
    </>
  );
}
