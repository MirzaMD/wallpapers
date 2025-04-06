import Link from "next/link"
export function Alter({setDot}:{setDot:(e:boolean)=>void}){
    return(
    <div className={`w-fit h-fit bg-[#ffffff19] text-white font-extrabold cursor-pointer flex flex-col mr-2 gap-y-1`}>
     <Link href={'/login'}><button className={`text-sm sm:text-md hover:bg-[white] hover:text-[#0d1d0d]`}>ALTER</button></Link>
     <button className={`text-sm sm:text-md hover:bg-[white] hover:text-[#0d1d0d]`}
     onClick={()=>setDot(true)}>CANCEL</button>
    </div>)
}