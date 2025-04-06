"use client"
import { useState } from "react";
import { MdMoreVert } from "react-icons/md"; // Vertical three dots
import { Alter } from "./alter";
export function More(){
    const [ dot, setDot ] = useState<boolean>(true)
    return(
    <div className="w-full h-fit flex justify-end">
     {dot?(<MdMoreVert className="text-xl sm:text-2xl text-white mr-4"
     onClick={()=>setDot(false)}/>):
     (<Alter setDot={setDot}/>)}
    </div>)
}