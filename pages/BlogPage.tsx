import React, { useEffect } from 'react';

const blogPosts = [
    {
        imageUrl: 'https://picsum.photos/seed/blog1/400/300',
        category: 'Anniversary',
        title: '5 Romantic Ideas for Your Next Anniversary',
        excerpt: 'Rekindle the romance with these unique and heartfelt anniversary celebration ideas that go beyond the usual dinner and a movie.',
    },
    {
        imageUrl: 'https://picsum.photos/seed/blog2/400/300',
        category: 'Birthday',
        title: 'How to Plan the Perfect Surprise Birthday Party',
        excerpt: 'From secret invitations to the big reveal, follow our step-by-step guide to pulling off a surprise party they\'ll never forget.',
    },
    {
        imageUrl: 'https://picsum.photos/seed/blog3/400/300',
        category: 'Decorations',
        title: 'DIY Decoration Tips for an At-Home Celebration',
        excerpt: 'Transform your space into a festive wonderland with these easy and budget-friendly DIY decoration hacks.',
    },
];

const BlogPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Our Blog
                    </h1>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Ideas, inspiration, and stories from the world of celebrations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <a href="#" className="font-semibold text-primary hover:underline">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
