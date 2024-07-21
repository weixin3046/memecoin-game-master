// hooks/useToken.ts
import { useEffect, useState } from "react";

const useApprove = () => {
  const [approve, setApprve] = useState("N");
  const [pending, setPending] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setPending(true);
        const data = await fetch("/api/approve", {
          method: "POST",
        });
        // const data = 1;
        const { isApprove } = await data.json();
        if (isApprove) {
          setApprve(isApprove);
        }
      } catch (error) {
      } finally {
        setPending(false);
      }
    })();
  }, []);
  return { approve, pending };
};

export default useApprove;
