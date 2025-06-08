"use client";
import useDeposit from "@/hooks/useDeposit";
import { useEffect,useState } from "react";

export default function DepositComponent() {

  const [showSuccess, setShowSuccess] = useState(false);
  
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
    refetch,
  } = useDeposit();

  // ✅ Affiche le message de succès puis le cache après 3 secondes
  useEffect(() => {
    if (isSuccess) {
      refetch();
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleDeposit = async () => {
    setShowSuccess(false); // Masquer le message immédiatement
    await deposit();
  };

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
        {!isScrollSepolia
          ? "Deposit"
          : isPending
          ? "Waiting for wallet..."
          : isConfirming
          ? "Confirming..."
          : "Deposit"}
      </button>
      {showSuccess && <p id="message" className="text-green-600">✅ Deposit confirmed ! </p>}
    </div>
  );
}
