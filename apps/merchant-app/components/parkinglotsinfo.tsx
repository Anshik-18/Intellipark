import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import prisma from "@repo/db/client"

async function getprkinglotinfo(){
    const session = await getServerSession(authOptions)
    const merchant = session?.user.id

    const parkinglot =  await prisma.parkinglot.findFirst({
        where:{
            merchantid:merchant
            
        },
        include:{
            parkings:true
        }
    })
    return parkinglot


}
async function prebookedcount(parkinglotid:number){
    const prebooked = await prisma.parkings.findMany({
        where:{
            parkingslotid:parkinglotid,
            status:"Pre_booked"
        }
    })
    return prebooked
}

export default async function Parkinglotinfo(){
    const session = await getServerSession(authOptions)
    const merchant = session?.user.id
    
    if(!merchant){
        return(
            <div className="text-xl font-bold">
                User not logged in
            </div>
        )
    }
    const parkinglotinfo = await getprkinglotinfo()
    const parkinglotid = parkinglotinfo?.id || 0
    const prebookedslots = await prebookedcount(parkinglotid)
   



    return(
        <div>
            <div className="text-3xl font-bold">
                {parkinglotinfo?.Name}
            </div>

            <div>
                Total slots = {parkinglotinfo?.totalslots}
            </div>
            <div>
                filled slots = {parkinglotinfo?.occupiedslots}
            </div>
            <div>
                Vacant slots = {parkinglotinfo?.vacantslots}
            </div>
            <div>
                Preebooked  slots = {prebookedslots.length}
            </div>

        </div>
    )

}