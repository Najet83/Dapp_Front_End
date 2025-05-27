"use client";
import { useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { useEffect } from "react";

import WriteToContract from "../components/DepositButton";
import ConnectButton from "../components/ConnectButton";
import Connect from "@/hooks/connect";

export default function Home() {
  const { address, isConnected } = Connect();

  useEffect(() => {
    console.log("isConnected:", isConnected);
    console.log("address:", address);
  }, [isConnected]);


  return (
    <>
      <div>
        <ConnectButton />
      </div>
      
      <div>
        <WriteToContract />
      </div>
    </>
  );
}
