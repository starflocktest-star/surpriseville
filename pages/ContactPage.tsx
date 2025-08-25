import React, { useEffect } from 'react';

const ContactPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        // In a real app, you would handle form submission here
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        We'd love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to share your experience, we're here to help.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-lg border">
                            <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
                                <a href="mailto:info@cherishx.com" className="text-primary hover:underline">info@cherishx.com</a>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
                                <a href="tel:+911234567890" className="text-primary hover:underline">+91 12345 67890</a>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
                                <p className="text-gray-600">123 Celebration Lane<br />New Delhi, 110001<br />India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
