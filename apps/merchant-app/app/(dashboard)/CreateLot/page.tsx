  "use client";
  import { useEffect, useState } from "react";
  import { Textinput } from "@repo/ui/textinput";
  import LocationPicker from "../../../components/locationpicker";
  import { Button } from "@repo/ui/button";



  export default function CreateLot() {
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [adress, setadress] = useState("");
    const [totalslots, settotalslots] = useState("");
    const[parkinglotresult, setparkinglotresult] = useState<string | null>(null)
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    async function createparkinglot(){
      if (!name || !price || !adress || !totalslots || latitude === null || longitude === null) {
        setparkinglotresult("Please fill in all fields.");
        return;
      }
     
      try{
        const result = await fetch("/api/parkinglot/create",{
          method:"POST",
          body:JSON.stringify({name,price,adress,totalslots,latitude,longitude}),
          headers:{"Content-Type": "application/json"},
        })
        if(!result.ok){
          throw new Error("Somehting went wrong")
        }
        const {message}= await result.json()
        setparkinglotresult(message)
      }
      catch(err){
        console.log(err);
        setparkinglotresult("Something went wrong")
      }
      
  }

    return   (
      <div className="px-4 py-6 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
        <h1 className="text-xl font-bold text-center mb-6 sm:text-2xl">
          Enter the details of the parking lot
        </h1>

        <div className="space-y-4">
          <Textinput
            placeholder="Name of parking lot"
            onChange={(e) => setname(e)}
            label="Name"
            value={name}
          />
          <Textinput
            placeholder="Price"
            onChange={(e) => setprice(e)}
            label="Price"
            value={price}
          />
          <Textinput
            placeholder="Address"
            onChange={(e) => setadress(e)}
            label="Address"
            value={adress}
          />
          <Textinput
            placeholder="Total slots"
            onChange={(e) => settotalslots(e)}
            label="Total slots"
            value={totalslots}
          />
          <LocationPicker
            onLocationSelect={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />
        </div>
        <div className="pt-5 flex justify-center">
          <Button   onClick={createparkinglot} children="Create Parking"></Button>
   
        </div>
        {parkinglotresult && (<div>
         Parking Lot Created Succesfully 
       </div>)}
         
      </div>
    )
    
    
  }
