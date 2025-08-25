import React, { useEffect } from 'react';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);

const PrivacyPolicyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
                        Privacy Policy
                    </h1>
                    <PolicySection title="1. Information We Collect">
                        <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service. This may include your name, email address, phone number, shipping address, and payment information.</p>
                        <p>We also automatically collect certain information when you visit our site, such as your IP address, browser type, and browsing behavior.</p>
                    </PolicySection>

                    <PolicySection title="2. How We Use Your Information">
                        <p>We use the information we collect to process your orders, communicate with you, personalize your shopping experience, and improve our services. We may also use your information for marketing purposes, but you can opt out at any time.</p>
                    </PolicySection>

                    <PolicySection title="3. Data Security">
                        <p>We take the security of your personal information seriously. We implement a variety of security measures to maintain the safety of your data, including encryption and secure server hosting. However, no method of transmission over the Internet is 100% secure.</p>
                    </PolicySection>
                    
                     <PolicySection title="4. Cookies">
                        <p>Our website uses "cookies" to enhance your experience. A cookie is a small file placed on your device. You can choose to disable cookies through your browser settings, but this may affect the functionality of the site.</p>
                    </PolicySection>

                    <PolicySection title="5. Changes to This Policy">
                        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically for any changes.</p>
                    </PolicySection>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
