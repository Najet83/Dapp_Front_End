"use client";

import { useWithdraw } from "@/hooks/useWithdraw";
import { useState, useEffect } from "react";

export default function WithdrawComponent() {

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    withdraw,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isConnected,
    isScrollSepolia,
    amount,
    setAmount,
    refetch,
  } = useWithdraw();

  // ✅ Affiche le message de succès puis le cache après 3 secondes
    useEffect(() => {
      if (isSuccess) {
        refetch();
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [isSuccess]);
  

  const handleWithdraw = async () => {
    setShowSuccess(false); // Masquer le message immédiatement
    await withdraw();
  };

  /* useEffect(() => {
    refetch();
  }, [isSuccess]); */

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 rounded p-4 m-4"
        placeholder="Amount in ETH"
      />
      ETH
      <button
        onClick={handleWithdraw}
        disabled={isPending || isConfirming || !isConnected || !isScrollSepolia}
        className="p-4 m-4 cursor-pointer font-semibold rounded-lg bg-red-50"
      >
        {!isScrollSepolia
          ? "Withdraw"
          : isPending
          ? "Waiting for wallet..."
          : isConfirming
          ? "Confirming..."
          : "Withdraw"}
      </button>
      {showSuccess && <p className="text-green-600">✅ Withdrawal confirmed </p>}
    </div>
  );
}
