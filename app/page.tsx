"use client";

import ConnectComponent from "@/components/ConnectComponent"
import DepositComponent from "@/components/DepositComponent";
import WithdrawComponent from "@/components/WithdrawComponent";
import ReadFromContract from "@/components/ReadFromContract";

export default function Home() {
  

  return (
    <>
      <div>
        <ConnectComponent />
      </div>
      <div>
        <ReadFromContract />
      </div>
      <div>
        <DepositComponent />
      </div>
      <div>
        <WithdrawComponent />
      </div>
    </>
  );
}
