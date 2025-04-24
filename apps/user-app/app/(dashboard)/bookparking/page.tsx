
"use client";

import { Button } from "@repo/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Bookparking() {
  const searchparams = useSearchParams();
  const parking_lot_id = searchparams.get("lotid");
  const[lotdetails,setLotDetails] = useState<any>({});
  const [carnumber, setCarnumber] = useState("");
  const [result_status, setResultStatus] = useState<boolean | null>(null);
  const [result_message, setResultMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const[timeLeft, setTimeLeft] = useState(15 * 60)

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }


  useEffect(()=>{
    async function fetchlot(){
      if (!parking_lot_id) return;
  
      const res = await fetch(`/api/parkinglot/${parking_lot_id}`);

      if (res.ok) {
        const data = await res.json();
        
        setLotDetails(data);
      } else {
      
        console.error("Error fetching lot");
      }

      setLoading(false);
    }
    fetchlot()
  },[parking_lot_id])



  async function onsubmit() {
    try {
      const result = await fetch("/api/booking/create", {
        method: "POST",
        body: JSON.stringify({ carnumber, parking_lot_id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await result.json();
      if (!result.ok) {
        setResultStatus(false);
        setResultMessage(data.message || "Something went wrong");
      } else {
        setResultStatus(true);
        setResultMessage(data.message || "Successfully booked parking slot");
        setTimeLeft(15 * 60); // reset timer
      }
    } catch (e) {
      console.log(e);
      setResultStatus(false);
      setResultMessage("Something went wrong");
    }
  }
  useEffect(() => {
    if (result_status === true) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [result_status]);

  if (loading) return <p>Loading parking lot details...</p>;


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {result_status === null ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
              Book Your Parking Slot
            </h2>
  
            <div className="mb-4 space-y-1">
              <h1 className="text-xl font-semibold text-gray-800">{lotdetails.Name}</h1>
              <p className="text-gray-600">Price: ₹{lotdetails.price}</p>
              <p className="text-gray-600">Address: {lotdetails.Adress}</p>
              <p className="text-gray-600">Available Slots: {lotdetails.vacantslots}</p>
            </div>
  
            <input
              type="text"
              placeholder="Enter your car number"
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={carnumber}
              onChange={(e) => setCarnumber(e.target.value)}
            />
    
            <Button children="Book the Slot " onClick={()=>{
              onsubmit()
            }}/>

       
            
          </>
        ) : (
          <div
            className={`p-6 rounded-xl text-center font-medium transition-all duration-300 ${
              result_status
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="text-lg mb-4">{result_message}</p>
            {result_status && (
              <p className="text-sm mb-4 text-gray-700">
                Please reach within:{" "}
                <span className="font-bold text-blue-700">
                  {formatTime(timeLeft)}
                </span>
              </p>
            )}

            <button
              className="text-blue-600 underline hover:text-blue-800"
              onClick={() => {
                setResultStatus(null);
                setResultMessage("");
                setCarnumber("");
              }}
            >
              Book Another
            </button>
          </div>
        )}

      </div>
    </div>
  );
  
}


