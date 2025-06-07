// components/DepositButton.tsx
"use client";

import useDeposit from "@/hooks/useDeposit";
import { useEffect } from "react";
import ReadFromContract from "../components/ReadFromContract";

export default function DepositButton() {
  const {
   
    handleDeposit,
    isSuccess,
    isPending,
    isConnected,
    isScrollSepolia,  
    amount,
    setAmount,
    refetch
  } = useDeposit();

  useEffect(() => {
    refetch();
  
      }, [isSuccess]);

  return (
    <div>
      <div>
        <ReadFromContract />
      </div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in ETH"
        className="border px-2 py-1 rounded p-4 m-4"
      />
      ETH
      <button
        className=" p-4 m-4 cursor-pointer font-semibold rounded-lg bg-green-50"
        onClick={handleDeposit}
        disabled={isPending || !isConnected || !isScrollSepolia}
      >
        {isPending && !isSuccess ? "Deposit in progress..." : "Deposit"} 
      </button>
      {isSuccess && <p>✅ Transaction confirmed ! </p>}
    </div>
  );
}
