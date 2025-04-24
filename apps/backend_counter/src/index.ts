import express from "express"


import prisma from "@repo/db/client"
const app = express()

app.use(express.json())



app.post("/backend_counter/entry", async (req,res):Promise<any>=>{
    console.log("hi helooo")
    const id = Number(req.body.parkinglotid)
    const carnumber = String(req.body.carnumber)
    const lot =  await prisma.parkinglot.findFirst({
        where:{
            id:id
        }
    })
    const parking = await prisma.parkings.findFirst({
        where:{
            carnumber: carnumber
        }
    })
    if(lot?.vacantslots==0){
        return res.status(411).json({ message: "No space" });
    }

    else{
        await prisma.parkinglot.update({
            where:{
                id:id
            },
            data:{
                occupiedslots:{
                    increment: 1
                },
                vacantslots:{
                    decrement:1
                }
            }
        })
        if(!parking){
            const newpark = await prisma.nonBooking_parking.create({
                data:{
                    carnumber:carnumber,
                    parkinglslotid:id
                }
            }) 
         }

         
        }
        return res.status(202).json({ message: "Parking created" });
    
})



app.listen(3004)