"use client"
import { z } from "zod"
import { useState,useRef } from "react"
import { FaUpload } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const uploadSchema=z.object({
   photo: z
   .any()
   .refine((file) => file?.length > 0, "Image is required"),
   category:z.string(),
   name:z.string().optional()
})
type TuploadSchema= z.infer<typeof uploadSchema>
export default function AddItemsPage(){
   const [ catg, setCatg ] = useState<string>("")
   const [ by, setBy ] = useState<string>("Anonymous")
   const route=useRouter()
 const imgRef=useRef<HTMLInputElement>(null)   
const { register, reset, handleSubmit, formState:{errors,isSubmitting},setValue} = useForm({
   resolver:zodResolver(uploadSchema)
})
  
 async function uploading(data: TuploadSchema) {
   const formdata = new FormData();
   formdata.append("photo", data.photo[0]); 
   formdata.append("category", data.category);
   formdata.append("artist", data.name || "Anonymous");
 

    await fetch("/api/wallpaper", {
     method: "POST",
     body: formdata,
     });
 
   reset();
 }
 
 return(
    <form onSubmit={handleSubmit(uploading)} 
    className="w-full h-full">
      <div 
      className={`bg-[#a728a722] text-white
      w-full h-[45px] flex justify-center items-center text-lg sm:text-2xl font-[cursive]`}>
         UPLOAD THE WALLPAPER
         </div>
     <div className="flex flex-col justify-center items-center mt-4">
<input
  type="file"
  hidden
  {...register("photo")} 
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("photo", e.target.files, { shouldValidate: true });
    }
  }}
  ref={imgRef}
/>
 <FaUpload id="uploader" onClick={()=>imgRef.current?.click()}
         className={`text-4xl sm:text-8xl text-[#a728a789]`}/>
         {errors.photo && (
            <p className="text-red-500">{`${errors.photo.message}`}</p>
         )}
      <label className={`text-lg sm:text-2xl font-[cursive] text-[whitesmoke]`}>Upload your wallpaper</label>
     </div>
     <div className="flex justify-center items-center mt-6 gap-x-2">
     <label htmlFor="dropdown"
     className="cursor-pointer text-lg sm:text-2xl font-[cursive] text-[whitesmoke]">Select the category:</label>
     <select id="dropdown" {...register("category")} onChange={(e)=>setCatg(e.target.value)}
     className="p-2 rounded-md outline-none focus:bg-[#a728a7dd] cursor-pointer
      bg-[#a728a751] sm:text-sm sm:text-md font-[cursive] focus:text-[whitesmoke]
      text-[#ffeaff] text-[0.5rem] w-[60px] sm:w-[100px]">
        <option value="NATURE">NATURE</option>
        <option value="ANIMATION">ANIMATION</option>
        <option value="OTHER">OTHER</option>
     </select>
     </div>
     <div className={`flex justify-center items-center mt-4 gap-x-2`}>
     <label className="text-lg sm:text-2xl font-[cursive] text-[whitesmoke]">Courtesy of:</label>
     <input {...register("name")} onChange={(e)=>setBy(e.target.value)}
      type="text" placeholder="enter the your name"
     className="border-2 w-[50%] sm:w-[30%] rounded-lg border-[#a728a789] text-white"/>
     </div>
     <div className="flex justify-evenly items-center mt-7">
       <button className={`bg-[#a728a722] text-[whitesmoke] 
      font-[cursive] rounded-md text-md sm:text-lg active:bg-[#a728a790]
      cursor-pointer`}
      onClick={(e)=>{
         e.preventDefault()
         route.replace("/")}}>CANCEL</button>
        <button className={`bg-[#a728a722] text-[whitesmoke] 
      font-[cursive] rounded-md text-md sm:text-lg active:bg-[#a728a78e]
      cursor-pointer ${isSubmitting?"disabled cursor-wait bg-[#443f3f92]":null}`}> {isSubmitting?"uploading...":"upload"}
      </button>
     </div>
    </form>)
}