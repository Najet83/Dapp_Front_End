"use client";

import { useWithdraw } from '@/hooks/useWithdraw';
import { useState,useEffect } from 'react';

export default function WithdrawButton() {
  const [amount, setAmount] = useState('0.00000000000001');
  const {
    withdraw,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isConnected,
    isScrollSepolia,
    refetch
  } = useWithdraw();

  const handleWithdraw = () => {
    withdraw(amount);
  };

  useEffect(() => {
      refetch();
    
        }, [isSuccess]);

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
        {isPending
          ? 'Waiting for wallet...'
          : isConfirming
          ? 'Confirming...'
          : 'Withdraw'}
      </button>
      {isSuccess && <p className="text-green-600">✅ Withdrawal confirmed </p>}
      {/* {error && <p className="text-red-600">Error: {error.message}</p>} */}
    </div>
  );
}
