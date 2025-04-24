import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("hi")
  const id = params.id;
  console.log(id)

  const lot = await prisma.parkinglot.findUnique({
    where: { 
      id:Number(id)
     },
  });

  if (!lot) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(lot);
}
