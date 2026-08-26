import { useQuery } from "@tanstack/react-query";
import { getBlogsUrl } from "./lib/api";
import { CardHeader, CardDescription } from "./components/ui/card";
import { TimeAgo } from "./Home";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import Navbar from "./Navbar";
import React, { useMemo } from "react";

interface Blog {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  coverImage: string;
  content: string;
}


const BlogCard = React.memo(
  ({ blog, isdark }: { blog: Blog; isdark: boolean }) => {
    return (
      <Link to={`/blog/${blog.id}`} className="block">
        <div
          className={`
            ${isdark ? "bg-zinc-800" : "bg-white"}
            rounded-xl p-4 cursor-pointer
            transition-colors duration-200
            ${isdark ? "hover:bg-zinc-700" : "hover:bg-purple-50"}
          `}
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.18 }}
            className="transform-gpu will-change-transform"
          >
            <img
              src={blog.coverImage || "default.avif"}
              alt={blog.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "default.avif";
              }}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <CardHeader className="text-xl font-bold p-0 mb-2">
              {blog.title}
            </CardHeader>

            <CardDescription className="text-sm text-gray-400 mb-3 line-clamp-2">
              {blog.description}
            </CardDescription>

            <p className="text-xs text-gray-500">
              {blog.category} • {TimeAgo(blog.date)}
            </p>
          </motion.div>
        </div>
      </Link>
    );
  }
);

BlogCard.displayName = "BlogCard";

const AllPosts = () => {
  const { isdark } = useTheme();

  const fetchBlogs = async () => {
    const res = await fetch(getBlogsUrl());
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const sortedBlogs = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [data]);

  if (isLoading) {
        return (<div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
        </div>)
    }

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );

  return (
    <div className={`${(isdark) ? "bg-zinc-950 text-white" : "bg-gray-100"}`}>
      <Navbar />
      <div
        className={`${
          isdark ? "bg-zinc-900 text-white" : "bg-gray-100"
        } min-h-screen p-10`}
      >
        <h1 className="text-4xl font-bold mb-10 text-center">All Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isdark={isdark} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
