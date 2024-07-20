// hooks/useToken.ts
import { useEffect, useState } from "react";

const useApprove = () => {
  const [approve, setApprve] = useState("N");
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/approve", {
        method: "POST",
      });
      // const data = 1;
      const { isApprove } = await data.json();
      if (isApprove) {
        setApprve(isApprove);
      }
    })();
  }, []);
  return { approve };
};

export default useApprove;
