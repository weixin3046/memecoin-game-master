"use client";
import { useTransactionStore } from "@/stores/teaser";
import UpdateTransaction from "./UpdateTransaction";
import { Button, List } from "@chakra-ui/react";

export default function Transactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  console.log(transactions, "transactions======");
  return (
    <div>
      <List>
        {transactions.map((transaction) => (
          <UpdateTransaction key={transaction.hash} transaction={transaction} />
        ))}
      </List>
    </div>
  );
}
