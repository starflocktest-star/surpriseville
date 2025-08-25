import React, { useEffect } from 'react';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);


const CancellationPolicyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
                        Cancellation Policy
                    </h1>
                    <PolicySection title="General Cancellation">
                        <p>Orders can be cancelled up to 24 hours before the scheduled delivery or event time for a full refund. Refunds will be processed to the original payment method within 5-7 business days.</p>
                    </PolicySection>

                    <PolicySection title="Late Cancellation">
                        <p>Cancellations made within 24 hours of the scheduled event are not eligible for a refund. This is because our team will have already begun preparations, and resources will have been allocated for your booking.</p>
                    </PolicySection>

                    <PolicySection title="Customized Products">
                        <p>For products that involve personalization (e.g., custom name banners, photo mugs), cancellation is not possible once the production process has begun. Please contact our support team as soon as possible to inquire about the status of your custom order if you wish to cancel.</p>
                    </PolicySection>
                    
                    <PolicySection title="How to Cancel">
                        <p>To cancel an order, please contact our customer support team via email at <a href="mailto:info@cherishx.com" className="text-primary hover:underline">info@cherishx.com</a> or call us at <a href="tel:+911234567890" className="text-primary hover:underline">+91 12345 67890</a> with your order number.</p>
                    </PolicySection>
                </div>
            </div>
        </div>
    );
};

export default CancellationPolicyPage;
