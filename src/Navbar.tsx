import { number } from "framer-motion";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import { Sun,Moon } from "lucide-react";
import {useContext,useState} from "react"
import {useTheme} from "./ThemeContext.tsx"

interface pos{
    x:number;
    y:number;
}
const Navbar=()=>{
    const {isdark,setIsdark}=useTheme();
    return(
        <motion.div className={`w-full h-16 ${(isdark)?"bg-zinc-900 border-b-1 border-b-zinc-700":"bg-white"} shadow flex justify-between items-center sticky top-0 z-10`}
        initial={{y:-100}}
        animate={{y:0}}
        >
            <h1 className="px-20 text-2xl font-bold text-purple-600">GIRI_PRASAD</h1>
            {/* <p>x:{props.x}, y:{props.y}</p> */}
            <div className="flex gap-20 mx-20 items-center">
                {isdark ? <Sun className="text-white hover:text-black " onClick={()=>setIsdark(false)}/>:<Moon className="hover:fill-black" onClick={()=>setIsdark(true)}/>}
                <Link to="/" className={` 
                ${(isdark) ? "text-zinc-400" : "text-gray-700"} hover:text-purple-600 text-lg font-bold transition-transform hover:scale-110 inline-block `}>Home</Link>
                <Link to="/create"  className={` 
                ${(isdark) ? "text-zinc-400" : "text-gray-700"} hover:text-purple-600 text-lg font-bold transition-transform hover:scale-110 inline-block `}>Create</Link>
                <Link to="/blogview"  className={` 
                ${(isdark) ? "text-zinc-400" : "text-gray-700"} hover:text-purple-600 text-lg font-bold transition-transform hover:scale-110 inline-block `}>Blogview</Link>
            </div>
        </motion.div>
    )
}

export default Navbar;