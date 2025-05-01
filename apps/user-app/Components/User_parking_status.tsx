import { DateTime } from "next-auth/providers/kakao";


export function UserParkingCard({status,location,Adress,carNumber}:{status:any,location:string,carNumber:string,Adress:string}){
    return(
        <div className="rounded-xl border shadow-md w-full max-w-md p-4 relative bg-white">
      {/* Status Tag */}
      <div className="absolute -top-3 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
        {status}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">{location}</h2>

      {/* adress */}
      <h2 className="text-l font-semibold mb-2">{Adress}</h2>


      {/* Car Info */}
      <div className="flex items-center mb-2 space-x-3">
        {/* <div className="bg-gray-100 p-2 rounded-full">
          
        </div> */}
        <div className="font-semibold"> Car number-{carNumber}</div>
      </div>

      {/* Check-in Time */}
      {/* <div className="flex items-center mb-4 space-x-3">
        <div className="bg-gray-100 p-2 rounded-full">
         
        </div>
        <div>
          <span className="text-gray-400 text-sm block">check in time</span>
          <span className="text-black font-medium">{starttime.getTime()}</span>
        </div>
      </div> */}

      {/* Navigation Button */}
      {/* <button
        onClick={onNavigateClick}
        className="flex items-center justify-center w-full py-2 text-blue-600 border-t pt-3 hover:underline text-sm font-medium"
      >
        📍 Navigate to Location
      </button> */}
    </div>
    )
}