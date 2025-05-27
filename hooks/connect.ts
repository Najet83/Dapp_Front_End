"use client";
import { useAccount, useChainId } from "wagmi";

export default function Connect() {
    const wagmiContractConfig = {
        address: "0xdf43227536c48a6e4d77edcddd0e1a37c130e0ef",
        abi: [
            { type: "constructor", inputs: [], stateMutability: "nonpayable" },
            {
                type: "function",
                name: "balanceOf",
                inputs: [{ name: "", type: "address", internalType: "address" }],
                outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "deposit",
                inputs: [],
                outputs: [],
                stateMutability: "payable",
            },
            {
                type: "function",
                name: "getBalance",
                inputs: [],
                outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "owner",
                inputs: [],
                outputs: [{ name: "", type: "address", internalType: "address" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "renounceOwnership",
                inputs: [],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "transferOwnership",
                inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "withdraw",
                inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "event",
                name: "FundsDeposited",
                inputs: [
                    {
                        name: "sender",
                        type: "address",
                        indexed: false,
                        internalType: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                        indexed: false,
                        internalType: "uint256",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "FundsWithdrawn",
                inputs: [
                    {
                        name: "receiver",
                        type: "address",
                        indexed: false,
                        internalType: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                        indexed: false,
                        internalType: "uint256",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "OwnershipTransferred",
                inputs: [
                    {
                        name: "previousOwner",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "newOwner",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                ],
                anonymous: false,
            },
            {
                type: "error",
                name: "OwnableInvalidOwner",
                inputs: [{ name: "owner", type: "address", internalType: "address" }],
            },
            {
                type: "error",
                name: "OwnableUnauthorizedAccount",
                inputs: [{ name: "account", type: "address", internalType: "address" }],
            },
        ],
    };
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const isScrollSepolia = chainId === 534351;              // Scroll sepolia

    return {
        address,
        isConnected,
        isScrollSepolia,
        wagmiContractConfig
    }
}