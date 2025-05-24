
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
import  {UserParkingCard}  from "../../../Components/User_parking_status"
import { Searchboxcard } from "../../../Components/Search"
import { SearchboxMapClient } from "../../../Components/SearchMap"


async function getbooking(userid:string){
    const booking = await prisma.parkings.findFirst({
        where:{
            userid : Number(userid),
            status:{in:["Pre_booked" ,"Parked"]}
        },
        include:{
            parkingslot:true
        }
    })
        return booking
}

export default async function Home(){
    const session = await getServerSession(authOptions)
    const userid = session?.user?.id

    if(!userid){
        return(
            <div>
                user not logged in
            </div>
        )
    }

    const booking = await getbooking(userid) 
    if(!booking){
        return(
            <div>
                 <SearchboxMapClient></SearchboxMapClient>

               "No bookings Found"

           </div>

        )
    }
  

    return (
        <div>
          <SearchboxMapClient></SearchboxMapClient>

            <div className="m-20">
                    <UserParkingCard status ={booking.status}
                    
                    Adress = {booking.parkingslot.Adress}
                    carNumber = {booking.carnumber}
                    location = " ">  
                    </UserParkingCard>
            </div>

            <div>
                
            </div>

        </div>
      
    )

}