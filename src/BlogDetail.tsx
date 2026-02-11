import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeContext";
import { TimeAgo } from "./Home";

interface Blog {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isdark } = useTheme();

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

  const blog = data.find((blog:Blog) => blog.id === id);
  console.log(blog);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );

  if (!blog)
    return (
      <div className="text-center text-red-500 mt-20">
        Blog not found
      </div>
    );

  return (
    <div className={isdark ? "bg-zinc-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      <Navbar />
      <div className="max-w-4xl mx-auto p-10">
        <Link to="/all-posts" className="text-purple-500 hover:underline mb-4 block">
          ← Back to All Blogs
        </Link>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {blog.category} • {TimeAgo(blog.date)}
        </p>
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            onError={(e)=> e.currentTarget.src="default.av"}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        <p className={`font-bold text-2xl ${(isdark) ? "text-zinc-400" : "text-black"}`}>{blog.description}</p>
        <p className="mt-5 text-lg leading-relaxed whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
