"use client"
import { HomeHeader } from "@/components/homeHeader";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
type detailsType={
  _id:string,
  photo:string,
  category:string,
  artist:string
}
export default function Home() {
  const [ details, setDetails ] = useState<detailsType[]|null>(null);

  const gettingDetails=useCallback(async ()=>{
    const response=await fetch("/api/wallpaper")
      if(!response.ok)
        throw new Error("Couldn't fetch!!!")
      const data=await response.json()
      setDetails(data);
  },[])
  useEffect(()=>{
    gettingDetails();
  },[gettingDetails])
  return (
 <div className="w-full h-full">
   <HomeHeader/>
   <div className={`grid grid-cols-2 sm:grid-cols-4 w-full h-fit place-items-center mt-2 gap-y-2`}>
   
   {details?.map((v)=>(
    <div key={v._id}
    className={`flex flex-col justify-center items-center cursor-pointer`}>
    <Link href={v.photo}><img src={v.photo} alt={`image uploaded by ${v.artist}`}
    className={`h-[120px] sm:h-[200px] rounded-lg`} /></Link>
    <a href={`/api/download?url=${encodeURIComponent(v.photo)}`}>
  <button className="bg-[#b25a5a54] text-sm sm:text-md text-white font-bold rounded-lg cursor-pointer">
    DOWNLOAD
  </button>
</a>

    </div>
   ))}  
 
</div>
 </div>
  );
}
