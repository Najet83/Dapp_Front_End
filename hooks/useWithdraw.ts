// hooks/useWithdraw.ts
import { useWriteContract, useWaitForTransactionReceipt, useBalance, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { useEffect, useState } from "react";
import ReadBalance from "@/hooks/readBalance";

export function useWithdraw() {
    const chainId = useChainId();
    const [amount, setAmount] = useState('0.00000000000001');
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
    const {
        address,
        wagmiContractConfig,
        isConnected,
        isScrollSepolia,
        refetch } = ReadBalance();

    const { data: balance, refetch: refetchBalance, isLoading: loadingBalance } = useBalance({
        address,
        watch: true,
    });

    const {
        writeContractAsync,
        /* data: hash, */
        isPending,
        error,
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash: txHash,
        query: {
            enabled: !!txHash,
            onSuccess: () => {
                console.log('✅ Withdraw success — updating balance');
                refetchBalance(); // ✅ met à jour le solde ETH du wallet
                refetch(); // ✅ met à jour le solde ETH dand le smart contract
            },
        },
    });

    // 🧼 Réinitialise txHash (donc isSuccess) si on change de réseau
    useEffect(() => {
        setTxHash(undefined);
    }, [chainId]);


    const withdraw = async () => {
        try {
            const hash = await writeContractAsync({
                ...wagmiContractConfig,
                functionName: 'withdraw',
                args: [parseEther(amount)],
            });
            setTxHash(hash as `0x${string}`);
        } catch (error: any) {
            if (error?.message?.includes('User denied')) {
                console.warn('🚫 Transaction rejected by the user ');
            } else {
                console.error('❌ Error during withdraw :', error);
            }
        }
    };

    return {
        withdraw,
        isPending,
        isConfirming,
        isSuccess,
        isConnected,
        isScrollSepolia,
        error,
        txHash,
        amount,
        setAmount,
        refetch
    };
}
