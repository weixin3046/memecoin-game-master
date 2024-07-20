// hooks/useToken.ts
import { useEffect, useState } from "react";

const useToken = () => {
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/balance");
      // const data = 1;
      const { balance } = await data.json();
      if (balance) {
        setBalance(Number(balance).toFixed(2));
      }
    })();
  }, []);
  return { balance: balance };
};

export default useToken;
