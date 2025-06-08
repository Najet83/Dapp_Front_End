"use client";
import useDeposit from "@/hooks/useDeposit";
import { useEffect } from "react";

export default function DepositComponent() {
  
  const {
   
    deposit,
    isSuccess,
    isPending,
    isConfirming,
    error,
    isConnected,
    isScrollSepolia,
    setAmount,
    amount,    
    refetch
  } = useDeposit();

  const handleDeposit = () => {
    deposit();
  };

  useEffect(() => {
    refetch();
  
      }, [isSuccess]);

  return (
    <div>
      
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
        disabled={isPending || isConfirming || !isConnected || !isScrollSepolia}
      >
        {isPending
          ? 'Waiting for wallet...'
          : isConfirming
          ? 'Confirming...'
          : 'Deposit'}
      </button>
      {isSuccess && <p className="text-green-600">✅ Deposit confirmed ! </p>}
      
    </div>
  );
}
