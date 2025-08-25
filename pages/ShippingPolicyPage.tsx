import React, { useEffect } from 'react';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);

const ShippingPolicyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
                        Shipping & Delivery Policy
                    </h1>
                    <PolicySection title="Service Area">
                        <p>We currently offer our decoration services and gift delivery primarily within New Delhi and select areas in the NCR region. Please enter your pincode on the product page to check for service availability in your area.</p>
                    </PolicySection>

                    <PolicySection title="Delivery Time Slots">
                        <p>For decoration services, you can choose a specific time slot for our team to arrive. For gift deliveries, we offer several delivery options, including standard delivery (within 24 hours) and specific time slot delivery at an additional charge.</p>
                    </PolicySection>

                    <PolicySection title="Shipping Charges">
                        <p>Standard delivery is free for all orders above ₹1000. For orders below this amount, a nominal delivery fee will be applied. Charges for same-day delivery or specific time slot delivery will be calculated at checkout.</p>
                    </PolicySection>
                    
                    <PolicySection title="Order Tracking">
                        <p>Once your order is dispatched, you will receive an update via email or SMS with tracking information, where applicable. For decoration services, our team will coordinate with you directly on the day of the event.</p>
                    </PolicySection>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
