import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is House of Salaga ?',
      answer: 'House of Salaga is a Sri Lankan-based online clothing store that offers a wide variety of stylish and trendy apparel for women. We are committed to providing high-quality fashion that suits your unique style and personality. Our collection includes dresses, tops, bottoms, and accessories that are perfect for any occasion.',
    },
    {
      question: 'How do I track my order ?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to monitor your shipment\'s progress through our website or the carrier\'s tracking portal. If you have any issues tracking your order, please contact our customer support team.',
    },
    {
      question: 'What is your return and exchange policy ?',
      answer: 'We accept returns and exchanges within 14 days of receiving your order. Items must be unused, unworn, and in their original packaging with all tags attached. To initiate a return or exchange, please contact our customer service team with your order number and reason for return. Refunds will be processed within 7-10 business days after we receive the returned item.',
    },
    {
      question: 'Do you have a physical store ?',
      answer: 'Currently, House of Salaga operates exclusively online. We do not have a physical retail location. However, we offer convenient online shopping with fast delivery across Sri Lanka. If you need assistance or have questions about our products, our customer service team is always ready to help via email or phone.',
    },
    {
      question: 'Do you offer gift wrapping ?',
      answer: 'Yes, we offer complimentary gift wrapping services for all orders. During checkout, you can select the gift wrapping option and include a personalized message. This service is perfect for birthdays, anniversaries, or any special occasion. Please note that gift-wrapped items may take an additional 1-2 business days to process.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/ds8hmsirb/image/upload/v1765039125/faq_pkk8g2.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Frequently Asked Questions</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Find answers to common questions about our products, shipping, returns & more
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-amber-800">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2">
                  <div className="bg-amber-50 p-4 rounded-md">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-amber-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>

        

    </div>
  );
};

export default FAQ;