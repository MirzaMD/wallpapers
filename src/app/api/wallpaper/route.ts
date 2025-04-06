import { dbconnect } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import walls from "@/app/model/walls";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req:Request){
    await dbconnect()
    const formStuff=await req.formData()
   
    const photo= formStuff.get("photo") as File
    const category = formStuff.get("category")
    const artist = formStuff.get("artist")

    const bytes=await photo.arrayBuffer()
    const buffer= Buffer.from(bytes)

    const base64Img=buffer.toString("base64")
    const datauri=`data:${photo.type};base64,${base64Img}`

    try{
        const uploadResults= await cloudinary.uploader.upload(datauri,{
            resource_type:"image"
        })
        const newEntry=new walls({photo:uploadResults.secure_url, category, artist})
        await newEntry.save();
        return NextResponse.json({message:"uploaded succesfully"},{ status:200});
    }
    catch{
        return NextResponse.json({error:"failed to upload"},{status:500});
    }
}

export async function GET(){
    await dbconnect();
    
    const stuff= await walls.find({})
    return NextResponse.json(stuff,{status:200})
}

export async function DELETE(req:Request){
       await dbconnect();

       const { id } = await req.json();

       if(!id)
         console.log("wrong id")
       await walls.findByIdAndDelete(id);
       
       return NextResponse.json({message:"deleted succesfully"}, { status: 202})
}
export const runtime = "nodejs";