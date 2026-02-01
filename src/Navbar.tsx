import { number } from "framer-motion";
import { Link } from "react-router-dom";

interface pos{
    x:number;
    y:number;
}
const Navbar=(props:pos)=>{
    return(
        <div className="w-full h-16 bg-white shadow flex justify-between items-center sticky top-0 z-10">
            <h1 className="px-20 text-2xl font-bold text-purple-600">GIRI_PRASAD</h1>
            <p>x:{props.x}, y:{props.y}</p>
            <div className="flex gap-20 mx-20">
                <Link to="/" className=" 
                text-gray-700 hover:text-purple-600 text-lg font-bold transition-transform hover:scale-110 inline-block ">Home</Link>
                <Link to="/create" className="
                text-gray-700 hover:text-purple-600 text-lg font-bold transition-transform hover:scale-110 inline-block ">Create</Link>
            </div>
        </div>
    )
}

export default Navbar;