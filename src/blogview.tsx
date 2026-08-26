import { useQuery } from "@tanstack/react-query";
import { getBlogsUrl } from "./lib/api";
import { useState } from "react"
import { ArrowLeft, ArrowRight} from 'lucide-react';
import { motion,AnimatePresence } from "framer-motion"
import {Link} from "react-router-dom"


const Blogview = ({...props}) => {
    const [[post, direction], setPost] = useState([0, 0])
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };
    
    const fetchBlogs = async () => {
        const res = await fetch(getBlogsUrl());
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    }

    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    if (isLoading) {
        return (<div className="text-center text-4xl">Loading...</div>)
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const handlePostleft = () => {
        if (post > 0)
            setPost(([n]) => [n - 1, -1])
        console.log(post)
    }
    const handlePostright = () => {
        if (post < data.length - 1)
            setPost(([n]) => [n + 1,1])
        console.log(post)
    }
    console.log("post=" + (post + 1))
    
    if (!data.length) return null;


    return (
        <div className="flex justify-center  bg-black h-screen relative overflow-hidden">
            <button onClick={handlePostleft} className="z-10 absolute text-white p-2 hover:bg-gray-600 active:bg-gray-300 rounded-full left-10 top-1/2 hover:text-black"><ArrowLeft /></button>
            <Link to="/" onClick={()=>props.setShow(false)}  className="z-10 font-bold absolute text-white p-2 hover:text-gray-600 active:text-gray-300 rounded-full right-20 top-5 hover:text-black">Home</Link>
            {(post > 0) && <div className="absolute top-1/2 left-1/10 -translate-x-1/10 -translate-y-1/2 border-gray-800 border-1 rounded-2xl w-[20%] h-80">
                <img className="object-cover w-full h-full" src={data[post - 1].coverImage}></img>
            </div>}
            <div className="absolute w-screen h-screen bg-black opacity-70 z-3"></div>
            <AnimatePresence custom={direction} >
            <motion.div className="inset-0 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-150 border-gray-800 border-1 rounded-2xl w-[30%]"
                key={post}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, type:"spring",stiffness:60, ease: "easeInOut" }}
            >
                <img className="object-cover w-full h-full" src={data[post].coverImage}></img>
            </motion.div>
            </AnimatePresence>
            {(post < data.length - 1) && <div className="absolute top-1/2 left-9/10 -translate-x-9/10 -translate-y-1/2 border-gray-800 border-1 rounded-2xl w-[20%] h-80">
                <img className="object-cover w-full h-full" src={data[post + 1].coverImage}></img>
            </div>}
            <button onClick={handlePostright} className="z-10 absolute text-white p-2 hover:bg-gray-600 active:bg-gray-300 rounded-full right-10 top-1/2 hover:text-black"><ArrowRight /></button>
        </div>
    )
}

export default Blogview