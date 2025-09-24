import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Mock ProductCard component (replace with actual ProductCard)
const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">{product.description}</p>
  </div>
);

// Mock assets (replace with actual image paths or imports)
const assets = {
  header_headphone_image: "https://images-cdn.ubuy.co.in/66cb15b29c6bb53bf6591ff4-maho-beats-headphones-wireless-bluetooth.jpg",
  header_playstation_image: "https://4kwallpapers.com/images/wallpapers/playstation-5-pro-1920x1080-19032.jpg",
  header_macbook_image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23759755/bfarsace_190101_5333_0002.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400",
  arrow_icon: "",
};

// Mock products data (replace with actual data from context or API)
const mockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    image: "https://i.pinimg.com/736x/e2/7c/89/e27c89722b03c92d0e2fef16fbc29863.jpg",
  },
  {
    id: 2,
    name: "USB-C Charger",
    description: "Fast-charging USB-C cable for smartphones",
    image: "https://chargingcable.in/cdn/shop/files/1_b5035f15-621e-49aa-843d-ae9ea35a5402_1.jpg?v=1748060807&width=1080",
  },
  {
    id: 3,
    name: "Car Bluetooth",
    description: "Bluetooth device for car audio systems",
    image: "https://www.jiomart.com/images/product/original/rvhadyiwd4/crust-cs30-car-bluetooth-device-with-call-receiver-fm-transmitter-for-music-system-dual-usb-type-c-fast-charger-7-colour-led-lights-6-equalizer-presets-usb-mp3-audio-playback-voice-assistant-legal-images-orvhadyiwd4-p601894899-3-202305271549.jpg?im=Resize=(420,420)",
  },
];

