import { Button } from "./components/ui/button";
import { Card, CardHeader, CardDescription } from "./components/ui/card";
import { useState, useMemo } from "react";
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

export const TimeAgo = (dateString: string) => {
    const past = new Date(dateString).getTime();
    const now = Date.now();
    const diff = Math.floor((now - past) / 1000);

    const units = [
        { label: "year", value: 365 * 24 * 60 * 60 },
        { label: "month", value: 30 * 24 * 60 * 60 },
        { label: "week", value: 7 * 24 * 60 * 60 },
        { label: "day", value: 24 * 60 * 60 },
        { label: "hour", value: 60 * 60 },
        { label: "minute", value: 60 },
        { label: "second", value: 1 },
    ];

    for (const unit of units) {
        const amount = Math.floor(diff / unit.value);
        if (amount > 0) {
            return `${amount} ${unit.label}${amount > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
};
const Home = () => {
    const { isdark, setIsdark } = useTheme();
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const title = "Welcome to BLOG PAGE"
    const [selected, setSelected] = useState<number | null>(null);
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

    const sortedBlogs = useMemo(() => {
        return [...data].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0,7);
    }, [data]);

    const selectedBlog = data.find((blog: Blog) => blog.id === selected);

    if (isLoading) {
        return (<div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
        </div>)
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
                    {sortedBlogs.map((blog: any) => (
                        <motion.div
                            key={blog.id}
                            initial={{ x: 0 }}
                            whileHover={{ x: 50 }}
                            transition={{ type: "spring", duration: 0.5 }}
                        >
                            <Card onClick={() => setSelected(blog.id)} key={blog.id}
                                className={`${selected === blog.id ? "border-purple-500 border-2 bg-purple-50" : ""} ${(isdark) ? "bg-black  text-white hover:bg-zinc-700" : "bg-white hover:bg-purple-50"} focus:scale-90 mb-4  relative cursor-pointer shadow hover:border-purple-400 hover:shadow-lg transition-all ease-in-out duration-120 p-4`}
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
                {selected && selectedBlog ? (
                    <div className={`rounded-2xl w-full mt-20 border-1 mx-10 ${(isdark) ? "border-zinc-500 text-zinc-400 bg-zinc-800" : "bg-white border-gray-300"} flex flex-col gap-3 h-full`}>
                        <img className="object-cover h-130 w-full mb-5 rounded-t-2xl " onError={(e) => {
                            e.currentTarget.src = "default.avif";
                        }} src={selectedBlog.coverImage} alt={selectedBlog.title} />
                        <h1 className="px-10 text-4xl font-bold mb-5">{selectedBlog.title}</h1>
                        <div className="flex justify-between">
                            <p className="px-10 font-bold">{selectedBlog.category}</p>
                            <p className={`px-10 ${(isdark) ? " text-zinc-400" : "text-gray-700"} text-md mb-5`}>{TimeAgo(selectedBlog.date)}</p>
                        </div>
                        <div className="border-1 border-zinc-600"></div>
                        <p className={` px-10 mt-2 ${(isdark) ? "text-zinc-400" : "text-black"} font-semibold text-lg mb-2`}>{selectedBlog.description}</p>
                        <p className={`${(isdark) ? "text-gray-300" : "text-gray-700"} leading-relaxed px-15 text-xl mb-50`}>{selectedBlog.content}</p>
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