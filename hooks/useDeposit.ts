import { useWriteContract, useWaitForTransactionReceipt, useBalance, useChainId } from "wagmi";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import ReadBalance from "@/hooks/readBalance";

export default function useDeposit() {
    const chainId = useChainId();
    const [amount, setAmount] = useState("0.00000000000001");
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

    const {
        address,
        isConnected,
        isScrollSepolia,
        wagmiContractConfig,
        data,
        isLoading,
        refetch } = ReadBalance();


    const { data: balance, refetch: refetchBalance, isLoading: loadingBalance } = useBalance({
        address,
    });


    const { 
        writeContractAsync ,
        /* data: txHash, */
        isPending,
        error, } = useWriteContract();

    const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    
  });
    
    useEffect(() => {
      if (isSuccess) {
        console.log("✅ Dépôt confirmé, mise à jour des soldes...");
        refetchBalance();
        refetch();
      }
    }, [isSuccess]);
    
    // 🧼 Réinitialise txHash (donc isSuccess) si on change de réseau
    useEffect(() => {
        setTxHash(undefined);
    }, [chainId]);

    const deposit = async () => {
        try {
            const hash = await writeContractAsync({
                ...wagmiContractConfig,
                functionName: "deposit",
                value: parseEther(amount),
            });
            setTxHash(hash as `0x${string}`);

        } catch (error: any) {
            if (error?.message?.includes('User denied')) {
                console.warn('🚫 Transaction rejected by the user ');
            } else {
                console.error('❌ Error during deposit :', error);
            }
        }
    };

    return {

        deposit,
        isSuccess,
        isPending,
        isConfirming,
        error,
        isConnected,
        isScrollSepolia,
        setAmount,
        amount,
        txHash,
        refetch
    };
}

