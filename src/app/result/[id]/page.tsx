"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
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
    <div>
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
            <div>
              After authorization, return to the homepage and click exchange
              again.
            </div>
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
    </div>
  );
}
