import React, { useEffect } from 'react';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);

const TermsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
                        Terms of Use
                    </h1>
                    <PolicySection title="1. Acceptance of Terms">
                        <p>By accessing and using this website (the "Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this site.</p>
                    </PolicySection>

                    <PolicySection title="2. Use of the Website">
                        <p>This site and its components are offered for informational purposes only; this site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.</p>
                    </PolicySection>

                    <PolicySection title="3. User Accounts">
                        <p>To access some features of the website, you may have to create an account. You are responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.</p>
                    </PolicySection>
                    
                    <PolicySection title="4. Intellectual Property">
                        <p>The Site and its original content, features, and functionality are owned by Surprise Ville and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                    </PolicySection>

                    <PolicySection title="5. Limitation of Liability">
                        <p>In no event shall Surprise Ville, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </PolicySection>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;