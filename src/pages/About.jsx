import { Sparkles, Leaf, Lightbulb } from 'lucide-react';

const About = () => {
  // Replace with your Cloudinary image URLs
  const heroBannerImage = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764836254/about_zrr7qm.png';
  const storyImage = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764836249/abt_us_our_story_oraccm.jpg';
  const teamMember1 = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764837068/team1_bubyuw.jpg';
  const teamMember2 = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764837625/about_team2_fmlfip.jpg';
  const teamMember3 = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764836949/about_team3_fggdsz.jpg';

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(101, 67, 33, 0.2), rgba(101, 67, 33, 0.2)), url(${heroBannerImage})`,
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">House of Salaga</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">
            Crafting timeless elegance since 2020
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-serif text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                House of Salaga is committed to delivering premium fashion that blends timeless elegance with contemporary design. Our pieces honor individuality and inspire. We curate a thoughtful line of exclusive collections that balance sophistication, comfort, and environmental consciousness, offering something meaningful for every wardrobe.
              </p>
              <p>
                Every garment in our collection is designed and crafted with an unwavering commitment to premium materials, ethical sourcing, and enduring style. We believe fashion should empower individuals while respecting the world we live in.
              </p>
            </div>
            <button className="mt-8 bg-amber-900 text-white px-8 py-3 hover:bg-amber-800 transition-colors duration-300">
              Discover More
            </button>
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <img 
              src={storyImage}
              alt="Our Story" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Premium Quality */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-amber-900" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are committed to sourcing only the finest materials to ensure every garment. Each piece delivers unparalleled comfort, durability, and elegance, promising a fashion experience that feels as exceptional as it looks.
              </p>
            </div>

            {/* Value 2: Sustainability */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-green-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our dedication to environmental responsibility is reflected in every aspect of our production process, from ethically sourced fabrics to eco-friendly packaging. We're committed to reducing our carbon footprint while creating beautiful, lasting pieces.
              </p>
            </div>

            {/* Value 3: Timeless Design */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-blue-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Timeless Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We blend classic style with modern trends to create pieces that transcend seasonal fads and remain relevant through the years. Our designs celebrate enduring beauty while embracing contemporary influences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
              <img 
                src={teamMember1}
                alt="Sofia Martinez" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Sofia Martinez</h3>
            <p className="text-gray-500 text-sm">Creative Director</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
              <img 
                src={teamMember2}
                alt="Emma Thompson" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Emma Thompson</h3>
            <p className="text-gray-500 text-sm">Head of Design</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
              <img 
                src={teamMember3}
                alt="James Chen" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">James Chen</h3>
            <p className="text-gray-500 text-sm">Sustainability Officer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;