import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    
    const session =  await getServerSession(authOptions)
    const userid  = session?.user.id
    if(!userid){
        return NextResponse.json({sucess:false, message:"Unathorized"}, { status: 401 })
    }

    const bookings = await prisma.parkings.findMany({
        where:{
            userid:userid
        }
    })

    if(bookings.length==0){

        return NextResponse.json({success:false,message:"No bookings found ",bookings:[] })
    }
    return NextResponse.json({success:true,bookings })

}
