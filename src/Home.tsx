import { Button } from "./components/ui/button";
import { Card, CardHeader, CardDescription } from "./components/ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Blog{
    id:number,
    title:string,
    category:string,
    description:string,
    date:string,
    coverImage:string,
    content:string
}

const TimeAgo=(dateString:string)=>{
    const pastDate=new Date(dateString);
    const now=new Date();
    const diffsec=Math.floor((now.getTime()-pastDate.getTime())/1000);
    let diffmin=Math.floor(diffsec/60);
    let diffhour=Math.floor(diffmin/60);
    let diffday=Math.floor(diffhour/24);
    let diffweek=Math.floor(diffday/7);
    let diffmonth=Math.floor(diffday/30);
    let diffyear=Math.floor(diffday/365);
    let diffTime:string="";
    if(diffyear>0){
        diffTime=`${diffyear} year${diffyear>1?"s":""} ago`;
    }else if(diffmonth>0){
        diffTime=`${diffmonth} month${diffmonth>1?"s":""} ago`;
    }else if(diffweek>0){
        diffTime=`${diffweek} week${diffweek>1?"s":""} ago`;
    }else if(diffday>0){
        diffTime=`${diffday} day${diffday>1?"s":""} ago`;
    }else if(diffhour>0){
        diffTime=`${diffhour} hour${diffhour>1?"s":""} ago`;
    }else if(diffmin>0){
        diffTime=`${diffmin} minute${diffmin>1?"s":""} ago`;
    }else{
        diffTime=`${diffsec} second${diffsec>1?"s":""} ago`;
    }

    return diffTime;
}





const Home=()=>{
    const [selected,setSelected]=useState("");


    const fetchBlogs=async ()=>{
        const res=await fetch("http://localhost:3001/blogs");
        if(!res.ok){
            throw new Error("Network response was not ok");
        }
        return res.json();
    }
    
    const {data=[],isLoading,isError,error}=useQuery({
        queryKey:['blogs'],
        queryFn:fetchBlogs,
    });

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error: {error.message}</div>
    }
    
    return(
       <div className="flex bg-gray-100 ">
            <div className=" w-[30%] p-5 flex flex-col ">
                {data.map((blog:any)=>(
                    <Card onClick={()=>setSelected(blog.id)} key={blog.id}
                     className={`${selected===blog.id ? "border-purple-500 border-l-4  bg-purple-50":""} focus:scale-90 mb-4 hover:bg-purple-50 relative cursor-pointer shadow hover:border-purple-400 hover:border-l-4 hover:border-l-violet-500 hover:shadow-lg transition-all ease-in-out duration-120 p-4`}
                        >
                        <div className="flex flex-col">
                        <CardHeader className="text-center text-lg font-bold mt-5">{blog.title}</CardHeader>
                        <CardDescription className="text-sm text-center" >{blog.description}</CardDescription>
                        </div>
                        <p className="absolute right-2 top-3 text-xs text-gray-400">{TimeAgo(blog.date)}</p>
                        <p className="absolute left-2 top-3 text-gray-500 text-xs ">{blog.category}</p>
                    </Card>
                ))}
            </div>
            
                {selected ? (
                    <div className="rounded-2xl w-[70%] mt-20 border-1 mx-10 bg-white border-gray-300 flex flex-col gap-3">
                        <img className="object-contain w-full mb-5 rounded-t-2xl " src={data.find((blog:any)=>blog.id===selected).coverImage} alt={data.find((blog:any)=>blog.id===selected).title}/>
                        <h1 className="px-10 text-4xl font-bold mb-5">{data.find((blog:any)=>blog.id===selected).title}</h1>
                        <div className="flex justify-between">
                            <p className="px-10 font-bold">{data.find((blog:any)=>blog.id===selected).category}</p>
                            <p className="px-10 text-gray-700 text-md mb-5">{TimeAgo(data.find((blog:any)=>blog.id===selected).date)}</p>
                        </div>
                        <p className="px-10 mt-2 text-black font-semibold text-lg mb-2">{data.find((blog:any)=>blog.id===selected).description}</p>
                        <p className="text-gray-700 leading-relaxed px-15 text-xl">{data.find((blog:any)=>blog.id===selected).content}</p>
                    </div>
                ):
                (
                    <div className="flex items-center justify-center ">
                        <p className="text-gray-500 text-xl">Select a blog to read</p>
                    </div>
                )}
            </div>
    )
}

export default Home;