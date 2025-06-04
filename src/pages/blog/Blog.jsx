import React, { useState } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import blogsData from '../../json/blogs.json';
import images from '../../constants/images';

const Blog = () => {
    const [blogs] = useState(blogsData.blogs);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* NEWS Banner */}
            <div className="relative w-full h-[40vh] bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative text-center">
                    <h1 className="text-5xl font-light text-white tracking-wider">NEWS</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {blogs.map((blog) => (
                        <article key={blog.id} className="bg-white overflow-hidden group">
                            <div className="relative">
                                <img
                                    src={images.blog01}
                                    alt={blog.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black text-white px-3 py-1 text-sm uppercase tracking-wide">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-medium mb-3 hover:text-gray-600 cursor-pointer transition-colors">
                                    {blog.title}
                                </h2>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <FaUser size={12} />
                                        By {blog.author.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt size={12} />
                                        {formatDate(blog.publishedAt)}
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {blog.excerpt}
                                </p>

                                <button className="text-sm text-gray-800 hover:text-black font-medium uppercase tracking-wide">
                                    Continue Reading →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;