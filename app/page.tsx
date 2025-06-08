"use client";

import { useEffect } from "react";
import ConnectButton from "../components/ConnectButton";
import Connect from "@/hooks/connect";
import DepositButton from "../components/DepositButton";
import WithdrawButton from "@/components/WithdrawButton";
import ReadFromContract from "../components/ReadFromContract";

export default function Home() {
  /* const { address, isConnected } = Connect();

  useEffect(() => {
    console.log("isConnected:", isConnected);
    console.log("address:", address);
  }, [isConnected]);
 */

  return (
    <>
      <div>
        <ConnectButton />
      </div>
      <div>
        <ReadFromContract />
      </div>
      <div>
        <DepositButton />
      </div>
      <div>
        <WithdrawButton />
      </div>
    </>
  );
}
