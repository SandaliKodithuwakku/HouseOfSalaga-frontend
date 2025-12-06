import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Add your contact form submission logic here
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/ds8hmsirb/image/upload/v1765038332/contact_us_plbhk4.jpg')"
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Get in Touch</h1>
          <p className="text-lg max-w-2xl mx-auto px-4">
            We'd love to hear from you! Reach out with any questions or feedback.
          </p>
        </div>
      </div>

      {/* Contact Icons Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:info@houseofsalaga.com"
              className="text-gray-600 hover:text-amber-800 transition-colors text-sm"
            >
              info@houseofsalaga.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <a
              href="tel:+94112223019"
              className="text-gray-600 hover:text-amber-800 transition-colors text-sm"
            >
              +94 11 222 3019
            </a>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 text-sm">
              Colombo 05, Sri Lanka
            </p>
          </div>
        </div>
      </div>

      {/* Send Message Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-amber-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-serif text-center text-gray-900 mb-3">
            Send us a Message
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Fill out the form below, and we'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name"
                {...register('firstName', {
                  required: 'First name is required',
                })}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />

              <input
                type="text"
                placeholder="Last Name"
                {...register('lastName', {
                  required: 'Last name is required',
                })}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            <input
              type="tel"
              placeholder="Phone Number (Optional)"
              {...register('phone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
            />

            <div className="relative">
              <select
                {...register('subject', {
                  required: 'Please select a subject',
                })}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white appearance-none ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="product">Product Question</option>
                <option value="order">Order Support</option>
                <option value="feedback">Feedback</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <textarea
              placeholder="Message"
              rows="5"
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              })}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 resize-none bg-white ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-800 text-white py-3 px-6 rounded-md hover:bg-amber-900 transition-colors font-medium disabled:bg-gray-400"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section - Business Hours and Quick Response */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="bg-amber-800 text-white rounded-lg p-8">
              <h3 className="text-2xl font-serif mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Public Holidays</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-amber-100">
                We're committed to responding to all inquiries as promptly as possible.
              </p>
            </div>

            {/* Quick Response */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-serif mb-4 text-gray-900">Quick Response</h3>
              <p className="text-gray-600 mb-4">
                Looking for fast answers? Our dedicated customer service team is available to assist
                you with any questions you may have.
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">For urgent matters</span>, please call us directly at{' '}
                <a href="tel:+94112223019" className="text-amber-800 hover:underline">
                  +94 11 222 3019
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">For general inquiries</span>, simply fill out the form
                above and we'll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;