import React from 'react';
import blogsData from '../../data/blogs.json';

const Blogs = () => {
    return (
        <section className="container w-full mx-auto  my-12">
            <h2 className="text-center font-bold text-2xl mb-4">
                Latest From Blog
            </h2>
            <p className="text-center mb-8">
                Elevate your wardrobe with our freshest style tips, trends, and
                inspiration on our blog
            </p>
            <div className="grid w-full justify-between  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogsData.map(blog => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h6 className="text-sm text-gray-500">
                                {blog.subtitle}
                            </h6>
                            <h4 className="text-lg font-semibold mb-2">
                                {blog.title}
                            </h4>
                            <p className="text-gray-400 text-sm">{blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
