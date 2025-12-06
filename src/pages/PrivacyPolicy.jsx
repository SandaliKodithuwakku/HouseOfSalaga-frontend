import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/ds8hmsirb/image/upload/v1765039717/privacy_iqklfw.png')"
        }}
      >
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-3xl mx-auto">
            How we protect & manage your information
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-amber-50 rounded-lg p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Last Updated:</strong> December 1, 2025
          </p>
          <p className="text-gray-700 leading-relaxed">
            At House of Salaga, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us. By using our services, you consent to the practices described in this policy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="leading-relaxed">
                  When you place an order or register on our site, we may collect personal information such as your name, email address, phone number, shipping address, and payment details. This information is necessary to process your orders and provide customer service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Browsing Information</h3>
                <p className="leading-relaxed">
                  We automatically collect certain information when you visit our website, including your IP address, browser type, device information, and pages viewed. This helps us improve our website and understand how customers interact with our content.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cookies & Tracking</h3>
                <p className="leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and improve site functionality. You can disable cookies in your browser settings, but this may affect your ability to use certain features.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your purchases, including order confirmations and shipping updates</li>
                <li>To provide customer support and respond to your inquiries</li>
                <li>To send promotional emails about new products, special offers, or other information we think you may find interesting</li>
                <li>To improve our website and enhance user experience</li>
                <li>To detect and prevent fraud or unauthorized transactions</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              3. Data Security
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                We take the security of your personal information seriously. We use industry-standard encryption technologies and secure servers to protect your data from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              4. Sharing Your Information
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, or delivering products, provided they agree to keep your information confidential. We may also disclose your information when required by law or to protect our rights and safety.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Payment processors for secure transaction handling</li>
                <li>Shipping companies to deliver your orders</li>
                <li>Email service providers for sending communications</li>
                <li>Legal authorities if required by law or to prevent fraud</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              5. Your Rights
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access: You can request a copy of the personal data we hold about you</li>
                <li>Correction: You can ask us to correct any inaccurate or incomplete information</li>
                <li>Deletion: You can request that we delete your personal information, subject to legal obligations</li>
                <li>Opt-out: You can unsubscribe from marketing emails at any time by clicking the unsubscribe link</li>
                <li>Data Portability: You can request a copy of your data in a machine-readable format</li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              6. Legal Compliance
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                We comply with applicable data protection laws and regulations, including the General Data Protection Regulation (GDPR) for customers in the European Union and similar privacy laws in other jurisdictions. If you have any concerns about how we handle your data, you have the right to lodge a complaint with your local data protection authority.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              7. Changes to This Policy
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-l-4 border-amber-800 pl-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              8. Contact Us
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us at:
              </p>
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="font-semibold text-gray-900">House of Salaga</p>
                <p>Email: <a href="mailto:privacy@houseofsalaga.com" className="text-amber-800 hover:underline">privacy@houseofsalaga.com</a></p>
                <p>Phone: <a href="tel:+94112223019" className="text-amber-800 hover:underline">+94 11 222 3019</a></p>
                <p>Address: Colombo 05, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions CTA */}
        <div className="mt-16 bg-amber-800 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-serif mb-3">
            Questions about your privacy?
          </h3>
          <p className="mb-6 text-amber-50">
            Our team is here to answer any questions about how we handle and protect your personal information.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-amber-800 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default PrivacyPolicy;