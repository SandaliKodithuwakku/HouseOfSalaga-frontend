import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [email, setEmail] = useState('');

  // Replace with your Cloudinary image URLs
  const heroBannerImage = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764921877/blogs_y7cdt7.jpg';

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764921983/blog1_mtzjz4.jpg',
      category: 'TRENDS',
      title: 'Top 10 Pieces That Define Elegance',
      excerpt: 'Discover the essential wardrobe staples that embody timeless elegance and sophistication.',
      date: '12 Dec, 2024',
      author: 'Sarah Mitchell',
      readTime: '5 min read'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764922110/blog2_pnmmxa.jpg',
      category: 'SUSTAINABILITY',
      title: 'Sustainable Luxury: Our Commitment',
      excerpt: 'Learn about our dedication to sustainable practices and ethical fashion production.',
      date: '10 Dec, 2024',
      author: 'Emma Green',
      readTime: '7 min read'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764922110/blog3_hl8wyk.jpg',
      category: 'INSPIRATION',
      title: 'Watching Our Style Design',
      excerpt: 'Behind the scenes of our creative process and design philosophy.',
      date: '08 Dec, 2024',
      author: 'James Chen',
      readTime: '6 min read'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764922111/blog4_gqolil.jpg',
      category: 'TRENDS',
      title: 'Summer Collection - Autumn Collection',
      excerpt: 'A stunning look at our seasonal transitions and versatile pieces for every occasion.',
      date: '05 Dec, 2024',
      author: 'Sofia Martinez',
      readTime: '4 min read'
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764922320/blog5_operal.jpg',
      category: 'SUSTAINABILITY',
      title: 'Sustainable Dressing: Quality Over Quantity',
      excerpt: 'Why investing in quality pieces is better for your wardrobe and the environment.',
      date: '02 Dec, 2024',
      author: 'Emma Green',
      readTime: '8 min read'
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764922111/blog6_o5uxaq.jpg',
      category: 'TRENDS',
      title: 'The Art of Minimalist Fashion',
      excerpt: 'Embrace simplicity with our guide to building a minimalist wardrobe.',
      date: '28 Nov, 2024',
      author: 'Michael Ross',
      readTime: '5 min read'
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 107, 71, 0.4), rgba(139, 107, 71, 0.4)), url(${heroBannerImage})`,
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 drop-shadow-lg">
            Fashion Stories & Inspiration
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide drop-shadow-md max-w-2xl mx-auto">
            Explore styling tips, design insights & life stories behind our most beloved pieces.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-900 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-amber-900 font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-amber-100 to-amber-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest articles, tips, and exclusive promotions delivered to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-amber-900 text-white px-8 py-3 rounded-md hover:bg-amber-800 transition-colors duration-300 font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;