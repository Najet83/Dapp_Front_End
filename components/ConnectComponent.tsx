"use client";
import Connect from "@/hooks/connect";
import { useEffect } from 'react';

export default function ConnectComponent() {
  const { address, 
    isConnected, 
    isScrollSepolia, 
    wagmiContractConfig } = Connect();

  useEffect(() => {
    
    console.log("isConnected:", isConnected);
    console.log("address:", address);
  }, [isConnected]);

  return (
    <>
      <div className="p-4 m-4 font-semibold rounded-lg bg-yellow-50">
        <w3m-button></w3m-button>
        {isConnected ? (
          <div>
            <w3m-network-button></w3m-network-button>
            {isScrollSepolia ? (
              <p className="text-green-600">✅ The right Network is detected</p>
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
    </>
  );
}
