// hooks/useWithdraw.ts
import { useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import ReadBalance from "@/hooks/readBalance";

export function useWithdraw() {
   
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
        writeContract,
        data: hash,
        isPending,
        error,
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
        query: {
            enabled: !!hash,
            onSuccess: () => {
                console.log('✅ Withdraw success — updating balance');
                refetchBalance(); // ✅ met à jour le solde ETH du wallet
                refetch(); // ✅ met à jour le solde ETH dand le smart contract
            },
        },
    });

    const withdraw = (ethAmount: string) => {
        writeContract({
            ...wagmiContractConfig,
            functionName: 'withdraw',
            args: [parseEther(ethAmount)],
        });
    };

    return {
        withdraw,
        isPending,
        isConfirming,
        isSuccess,
        isConnected,
        isScrollSepolia,
        error,
        refetch
    };
}
