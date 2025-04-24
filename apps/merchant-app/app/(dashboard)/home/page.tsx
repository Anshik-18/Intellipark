
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";



async function getparkinglot(){
  const session = await getServerSession(authOptions)
  const   merchantid = session?.user.id
  const parkinglot = await prisma.parkinglot.findFirst({
    where:{
      merchantid: Number(merchantid)
    }
  })
  return parkinglot
}


async function getParkingsForDate(parkinglotid: number, date?: string) {

  const targetDate = new Date((date ?? new Date().toISOString().split("T")[0]) as string);
 
  targetDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const parkings = await prisma.parkings.findMany({
    where: {
      parkingslotid: parkinglotid,
      date: {
        gte: targetDate,
        lt: nextDay,
      },
    },
    include: {
      user: true

    },
    orderBy: {
      starttime: 'asc',
    },
  });

  return parkings;
}


  export default async function Home() {
      const session = await getServerSession(authOptions)
      const merchantid  = session?.user.id
      if(!merchantid){
        return(
          <div className="Font-bold text-3xl">
            Merchant not logged in
          </div>
        )
      }
      const parkinglot = await getparkinglot()

      if(!parkinglot){
        return (
          <div>
            <div>
            No parking Lot found for the Merchant
            </div>
              <a href="/CreateLot">
                  <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                      Create a parking lot
                  </button>
              </a>
          </div>
        )
      }
      const parkinglotid =  Number(parkinglot.id)

      const parkings = await getParkingsForDate(parkinglotid)
      
    

      

      return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl mx-auto">

            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                Parking Lot Details
              </h2>
        
              <div className="space-y-4 text-sm sm:text-base text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span>{parkinglot?.Name || "—"}</span>
                </div>
        
                <div className="flex justify-between">
                  <span className="font-semibold">Address:</span>
                  <span>{parkinglot?.Adress || "—"}</span>
                </div>
        
                <div className="flex justify-between">
                  <span className="font-semibold">Total Slots:</span>
                  <span>{parkinglot?.totalslots ?? "—"}</span>
                </div>
        
                <div className="flex justify-between">
                  <span className="font-semibold">Occupied Slots:</span>
                  <span>{parkinglot?.occupiedslots ?? "—"}</span>
                </div>
        
                <div className="flex justify-between">
                  <span className="font-semibold">Vacant Slots:</span>
                  <span>{parkinglot?.vacantslots ?? "—"}</span>
                </div>
              </div>
            </div>
                    {parkings.map((parking) => (
                    <div key={parking.id} className="p-4 border rounded shadow mb-2">
                      <div className="font-semibold">{parking.user.name}</div>
                      <div>Car Number: {parking.carnumber}</div>
                      <div>Start: {new Date(parking.starttime).toLocaleTimeString()}</div>
                      <div>End: {new Date(parking.endtime).toLocaleTimeString()}</div>
                      <div>Status: {parking.status}</div>
                    </div>
                  ))}
            <div>

            </div>
        </div>
      );
      
  }
