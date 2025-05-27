"use client";
import ReadBalance from "@/hooks/readBalance";

export default function ReadFromContract() {
  
  const {data,
    isLoading,
    refetch} = ReadBalance();
  
    
  return (
    <div className=" p-4 m-4  font-semibold rounded-lg bg-blue-50">
      <p>
        Your balance in the contract:{" "}
        {isLoading
          ? "Loading..."
          : data + " ETH"}
        {""}
      </p>

      {/* <button className="cursor-pointer" onClick={() => refetch()}>
        🔄 Refresh
      </button> */}
    </div>
  );
}
