"use client";
import { useReadContract } from "wagmi";
import Connect from "@/hooks/connect";


export default function ReadBalance() {
    const { address,
        isConnected,
        isScrollSepolia,
        wagmiContractConfig } = Connect();


    const { data, isLoading, refetch } = useReadContract({
        ...wagmiContractConfig,
        functionName: "balanceOf",
        args: address ? [address as `0x${string}`] : undefined,
    });

    console.log("data:", data);

    return {
        address,
        isConnected,
        isScrollSepolia,
        wagmiContractConfig,
        data,
        isLoading,
        refetch
    }

}
