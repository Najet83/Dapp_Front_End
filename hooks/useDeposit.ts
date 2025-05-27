import { useWriteContract, useWaitForTransactionReceipt, useBalance } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import ReadBalance from "@/hooks/readBalance";

export default function useDeposit() {

    const [amount, setAmount] = useState("0.00000000000001");
    const { 
        address,
        isConnected,
        isScrollSepolia,
        wagmiContractConfig,
        data,
        isLoading,
        refetch } = ReadBalance(); 
          
    console.log("data:", data);      // balance of the contract
    console.log("adress of wallet:", address); 

    const { data: balance, refetch: refetchBalance, isLoading: loadingBalance } = useBalance({
        address,
        watch: true,
    });   

    console.log("balance:", balance?.value);  // balance of the wallet

    const { writeContract, data: txHash, isPending } = useWriteContract();

    const { isSuccess } = useWaitForTransactionReceipt({
        hash: txHash,
        query: {
            enabled: !!txHash,
            onSuccess: () => {
                console.log('✅ Deposit success — updating balance');
                refetchBalance(); // ✅ met à jour le solde ETH du wallet
                refetch();
            },
        },
    });


    const handleDeposit = () => {
        writeContract({
            ...wagmiContractConfig,
            functionName: "deposit",
            value: parseEther(amount),
        });

    }

    return {

        handleDeposit,
        isSuccess,
        isPending,
        isConnected,
        isScrollSepolia,
        amount,
        setAmount,
        refetch
    };
}

