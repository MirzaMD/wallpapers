import { Schema, model, models } from "mongoose";

const wallsSchema=new Schema({
    photo:{type:String,required:true},
    category:{type:String, required:true},
    artist:{type:String, required:false}
},
{
    timestamps:true,
    collection:"wallpapers"
})
const walls= models.walls || model("walls",wallsSchema);

export default walls