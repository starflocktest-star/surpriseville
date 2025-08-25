import React, { useEffect, useState } from 'react';

const faqs = [
    {
        question: 'How do I place an order?',
        answer: 'You can place an order by browsing our products, selecting the one you like, customizing it if options are available, and adding it to your cart. Once you are ready, proceed to the cart page and click "Proceed to Checkout" to finalize your purchase.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, UPI, and various digital wallets. All payments are processed through a secure gateway to ensure your information is safe.',
    },
    {
        question: 'Can I customize a package?',
        answer: 'Absolutely! Many of our packages come with customization options for colors, names, messages, and even the quantity of certain items. Look for the "Customize Your Package" section on the product detail page.',
    },
    {
        question: 'What is your cancellation policy?',
        answer: 'You can find detailed information about our cancellation policy on our dedicated Cancellation Policy page. Generally, cancellations are accepted up to 24 hours before the scheduled event time.',
    },
    {
        question: 'How long does delivery take?',
        answer: 'Delivery times depend on the product and your location. For most decoration services, our team will arrive at a pre-scheduled time. For gift items, we offer various shipping options, including same-day delivery in select areas. Please check the Shipping Policy page for more details.',
    },
];

const FaqItem = ({ faq, isOpen, onClick }: { faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b">
            <button
                onClick={onClick}
                className="w-full text-left flex justify-between items-center py-4 focus:outline-none"
            >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pt-2 pb-4 text-gray-600">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
}


const FaqsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                           <FaqItem 
                                key={index} 
                                faq={faq} 
                                isOpen={openIndex === index} 
                                onClick={() => handleClick(index)}
                           />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqsPage;
