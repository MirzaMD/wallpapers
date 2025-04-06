import { More } from "./more";

export function HomeHeader(){
    return(
    <div className={`w-full h-[120px] 
    bg-[#ffffff26]
    flex flex-col justify-center items-center `}>
     <h1 className={`text-lg sm:text-xl text-[#f5f5f58d] font-extrabold font-serif`}>Refined wallpapers</h1>
     <More/>
     <p  className={`text-sm sm:text-md text-[whitesmoke] font-extralight`}><i>elavate your aesthetics...🐱</i></p>
    </div>)
}