// Use cases data for FlowDiagram
const useCases = [
  {
    id: 1,
    title: "Mobile Shops",
    description: "Bulk mobile accessories for retail shops",
    icon: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Bike Accessories Retailers",
    description: "Wires, stands, and hands-free devices for bike shops",
    icon: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?cs=srgb&dl=pexels-nicholas-dias-1119542-2116475.jpg&fm=jpg",
  },
  {
    id: 3,
    title: "Office Supplies",
    description: "Bulk keyboards, mice, and chargers for office setups",
    icon: "https://images.pexels.com/photos/265072/pexels-photo-265072.jpeg?cs=srgb&dl=pexels-pixabay-265072.jpg&fm=jpg",
  },
  {
    id: 4,
    title: "E-commerce Sellers",
    description: "Ready-to-ship accessories for online stores",
    icon: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

const HomePage = ({ searchKeyword = "" }) => {
  const navigate = useNavigate();

  // Slider state and logic
  const sliderData = [
    {
      id: 1,
      title: "Stock High-Quality Wires and Chargers for Your Store!",
      offer: "Limited Time Wholesale Offer",
      buttonText1: "Shop Now",
      buttonText2: "Explore More",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Upgrade Your Accessories Inventory with Earbuds & Headsets!",
      offer: "Bulk Deals Available",
      buttonText1: "Order Now",
      buttonText2: "View Collection",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Get Essential Office & Gaming Accessories in Bulk Today!",
      offer: "Exclusive Wholesale Discounts",
      buttonText1: "Buy in Bulk",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Handsfree",
      image: "https://www.geeky-gadgets.com/wp-content/uploads/2014/05/earpods.jpg",
    },
    {
      id: 2,
      name: "Earbuds",
      image: "https://i.pinimg.com/736x/e2/7c/89/e27c89722b03c92d0e2fef16fbc29863.jpg",
    },
    {
      id: 3,
      name: "Mix Items",
      image: "https://img.freepik.com/free-photo/close-up-artist-making-music_23-2149199987.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 4,
      name: "Car Bluetooth",
      image: "https://www.jiomart.com/images/product/original/rvhadyiwd4/crust-cs30-car-bluetooth-device-with-call-receiver-fm-transmitter-for-music-system-dual-usb-type-c-fast-charger-7-colour-led-lights-6-equalizer-presets-usb-mp3-audio-playback-voice-assistant-legal-images-orvhadyiwd4-p601894899-3-202305271549.jpg?im=Resize=(420,420)",
    },
    {
      id: 5,
      name: "OTG Cables",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZ6SuUmqu0wa4nB7KHsI9Al7eh3RvMkJHog&s",
    },
    {
      id: 6,
      name: "Car Chargers",
      image: "https://images.philips.com/is/image/philipsconsumer/0b370bab54c442dfa0bdb0c100abfa7a?$pnglarge$&wid=1250",
    },
    {
      id: 7,
      name: "Cables and Chargers",
      image: "https://chargingcable.in/cdn/shop/files/1_b5035f15-621e-49aa-843d-ae9ea35a5402_1.jpg?v=1748060807&width=1080",
    },
    {
      id: 8,
      name: "Battery",
      image: "https://www.popsci.com/wp-content/uploads/2020/03/23/hands-holding-phone-with-dead-battery-advisory.jpg?quality=85",
    },
    {
      id: 9,
      name: "Selfie Sticks",
      image: "https://cdn.sanity.io/images/3azemr64/production/0af7b94e8cea2b42968c16720a3ab9011c2d3f58-1024x768.jpg?auto=format&w=873&h=655&crop=center&fit=crop&q=90",
    },
    {
      id: 10,
      name: "Car and Bike Stand",
      image: "https://holdfast.co.za/wp-content/uploads/2024/11/Versa-Bike-Stand_Holdfast_Oct24_Boulle_1.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-products?category=${encodeURIComponent(categoryName)}`);
  };

  // Filter products based on searchKeyword
  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="w-full pt-16">
      {/* Header Slider Section */}
      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            >
              <div className="md:pl-8 mt-10 md:mt-0">
                <p className="md:text-base text-[#54B1CE] pb-1 font-medium">{slide.offer}</p>
                <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold text-gray-800">
                  {slide.title}
                </h1>
                <div className="flex items-center mt-4 md:mt-6 gap-4">
                  <button
                    onClick={() => navigate("/all-products")}
                    className="md:px-10 px-7 md:py-2.5 py-2 bg-[#54B1CE] rounded-full text-white font-medium hover:bg-[#3a9cb8] transition-colors"
                  >
                    {slide.buttonText1}
                  </button>
                  <button
                    onClick={() => navigate("/all-products")}
                    className="group flex items-center gap-2 px-6 py-2.5 font-medium text-[#54B1CE] border border-[#54B1CE] rounded-full hover:bg-[#54B1CE] hover:text-white transition-colors"
                  >
                    {slide.buttonText2}
                    <img
                      className="group-hover:translate-x-1 transition"
                      src={assets.arrow_icon}
                      alt="arrow_icon"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-center">
                <img
                  className="md:w-72 w-48"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {sliderData.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentSlide === index ? "bg-[#54B1CE]" : "bg-gray-500/30"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <p className="text-gray-600 mt-2">Explore our wide range of electronic accessories</p>
          <div className="w-24 h-1 bg-[#54B1CE] rounded-full mt-2 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#54B1CE] overflow-hidden"
            >
              <div className="p-4 text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-gray-200 group-hover:border-[#54B1CE]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-[#54B1CE] transition-colors">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="flex flex-col items-center pt-14 w-full">
        <p className="text-2xl font-medium text-left w-full max-w-7xl mx-auto">Popular products</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full mt-4">No products found.</p>
          )}
        </div>
        <button
          onClick={() => navigate("/all-products")}
          className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
        >
          See more
        </button>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-gray-50 rounded-lg p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">1000+</div>
          <div className="text-gray-600">Products Available</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">50+</div>
          <div className="text-gray-600">Brands</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#54B1CE]">24/7</div>
          <div className="text-gray-600">Customer Support</div>
        </div>
      </div>

      {/* Flow Diagram Section */}
      <div className="bg-white py-16 px-6 md:px-16 lg:px-32 overflow-x-hidden">
        <h2 className="text-3xl font-bold text-center text-[#54B1CE]">
          How Our Accessories Can Help You
        </h2>
        <p className="text-center mt-2 text-gray-600">
          Explore use cases and find products suited for your business
        </p>

        <div className="flex flex-row md:flex-row justify-start items-center mt-12 gap-16 overflow-x-auto scrollbar-hide relative max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className="flex flex-col items-center relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="bg-[#54B1CE] w-20 h-20 rounded-full flex items-center justify-center mb-4 overflow-hidden transform transition-transform duration-500 group-hover:scale-110 group-hover:animate-bounce">
                <img
                  src={useCase.icon}
                  alt={useCase.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold text-lg text-[#54B1CE] text-center">
                {useCase.title}
              </p>
              <p className="text-center text-gray-600 mt-2 max-w-xs">
                {useCase.description}
              </p>
              {index !== useCases.length - 1 && (
                <div className="absolute top-10 md:top-10 left-full md:left-auto md:right-[-90px] w-24 h-1 flex items-center justify-start">
                  <div className="w-full h-1 relative overflow-hidden rounded">
                    <div className="h-1 w-full bg-gradient-to-r from-[#54B1CE] via-white to-[#54B1CE] animate-gradient-move absolute"></div>
                    <div className="w-4 h-4 rotate-45 border-t-2 border-r-2 border-[#54B1CE] absolute right-0 -top-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NewsLetter Section */}
      <div className="relative flex flex-col items-center justify-center text-center py-20 bg-white overflow-hidden">
        <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-[#54B1CE]/20 via-white/0 to-[#54B1CE]/20 animate-pulse-slow z-0"></div>
        <div className="relative flex flex-col items-center justify-center w-72 h-72 md:w-96 md:h-96 rounded-full bg-white border-2 border-[#54B1CE] shadow-xl z-10 p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#054b6d] leading-snug">
            Subscribe now & get 20% off
          </h1>
          <p className="text-gray-500/80 mt-4 text-sm md:text-base max-w-xs">
            Join our newsletter to get exclusive offers on premium accessories — watches, earbuds, chargers, handsfree devices, and more.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 w-full max-w-xl z-10">
          <input
            className="border border-gray-300 rounded-md md:rounded-r-none h-12 px-4 w-full outline-none focus:ring-2 focus:ring-[#54B1CE]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="h-12 px-8 md:px-12 bg-[#54B1CE] text-white font-semibold rounded-md md:rounded-l-none hover:bg-[#3a8bbd] transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
          }

          @keyframes gradientMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-gradient-move {
            animation: gradientMove 1.5s linear infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce {
            animation: bounce 0.5s ease infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;