"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ChakraProvider,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RusltPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    const fetchData = async () => {
      try {
        const result = await fetch(
          `/api/approverresult?approveCrossId=${params.id}`
        );
        const data = await result.json();
        if (data.content === "SUCCESS") {
          if (isMounted) {
            setStatus("success");
            isMounted = false;
          }
          return true;
        }
        return false;
      } catch (error) {
        if (isMounted) {
          setStatus("error");
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
          if (isMounted) {
            setLoading(false);
          }
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
    <ChakraProvider>
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100vh"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Authorization transaction on chain!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <div className="space-y-5">
            <div>
              The authorization transaction is expected to be confirmed within
              3-5 minutes
            </div>
            <div>授权成功之后还需要你饭回首页再次点击兑换</div>
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Back Home
            </Button>
          </div>
        </AlertDescription>
      </Alert>
      {/* <div className="space-y-4 p-4">
        <div className="flex items-center justify-center relative h-16">
          <div className=" text-2xl">RusltPage</div>
          <Link href={"/"} className="absolute left-0 top-4">
            <ChevronLeftIcon className="text-4xl" />
          </Link>
        </div>
        <div>
          欢迎来到Web3的世界！在这里，我们将向您介绍将私链（PEG）资产转向公链（TPEG）的跨链操作。对于习惯了Web2的用户，跨链过程可能看起来有些复杂，但实际上，这个过程就像是从传统银行系统转移到更为开放和安全的区块链网络。以下是一个简单的介绍，帮助您理解这个从Web2到Web3的转变：
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">什么是Web3？</h3>
          <div className="text-md">
            Web3代表了互联网的新时代，它不仅仅是信息的传递平台，更是一个去中心化的网络，允许用户直接在彼此之间进行价值交换，而无需中介。这意味着在Web3中，用户可以真正拥有并控制他们的数字资产。
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg">为什么要跨链？</h3>
          <div className="text-md">
            跨链技术使得在不同区块链网络之间转移资产成为可能。例如，您可以将私链（RaQ）上的资产转移到公链（BSC）上，享受更广泛的生态系统和应用支持。这就像是将您的资金从一家本地银行转移到一家国际银行，以便更自由地进行全球交易。
          </div>
        </div>
        <div>
          <h3 className="text-lg">Web3的优势</h3>
          <ul>
            <li>- 去中心化：无中介，用户拥有对资产的完全控制权。</li>
            <li>- 安全性：区块链技术保障了数据的不可篡改和交易的透明性。</li>
            <li>
              - 全球化：跨链技术使得资产在全球范围内自由流动，无需担心地域限制。
            </li>
          </ul>
        </div>
        <div>
          <div>
            从Web2到Web3的转变不仅仅是技术的进步，更是理念的变革。通过跨链技术，您可以享受到更加自由、安全和高效的数字资产管理方式。让我们一起迈入Web3的新时代，探索更多的可能性！
          </div>
        </div>
        <div className="flex justify-center items-center text-lg">
          {status ? (
            <div>🎉🎉🎉兑换成功</div>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
              <div>兑换进行中</div>
            </div>
          )}
        </div>
      </div> */}
      {/* <Drawer isOpen={true} onClose={onClose} size={"full"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>积分兑换</DrawerHeader>

            <DrawerBody>
              <div>
                <Text fontSize={"xl"}>PEG兑换成TPEG</Text>
                <div>
                  <Progress hasStripe value={100} />
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer> */}
    </ChakraProvider>
  );
}
