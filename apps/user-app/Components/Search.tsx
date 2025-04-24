"use client"
import { useEffect, useState } from "react";
import { Searchbox } from "@repo/ui/searchbox";

export async function Searchboxcard(){

    const[query,setquery] = useState("")
    const [resutl,setresult] = useState("")

    useEffect(()=>{

    },[query])

    return(
        <div>
            <Searchbox value={query} onChange={(e)=>{setquery(e.target.value)}}/>
        </div>
    )

}   