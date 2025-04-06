"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
const passwordSchema=z.object({
    password:z.string().min(1,"enter the password")
          .refine((val)=>val.toLowerCase().trim()==="walls" || "del",{
            message:"invalid password"
          })
})
type TpasswordSchema=z.infer<typeof passwordSchema>
export default function LoginPage(){
    const route=useRouter();
    const[ password , setPassword ] = useState<string>('')
    const { register, handleSubmit, reset, formState:{errors}}=useForm({
        resolver:zodResolver(passwordSchema)
    })

   function logging(data:TpasswordSchema){
    reset();
    console.log(data)
    if(password==="walls")
        route.replace("/admin/addimage")
    else
    route.replace("/admin/existingImages")
   }

    return(
    <form onSubmit={handleSubmit(logging)}
    onDoubleClick={()=>{location.reload()}}
    className="absolute inset-0 m-auto rounded-4xl
    w-fit h-[400px] sm:h-[500px] flex flex-col justify-center items-center bg-[#ffffff33]">
     <div className="w-[300px] sm:w-[500px] h-[80%] flex flex-col justify-center items-center gap-y-10">
        <input 
        type="password"
         value={password}
        {...register("password")}
        onChange={(e)=>{setPassword(e.target.value)}}
        className={`bg-white rounded-sm w-[80%]`}
        placeholder="enter the password"
        ></input>
        {errors.password && (
            <p className="text-red-600 font-bold">{`${errors.password.message}`}</p>
        )}
        <div className={`w-[90%] flex justify-around items-center`}>
            <Link href="/"><button className="bg-[#008080] text-white rounded-lg p-1 font-bold text-sm sm:text-md">CANCEL</button></Link>
            <button type="submit"
            className="bg-[#008080] text-white rounded-lg p-1 font-bold text-sm sm:text-md">LOGIN</button>
        </div>
     </div>
    </form>)
}