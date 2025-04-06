"use client"
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
type detailsType={
    _id:string,
    photo:any,
    category:string,
    artist:string
  }
export default function ExistingDataPage(){
    const [ details, setDetails ] = useState<detailsType[]|null>(null)

    const obtainingDetails=useCallback(async ()=>{
        const response= await fetch("/api/wallpaper");
        if(!response.ok)
            throw new Error("Couldn't fetch")
        const data:detailsType[]=await response.json();
        setDetails(data);
    },[])
    useEffect(()=>{
      obtainingDetails();
    },[obtainingDetails])

    async function removingItems(id:string){
       await fetch("/api/wallpaper",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})
       });
      setDetails((cur)=>cur?.filter(i=>i._id!==id) || null)
    }
return (   
    <div className={`grid grid-cols-2 sm:grid-cols-4 w-full h-fit place-items-centergap-y-2 mt-2`}>
   {details?.map((v)=>(
    <div key={v._id}
    className={`flex flex-col justify-center items-center cursor-pointer`}>
    <Link href={v.photo}><img src={v.photo}
    className={`h-[120px] sm:h-[200px] rounded-lg`} /></Link>
    <button onClick={()=>{removingItems(v._id)}}
    className={`bg-[#c60000] text-sm sm:text-md text-white font-bold rounded-lg cursor-pointer mt-2`}>
      DELETE
    </button>
    </div>
   ))}   
</div>
)
}