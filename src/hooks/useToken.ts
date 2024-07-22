// hooks/useToken.ts
import { useBalanceStore } from "@/stores/teaser";
import { useEffect, useState } from "react";

const useToken = () => {
  const [balance, setBalance] = useState("0");
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const fetchData = async () => {
    setPending(true);
    useBalanceStore.setState({ pending: true });
    try {
      const data = await fetch("/api/balance");
      const { balance } = await data.json();
      if (balance) {
        setBalance(Number(balance).toFixed(2));

        useBalanceStore.setState({ balance: Number(balance).toFixed(2) });
      }
    } catch (error) {
      setError("error");
      useBalanceStore.setState({ error: "error" });
    } finally {
      setPending(false);
      useBalanceStore.setState({ pending: false });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => {
    fetchData();
  };
  return { balance, pending, error, refetch };
};

export default useToken;
