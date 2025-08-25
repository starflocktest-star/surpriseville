import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
                        About Surprise Ville
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        Crafting unforgettable moments and turning your special occasions into cherished memories.
                    </p>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://picsum.photos/seed/aboutus/600/400"
                                alt="Team celebrating an event"
                                className="rounded-lg shadow-xl w-full h-auto object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl font-semibold text-primary mb-4">Our Mission</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At Surprise Ville, our mission is simple: to help people celebrate the most important moments of their lives with joy, creativity, and ease. We believe that every milestone, big or small, deserves to be honored in a unique and personal way.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We started with a passion for creating beautiful experiences and have grown into a dedicated team of planners, designers, and curators who are committed to delivering excellence. From romantic anniversary setups to grand birthday celebrations, we pour our hearts into every detail.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-semibold text-primary mb-4">Our Values</h2>
                        <div className="grid sm:grid-cols-3 gap-8 mt-8">
                            <div className="p-6 bg-secondary/30 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Creativity</h3>
                                <p className="text-gray-600">We constantly innovate to bring fresh and exciting ideas to your celebrations.</p>
                            </div>
                            <div className="p-6 bg-secondary/30 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
                                <p className="text-gray-600">We source the best products and work with trusted partners to ensure top-notch quality.</p>
                            </div>
                            <div className="p-6 bg-secondary/30 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Happiness</h3>
                                <p className="text-gray-600">Your satisfaction is our ultimate goal. We go the extra mile to make you smile.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutPage;