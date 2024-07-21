// hooks/useToken.ts
import { useEffect, useState } from "react";

const useToken = () => {
  const [balance, setBalance] = useState("0");
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setPending(true);
        const data = await fetch("/api/balance");
        // const data = 1;
        const { balance } = await data.json();
        if (balance) {
          setBalance(Number(balance).toFixed(2));
        }
      } catch (error) {
      } finally {
        setPending(false);
      }
    })();
  }, []);
  return { balance, pending };
};

export default useToken;
