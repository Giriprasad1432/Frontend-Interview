import { Button } from "./components/ui/button";
import { Card, CardHeader, CardDescription } from "./components/ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { motion } from "framer-motion"
import { useTheme } from "./ThemeContext.tsx"

interface Blog {
    id: number,
    title: string,
    category: string,
    description: string,
    date: string,
    coverImage: string,
    content: string
}

const TimeAgo = (dateString: string) => {
    const pastDate = new Date(dateString);
    const now = new Date();
    const diffsec = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
    let diffmin = Math.floor(diffsec / 60);
    let diffhour = Math.floor(diffmin / 60);
    let diffday = Math.floor(diffhour / 24);
    let diffweek = Math.floor(diffday / 7);
    let diffmonth = Math.floor(diffday / 30);
    let diffyear = Math.floor(diffday / 365);
    let diffTime: string = "";
    if (diffyear > 0) {
        diffTime = `${diffyear} year${diffyear > 1 ? "s" : ""} ago`;
    } else if (diffmonth > 0) {
        diffTime = `${diffmonth} month${diffmonth > 1 ? "s" : ""} ago`;
    } else if (diffweek > 0) {
        diffTime = `${diffweek} week${diffweek > 1 ? "s" : ""} ago`;
    } else if (diffday > 0) {
        diffTime = `${diffday} day${diffday > 1 ? "s" : ""} ago`;
    } else if (diffhour > 0) {
        diffTime = `${diffhour} hour${diffhour > 1 ? "s" : ""} ago`;
    } else if (diffmin > 0) {
        diffTime = `${diffmin} minute${diffmin > 1 ? "s" : ""} ago`;
    } else {
        diffTime = `${diffsec} second${diffsec > 1 ? "s" : ""} ago`;
    }

    return diffTime;
}
const Home = () => {
    const { isdark, setIsdark } = useTheme();
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const title = "Welcome to BLOG PAGE"
    const [selected, setSelected] = useState("");
    const fetchBlogs = async () => {
        const res = await fetch("http://localhost:3001/blogs");
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

    return (
        <div onPointerMove={(e) => { setPos({ x: e.clientX, y: e.clientY }) }} className={`${(isdark) ? "bg-zinc-800" : ""}`}>
            <div className={`fixed ${(isdark) ? "bg-[radial-gradient(circle,rgba(255,255,255,0.6),transparent_70%)] " : "bg-[radial-gradient(circle,rgba(18,17,17,0.68),transparent_70%)]"}
                 rounded-full size-30 blur-2xl  pointer-events-none `}
                style={{
                    left: pos.x,
                    top: pos.y,
                    "--x": `${pos.x}px`,
                    "--y": `${pos.y}px`,
                    transform: "translate(-50%, -50%)"
                } as React.CSSProperties}></div>
            <Navbar />
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.4, type: "spring" }} className={`${(isdark) ? "text-white" : ""} whitespace-pre text-4xl justify-center flex font-bold text-center mt-10 mb-3`}>
                {[...title].map((a, i) => (<motion.div key={i} whileHover={{ y: -10 }} >{a}</motion.div>))}
            </motion.div>
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1, type: "spring" }} className={`${(isdark) ? "text-white" : ""} whitespace-pre font-medium justify-center flex text-center mb-3 `}>{[..."Stay tuned"].map((a, i) => (<motion.div key={i} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>{a}</motion.div>))}</motion.div>
            <div className={`flex ${(isdark) ? "bg-zinc-900 border-t-zinc-700" : "bg-gray-100"}`}>
                <div className=" w-[30%] p-5 flex flex-col ">
                    <h1 className={`${(isdark) ? "text-white" : ""} mb-2 font-bold text-2xl`}>Latest Blogs</h1>
                    {[...data]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((blog: any) => (
                            <motion.div
                                key={blog.id}
                                initial={{ x: 0 }}
                                whileHover={{ x: 50 }}
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                <Card onClick={() => setSelected(blog.id)} key={blog.id}
                                    className={`${selected === blog.id ? "border-purple-500 border-2 bg-purple-50" : ""} ${(isdark) ? "bg-black text-white hover:bg-zinc-700" : "bg-white hover:bg-purple-50"} focus:scale-90 mb-4  relative cursor-pointer shadow hover:border-purple-400 hover:shadow-lg transition-all ease-in-out duration-120 p-4`}
                                >
                                    <div className="flex flex-col">
                                        <CardHeader className="text-center text-lg font-bold mt-5">{blog.title}</CardHeader>
                                        <CardDescription className="text-sm text-center" >{blog.description}</CardDescription>
                                    </div>
                                    <p className="absolute right-2 top-3 text-xs text-gray-400">{TimeAgo(blog.date)}</p>
                                    <p className="absolute left-2 top-3 text-gray-500 text-xs ">{blog.category}</p>
                                </Card>
                            </motion.div>
                        ))}

                </div>
                {selected ? (
                    <div className={`rounded-2xl w-full mt-20 border-1 mx-10 ${(isdark) ? "border-zinc-500 text-zinc-400 bg-zinc-800" : "bg-white border-gray-300"} flex flex-col gap-3 h-full`}>
                        <img className="object-cover h-130 w-full mb-5 rounded-t-2xl " src={data.find((blog: any) => blog.id === selected).coverImage} alt={data.find((blog: any) => blog.id === selected).title} />
                        <h1 className="px-10 text-4xl font-bold mb-5">{data.find((blog: any) => blog.id === selected).title}</h1>
                        <div className="flex justify-between">
                            <p className="px-10 font-bold">{data.find((blog: any) => blog.id === selected).category}</p>
                            <p className={`px-10 ${(isdark) ? " text-zinc-400" : "text-gray-700"} text-md mb-5`}>{TimeAgo(data.find((blog: any) => blog.id === selected).date)}</p>
                        </div>
                        <div className="border-1 border-zinc-600"></div>
                        <p className={` px-10 mt-2 ${(isdark) ? "text-zinc-400" : "text-black"} font-semibold text-lg mb-2`}>{data.find((blog: any) => blog.id === selected).description}</p>
                        <p className={`${(isdark) ? "text-gray-300" : "text-gray-700"} leading-relaxed px-15 text-xl mb-50`}>{data.find((blog: any) => blog.id === selected).content}</p>
                    </div>
                ) :
                    (
                        <div className="w-full text-center mt-40">
                            <h1 className="text-gray-500 text-4xl px-80">Select a blog to read</h1>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Home;