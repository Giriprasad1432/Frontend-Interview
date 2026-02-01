import { useState } from "react";
import Navbar from "./Navbar";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Blog {
    title: string;
    category: string;
    description: string;
    coverImage: string;
    content: string;
    date: string;
}

const Create = () => {
    const [success, setSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: ""
    });
    const [blogdata, setBlogdata] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
        date: "",
    });

    const addBlog = (blog: Blog) => {
        fetch("http://localhost:3001/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.log(err))
    };

    const handleChange = (e: any) => {
        setBlogdata({
            ...blogdata,
            [e.target.name]: e.target.value
        });

        // clear error for current field
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let newErrors: any = {};
        if (!blogdata.title) newErrors.title = "title should not be empty";
        if (!blogdata.description) newErrors.description = "description should not be empty";
        if (!blogdata.content) newErrors.content = "content should not be empty";
        if (!blogdata.coverImage) newErrors.coverImage = "coverImage should not be empty";
        if (!blogdata.category) newErrors.category = "category should not be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            blogdata.date=new Date().toISOString();
            setBlogdata({...blogdata})
            addBlog(blogdata);
            alert("Blog Created successfully");
            setisLoading(true);
            setTimeout(() => {
                setisLoading(false);
                setErrors({
                    title: "",
                    category: "",
                    description: "",
                    coverImage: "",
                    content: ""
                });

                setBlogdata({
                    title: "",
                    category: "",
                    description: "",
                    coverImage: "",
                    content: "",
                    date: ""
                });
            }, 3000);
        }
    }

    return (
        <div>
            <Navbar  />
            <div className="flex flex-col justify-center items-center gap-10 bg-gray-100">
                <h1 className="text-4xl font-bold text-center mt-10">Create Blog Page</h1>
                <p className="text-gray-600">this is where you have to create blogs</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:w-[60vw] border-1 border-gray-200 rounded-2xl p-10 bg-white shadow mb-20 hover:shadow-xl transition-shadow">
                    <p className="text-center font-bold text-2xl text-gray-600">Blog Form</p>

                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold font-mono text-gray-600">Title:</p>
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        <input onChange={handleChange} value={blogdata.title} type="text" name="title" placeholder="Enter title" className="border-2 border-gray-200 rounded-lg p-3 text-lg" />
                    </div>

                    <div>
                        <p className="text-xl font-semibold font-mono text-gray-600">Category:</p>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                        <input onChange={handleChange} value={blogdata.category} type="text" name="category" placeholder="Enter category" className="border-2 border-gray-200 rounded-lg p-3 text-lg w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold font-mono text-gray-600">Description:</p>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        <input onChange={handleChange} value={blogdata.description} type="text" name="description" placeholder="Enter description" className="border-2 border-gray-200 rounded-lg p-3 text-lg" />
                    </div>

                    <div>
                        <p className="text-xl font-semibold font-mono text-gray-600">Cover Image URL:</p>
                        {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
                        <input onChange={handleChange} value={blogdata.coverImage} type="text" name="coverImage" placeholder="Enter cover image URL" className="border-2 border-gray-200 rounded-lg p-3 text-lg w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold font-mono text-gray-600">Content(in 500 words):</p>
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                        <textarea onChange={handleChange} value={blogdata.content} placeholder="Enter content" name="content" className="border-2 border-gray-200 rounded-lg p-3 text-lg h-40 resize-none" />
                    </div>

                    <button type="submit" className="bg-purple-600 text-white rounded-lg p-3 text-lg hover:bg-purple-700 transition-colors">
                        {isLoading ? "Creating..." : "Create Blog"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Create;
