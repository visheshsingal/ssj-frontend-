import React, { useState, useEffect } from "react";
import Category from "./category";
import SeoData from "../../SEO/SeoData";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import MinCategory from "../../components/MinCategory";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Experience premium sound quality with noise cancellation.",
    price: "$120",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
    feature: "40hr Battery",
  },
  {
    id: 2,
    name: "Bluetooth Earbuds",
    description: "Compact, stylish, and perfect for on-the-go listening.",
    price: "$80",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    feature: "IPX7 Waterproof",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    description: "Fill any room with rich, immersive sound.",
    price: "$65",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    feature: "360° Surround",
  },
  {
    id: 4,
    name: "Gaming Headset",
    description: "Crystal clear audio for an immersive gaming experience.",
    price: "$95",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    feature: "RGB Lighting",
  },
];

const testimonials = [
  {
    name: "Amit Sharma",
    text: "Best wholesale prices and super fast delivery. My go-to for electronics!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    text: "Loved the support and the quality of products. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Singh",
    text: "Huge variety and unbeatable deals. My business profits have grown!",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const banners = [
  "https://images.unsplash.com/photo-1581090700227-6b67f8ec3f1a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1612832021304-0f7de5b8e01c?auto=format&fit=crop&w=400&q=80",
];

const Home = () => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SeoData title="Premium Electronics Wholesale | Latest Tech & Bulk Deals" />
      <ScrollToTopOnRouteChange />
      <MinCategory />
      <div className="min-h-screen bg-white text-sky-900 font-sans overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-r from-blue-100 via-sky-50 to-blue-100 py-28 px-6">
  <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between bg-white/70 rounded-xl shadow-xl overflow-hidden animate-fadeInBanner relative">
    
    {/* Accent behind image */}
    <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-tr from-blue-200 via-blue-300 to-transparent rounded-full -z-10 opacity-60"></div>

    {/* Text */}
    <div className="md:pl-12 mt-10 md:mt-0 flex-1 relative">
      <div className="absolute left-0 top-8 w-20 h-2 bg-blue-400 skew-x-12 rounded-full opacity-70 -z-10"></div>
      <p className="text-blue-500 font-medium md:text-base pb-2">Limited Time Wholesale Offer</p>
      <h1 className="text-gray-800 font-semibold text-3xl md:text-5xl md:leading-tight max-w-lg">
        Stock High-Quality Wires and Chargers for Your Store!
      </h1>
      <div className="flex gap-4 mt-6">
        <button className="bg-blue-500 text-white rounded-full px-8 py-3 font-medium hover:scale-105 hover:shadow-lg transition-transform duration-300">
          Shop Now
        </button>
        <button className="border border-blue-500 text-blue-500 rounded-full px-6 py-3 font-medium hover:bg-blue-50 hover:shadow-md transition duration-300">
          Explore More
        </button>
      </div>
    </div>

    {/* Image */}
    <div className="flex justify-center flex-1 md:justify-end relative">
      <img
        className="w-72 md:w-96 rounded-3xl shadow-2xl object-cover"
        src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg"
        alt="Banner"
      />
    </div>
  </div>

  <style>{`
    @keyframes fadeInBanner {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInBanner {
      animation: fadeInBanner 1.5s ease-out forwards;
    }
  `}</style>
</section>


        {/* Features Section - Glassmorphism Cards */}
        <section className="py-24 px-6 bg-gradient-to-r from-sky-50 via-white to-sky-50">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-16">
    Why Businesses Choose Us
  </h2>

  <div className="flex flex-wrap justify-center items-end gap-12">
    {[
      {
        img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Bulk Orders",
        desc: "Save more with special pricing for businesses and resellers."
      },
      {
        img: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Warranty & Support",
        desc: "All products come with manufacturer warranty and 24/7 support."
      },
      {
        img: "https://images.pexels.com/photos/3184310/pexels-photo-3184310.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Express Shipping",
        desc: "Lightning-fast delivery across India with real-time tracking."
      },
    ].map((feature, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center text-center animate-float"
        style={{ animationDelay: `${idx * 0.3}s` }}
      >
        {/* Hand-drawn circle effect using clip-path */}
        <div className="w-40 h-40 md:w-48 md:h-48 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black/10 rounded-full clip-handmade"></div>
          <img
            src={feature.img}
            alt={feature.title}
            className="w-full h-full object-cover rounded-full clip-handmade"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-sky-700 mt-4">{feature.title}</h3>
        <p className="text-sky-600 text-sm md:text-base mt-1 max-w-xs">{feature.desc}</p>
      </div>
    ))}
  </div>

  <style>
    {`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-12px) rotate(2deg); }
      }
      .animate-float {
        animation: float 5s ease-in-out infinite;
      }

      /* Handmade circle clip-path */
      .clip-handmade {
        clip-path: polygon(
          50% 0%, 65% 5%, 80% 20%, 90% 40%, 85% 65%, 70% 80%,
          50% 85%, 30% 80%, 15% 65%, 10% 40%, 20% 20%, 35% 5%
        );
      }
    `}
  </style>
</section>


        {/* Products Section - Hover Zoom + 3D Tilt */}
        <section id="products" className="py-16 px-6 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-12 animate-slideUp">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-sky-100 shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 hover:rotate-3d transition-transform duration-300 perspective animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-xl mb-4 border-2 border-sky-200 hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold text-sky-800">{product.name}</h3>
                <p className="text-sky-600">{product.description}</p>
                <span className="mt-2 inline-block bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">{product.feature}</span>
                <span className="mt-2 text-lg font-bold text-sky-500">{product.price}</span>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300">Buy Wholesale</button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section - Banner + Text */}
        <section className="py-16 px-6 bg-white/90 relative overflow-hidden">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
    {/* Left Side - Text */}
    <div className="md:w-1/2 space-y-6 animate-slideUp">
      <h2 className="text-3xl md:text-4xl font-bold text-sky-700">About Our Company</h2>
      <p className="text-sky-700 text-lg">
        We provide top-quality electronics at wholesale prices with fast shipping, secure payments, and dedicated support.
      </p>
      <ul className="space-y-3 text-sky-600 font-medium">
        <li className="flex items-center gap-2"><span className="text-sky-500 text-xl">✓</span> Bulk Discounts</li>
        <li className="flex items-center gap-2"><span className="text-sky-500 text-xl">✓</span> Latest Tech Gadgets</li>
        <li className="flex items-center gap-2"><span className="text-sky-500 text-xl">✓</span> Fast & Secure Shipping</li>
        <li className="flex items-center gap-2"><span className="text-sky-500 text-xl">✓</span> Dedicated Support</li>
      </ul>
    </div>

    {/* Right Side - Slideshow Images */}
    <div className="md:w-1/2 flex justify-center relative">
      <div className="w-72 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-md shadow-xl relative">
        {[0,1,2].map((idx) => (
          <img
            key={idx}
            src={`https://images.pexels.com/photos/318446${idx+1}/pexels-photo-318446${idx+1}.jpeg?auto=compress&cs=tinysrgb&w=400`}
            alt={`About Image ${idx+1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === 0 ? 'opacity-100' : 'opacity-0'
            } slideImage-${idx}`}
          />
        ))}
      </div>
    </div>
  </div>

  {/* Slideshow Animation */}
  <style>
    {`
      .slideImage-0, .slideImage-1, .slideImage-2 {
        animation: slideshow 12s infinite;
      }
      .slideImage-0 { animation-delay: 0s; }
      .slideImage-1 { animation-delay: 4s; }
      .slideImage-2 { animation-delay: 8s; }

      @keyframes slideshow {
        0% { opacity: 0; }
        8% { opacity: 1; }
        33% { opacity: 1; }
        41% { opacity: 0; }
        100% { opacity: 0; }
      }
    `}
  </style>
</section>

        {/* Testimonials Section - Card Flip */}
        <section className="py-16 px-6 bg-gradient-to-br from-sky-50 via-white to-sky-50 relative overflow-hidden">
  <h2 className="text-3xl font-bold text-center text-sky-700 mb-12 animate-slideUp">
    What Our Customers Say
  </h2>

  <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
    {testimonials.map((t, idx) => (
      <div
        key={idx}
        className="w-64 h-64 rounded-full perspective group animate-fadeIn"
        style={{ animationDelay: `${0.2 * idx}s`, animationFillMode: "both" }}
      >
        <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 hover:scale-105">
          {/* Front */}
          <div className="absolute w-full h-full rounded-full backface-hidden bg-white border-2 border-sky-200 flex flex-col items-center justify-center shadow-xl p-6 animate-floatCard">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-3 border-2 border-sky-400"
            />
            <p className="text-sky-700 italic text-center">"{t.text}"</p>
          </div>
          {/* Back */}
          <div className="absolute w-full h-full rounded-full backface-hidden rotate-y-180 bg-sky-100 border-2 border-sky-200 flex items-center justify-center shadow-xl p-6">
            <h3 className="text-sky-700 font-bold text-lg text-center">{t.name}</h3>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Animations */}
  <style>
    {`
      .perspective {
        perspective: 1000px;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease forwards;
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      .animate-floatCard {
        animation: floatCard 4s ease-in-out infinite;
      }
      @keyframes floatCard {
        0%, 100% { transform: translateY(0);}
        50% { transform: translateY(-10px);}
      }
    `}
  </style>
</section>


        {/* Call To Action Section - Entrance Animation */}
        <section className="py-16 px-6 bg-gradient-to-r from-sky-200 via-blue-100 to-sky-50 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
  {/* Left Side - Text */}
  <div className="md:w-1/2 animate-slideUp z-10">
    <h3 className="text-3xl md:text-4xl font-bold text-sky-700 mb-4">
      Elevate Your Business with <span className="text-blue-500">Wholesale</span>
    </h3>
    <p className="text-sky-600 text-lg mb-6">
      Explore the latest tech gadgets with unbeatable prices, fast shipping, and a seamless wholesale experience.
    </p>
    <a
      href="#products"
      className="inline-block px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
    >
      Explore Products
    </a>
  </div>

  {/* Right Side - Circular 3D Product Preview */}
  <div className="md:w-1/2 flex justify-center items-center relative z-10">
    <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-dashed border-sky-300/50 flex items-center justify-center shadow-xl animate-bounce-slow relative overflow-hidden">
      {/* Hand-drawn effect using SVG */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="4 2" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Product Image */}
      <img
        src="https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Product"
        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-2xl transition-transform duration-500 hover:scale-110 animate-float"
      />
    </div>
  </div>

  {/* Background floating circles */}
  <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-200/30 animate-spin-slow blur-2xl"></div>
  <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-sky-300/20 animate-spin-slow-reverse blur-3xl"></div>

  {/* Animations */}
  <style>
    {`
      @keyframes float {
        0%, 100% { transform: translateY(0);}
        50% { transform: translateY(-20px);}
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0);}
        50% { transform: translateY(-10px);}
      }
      .animate-bounce-slow {
        animation: bounce-slow 8s ease-in-out infinite;
      }

      @keyframes spin-slow {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
      .animate-spin-slow {
        animation: spin-slow 40s linear infinite;
      }

      @keyframes spin-slow-reverse {
        0% { transform: rotate(360deg);}
        100% { transform: rotate(0deg);}
      }
      .animate-spin-slow-reverse {
        animation: spin-slow-reverse 50s linear infinite;
      }
    `}
  </style>
</section>


        {/* Custom Animations */}
        <style>
          {`
            .animate-fadeIn {
              animation: fadeIn 1s ease both;
            }
            .animate-slideUp {
              animation: slideUp 1s ease both;
            }
            .animate-slideIn {
              animation: slideIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradientMove 3s ease-in-out infinite;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: translateY(0);}
            }
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(80px);}
              to { opacity: 1; transform: translateX(0);}
            }
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .perspective {
              perspective: 1000px;
            }
            .transform-style-preserve-3d {
              transform-style: preserve-3d;
            }
            .backface-hidden {
              backface-visibility: hidden;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Home;
