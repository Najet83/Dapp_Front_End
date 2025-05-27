"use client";
import React, { useEffect, useState } from "react";
import {
  useWriteContract,
  useAccount,
  useReadContract,
  useChainId,
  useWatchContractEvent,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi";
import { parseEther, formatEther } from "viem";

export default function Home() {

  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('0.00000000000001');

  const {data: balance,refetch: refetchBalance,isLoading: loadingBalance} = useBalance({
    address,
    watch: true,
  });

  useEffect(() => {
    console.log("isConnected:", isConnected);
    console.log("address:", address);
  }, [isConnected]);

  const chainId = useChainId();

  const isScrollSepolia = chainId === 534351;      // Scroll sepolia   
  //const isScrollSepolia = chainId === 17000;            // holesky  
  //const isScrollSepolia = chainId === 11155111;       // sepolia 

  const disabled = !isConnected || !isScrollSepolia;

  //const [logs, setLogs] = useState<string[]>([]);
  // address: "0xdf43227536c48a6e4d77edcddd0e1a37c130e0ef"     // scroll sepolia
  //address: "0x061c5ED22B9b86a8B27c934A8EFB0b2946a32C55"    // sepolia
  //address: "0x01bE7AF1B84107B678402dE00C675CA32C3c2d62"    // holesky
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
        inputs: [
          { name: "newOwner", type: "address", internalType: "address" },
        ],
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

  const {
    data: contractBalance,isError,refetch} = useReadContract({
    ...wagmiContractConfig,
    functionName: "balanceOf",
    args: [address], 
    watch: true, 
  });

  // 👂 Écoute les events Deposit
  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: 'FundsDeposited',
    listener(logs) {
      logs.forEach((log) => {
        const { sender } = log.args as { sender: string };
        if (sender.toLowerCase() === address?.toLowerCase()) {
          refetch(); // 🔄 met à jour la balance seulement si c’est l’utilisateur
        }
      });
    },
  });

  const handleGetBalance = async () => {
    
        const { data } = await refetch();
        if (data) {
          const eth = Number(data) / 1e18;
          console.log(`Balance in the contract : ${eth} ETH`);
        } else {
          console.log("No Data to load");
        } 
      
  };

  //const { writeContract } = useWriteContract();
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
      onSuccess: () => {
        console.log('✅ Deposit success — updating balance');
        refetchBalance(); // ✅ met à jour le solde ETH du wallet
      },
    },
  });

  

  const handleDeposit = async () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "deposit", // Replace with the actual function name
      value: parseEther(amount), // Replace with the actual arguments
    
    });

    console.log("Deposit transaction sent");

  };
  
  
  return (
    <>
      <div className="p-4 m-4 font-semibold rounded-lg bg-yellow-50">
        <w3m-button></w3m-button>
        {isConnected ? (
          <div>
            <w3m-network-button></w3m-network-button>
            {isScrollSepolia ? (
              <p className="text-green-600">✅  The right Network is detected</p>
            ) : (
              <p className="text-red-600">
                ❌ You choose the wrong Network — Be connected to Scroll Sepolia
              </p>
            )}{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="p-4 m-4 font-semibold rounded-lg bg-red-50">
        {" "}
        {isConnected ? `Connected: ${address}` : `Not Connected`}
      </div>
      <div>
        <button
          className=" p-4 m-4  cursor-pointer font-semibold rounded-lg bg-blue-50"
          onClick={handleGetBalance}
          disabled={disabled}
        >
          {" "}
          Balance in the contract :{" "}
          {contractBalance
            ? `${(Number(contractBalance) / 1e18).toFixed(4)} ETH`
            : "No Data to load"}{" "}
          {/* <p>
            Balance in the contract :{" "}
            {loadingBalance ? 'Loading...' : `${(Number(contractBalance) / 1e18).toFixed(4)} ETH`}
          </p> */}
        </button>
      </div>
      <div>
        <button
          className=" p-4 m-4 cursor-pointer font-semibold rounded-lg bg-green-50"
          onClick={handleDeposit}
          disabled={isPending || !isConnected || !isScrollSepolia}
        >
          {isPending ? 'Deposit is loading...' : 'Deposit'}
        </button>
      </div>
      
    </>
  );
}

