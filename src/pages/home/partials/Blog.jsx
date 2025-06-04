import React from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import blogsData from '../../../json/blogs.json';
import images from '../../../constants/images';

const Blog = () => {
    const featuredBlogs = blogsData.blogs.slice(0, 3); // Show first 3 blog posts

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const BlogCard = ({ blog }) => {
        return (
            <article className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6">
                    <img
                        src={images.blog01} // Using placeholder from your constants
                        alt={blog.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-medium leading-tight group-hover:text-red-500 transition-colors duration-200 line-clamp-2">
                        {blog.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <span>by</span>
                            <span className="text-gray-700">{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>on</span>
                            <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {blog.excerpt}
                    </p>
                </div>
            </article>
        );
    };

    return (
        <div className="w-full py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light tracking-wider uppercase">Our Blog</h2>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="bg-transparent border border-black text-black px-8 py-3 font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300 uppercase text-sm">
                        View All Articles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;