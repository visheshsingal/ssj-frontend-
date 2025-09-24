import React, { useState } from "react";
import Category from "./category";

import SeoData from "../../SEO/SeoData";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
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
	{
		id: 5,
		name: "Smart Watch",
		description: "Track your fitness and stay connected on the go.",
		price: "$110",
		image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
		feature: "Heart Rate Monitor",
	},
	{
		id: 6,
		name: "Wireless Charger",
		description: "Fast and convenient charging for all your devices.",
		price: "$35",
		image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		feature: "15W Fast Charge",
	},
	{
		id: 7,
		name: "Action Camera",
		description: "Capture your adventures in stunning 4K resolution.",
		price: "$150",
		image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
		feature: "4K Ultra HD",
	},
	{
		id: 8,
		name: "VR Headset",
		description: "Step into a new world with immersive VR experiences.",
		price: "$220",
		image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
		feature: "120° FOV",
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

const partners = [
	{
		name: "Sony",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg",
	},
	{
		name: "Samsung",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
	},
	{
		name: "JBL",
		logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/JBL_logo.svg",
	},
	{
		name: "Boat",
		logo: "https://seeklogo.com/images/B/boat-logo-6B1B6A6B3B-seeklogo.com.png",
	},
	{
		name: "Apple",
		logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
	},
];

const categoryData = [
	{
		name: "Mobiles",
		icon: "📱",
		subcategories: [
			"Smartphones",
			"Feature Phones",
			"Refurbished Phones",
			"Tablets",
		],
	},
	{
		name: "Mobile Accessories",
		icon: "🎧",
		subcategories: [
			"Chargers",
			"Cases & Covers",
			"Power Banks",
			"Screen Guards",
		],
	},
	{
		name: "Electronics",
		icon: "💻",
		subcategories: [
			"Headphones",
			"Speakers",
			"Smart Watches",
			"Camera & Drones",
		],
	},
	{
		name: "Clothing",
		icon: "👕",
		subcategories: [
			"Men's Wear",
			"Women's Wear",
			"Kids' Wear",
			"Winter Collection",
		],
	},
	{
		name: "Jewellery",
		icon: "💍",
		subcategories: ["Gold", "Silver", "Imitation", "Diamond"],
	},
];

const Home = () => {
	const [activeCategory, setActiveCategory] = useState(null);

	return (
		<>
			<SeoData title="Online Wholesaler Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
			<ScrollToTopOnRouteChange />
			<MinCategory />
			{/* <Categories /> */}
			<div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-white text-sky-900 font-sans overflow-x-hidden">
				{/* Hero Section */}
				<header className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24 overflow-hidden">
					{/* Animated Banner Vector */}
					<div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
						<svg className="w-full h-full" viewBox="0 0 1440 320" fill="none">
							<path
								fill="url(#bannerGradient)"
								fillOpacity="0.13"
								d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
							></path>
							<defs>
								<linearGradient id="bannerGradient" x1="0" y1="0" x2="1" y2="1">
									<stop offset="0%" stopColor="#38bdf8" />
									<stop offset="100%" stopColor="#0ea5e9" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					{/* Hero Content */}
					<div className="z-10 max-w-xl md:w-1/2 space-y-7 animate-fadeIn">
						<h1 className="text-5xl md:text-6xl font-extrabold text-sky-700 mb-2 leading-tight drop-shadow-none">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-400 to-sky-700 animate-gradient">
								Premium Electronics, Wholesale Prices
							</span>
						</h1>
						<div className="flex flex-wrap gap-2 mt-2">
							<span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
								Bulk Deals
							</span>
							<span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
								Latest Tech
							</span>
							<span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
								Fast Shipping
							</span>
							<span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
								Trusted Support
							</span>
						</div>
						<p className="text-lg md:text-xl text-sky-800/80 font-medium mt-4">
							We specialize in supplying businesses, retailers, and distributors
							with the latest products at wholesale prices. With a focus on
							reliability, quality, and speed, we empower your business to scale
							without the hassle.
						</p>
						<a
							href="#products"
							className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold rounded-full hover:scale-105 hover:from-sky-500 hover:to-blue-500 transition-all duration-300 animate-bounce"
						>
							Shop Now
						</a>
					</div>
					{/* Hero Illustration */}
					<div className="z-10 md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
						<img
							src="https://cdn.pixabay.com/animation/2023/03/22/10/23/10-23-44-627_512.gif"
							alt="Electronics Animation"
							className="hidden md:block w-[420px] h-[340px] object-contain rounded-3xl bg-sky-100 animate-slideIn"
						/>
						<svg
							className="md:hidden w-64 h-48"
							viewBox="0 0 320 180"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<ellipse
								cx="160"
								cy="90"
								rx="140"
								ry="70"
								fill="#38bdf8"
								fillOpacity="0.15"
							/>
							<rect
								x="80"
								y="60"
								width="160"
								height="60"
								rx="20"
								fill="#38bdf8"
								fillOpacity="0.25"
							/>
							<circle cx="160" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.3" />
						</svg>
					</div>
				</header>

				{/* Category Section */}
				{/* <section className="py-8 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
					<h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
						Shop by Category
					</h2>
					<div className="flex flex-wrap justify-center gap-6 mb-4">
						{categoryData.map((cat, idx) => (
							<button
								key={cat.name}
								onClick={() =>
									setActiveCategory(activeCategory === idx ? null : idx)
								}
								className={`flex flex-col items-center px-6 py-4 rounded-xl border-2 border-sky-200 bg-white text-sky-700 font-semibold hover:bg-sky-100 hover:border-sky-400 transition-all duration-200 focus:outline-none ${
									activeCategory === idx
										? "ring-2 ring-sky-400 scale-105 bg-sky-50"
										: ""
								} animate-fadeIn`}
								style={{ animationDelay: `${0.05 * idx}s`, animationFillMode: "both" }}
							>
								<span className="text-3xl mb-2">{cat.icon}</span>
								<span>{cat.name}</span>
							</button>
						))}
					</div>
					{/* Subcategory List */}
					{activeCategory !== null && (
						<div className="flex justify-center mt-2 animate-fadeIn">
							<div className="bg-sky-50 border border-sky-200 rounded-xl px-8 py-6 flex flex-wrap gap-4 shadow-none">
								{categoryData[activeCategory].subcategories.map((sub, i) => (
									<span
										key={sub}
										className="bg-sky-200 text-sky-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-300 transition animate-slideUp"
										style={{ animationDelay: `${0.05 * i}s`, animationFillMode: "both" }}
									>
										{sub}
									</span>
								))}
							</div>
						</div>
					)}
				{/* </section> */} 
				<Category />


				{/* Product Highlights Section */}
				<section className="py-10 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
					<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png"
								alt="Bulk"
								className="w-16 h-16 mb-4 animate-float"
							/>
							<h3 className="text-xl font-bold text-sky-700 mb-2">
								Bulk Orders
							</h3>
							<p className="text-sky-600">
								Order in bulk and save more. Special pricing for businesses and
								resellers.
							</p>
						</div>
						<div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1042/1042332.png"
								alt="Warranty"
								className="w-16 h-16 mb-4 animate-float"
							/>
							<h3 className="text-xl font-bold text-sky-700 mb-2">
								Warranty & Support
							</h3>
							<p className="text-sky-600">
								All products come with manufacturer warranty and 24/7 customer
								support.
							</p>
						</div>
						<div className="flex flex-col items-center text-center bg-white rounded-2xl border-2 border-sky-100 p-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1042/1042331.png"
								alt="Shipping"
								className="w-16 h-16 mb-4 animate-float"
							/>
							<h3 className="text-xl font-bold text-sky-700 mb-2">
								Express Shipping
							</h3>
							<p className="text-sky-600">
								Lightning-fast delivery across India. Track your orders in real
								time.
							</p>
						</div>
					</div>
				</section>

				{/* Products Section */}
				<section
					id="products"
					className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-12 animate-slideUp">
						Featured Products
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
						{products.map((product, idx) => (
							<div
								key={product.id}
								className="bg-white rounded-2xl border-2 border-sky-100 hover:border-sky-400 transition-shadow duration-300 p-6 flex flex-col items-center animate-fadeIn hover:scale-105"
								style={{
									animationDelay: `${0.1 * idx}s`,
									animationFillMode: "both",
								}}
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-32 h-32 object-cover rounded-xl mb-4 border-2 border-sky-200 hover:scale-110 transition-transform duration-300"
								/>
								<div className="text-center space-y-2">
									<h3 className="text-xl font-semibold text-sky-800">
										{product.name}
									</h3>
									<p className="text-sky-600">{product.description}</p>
									<span className="inline-block bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
										{product.feature}
									</span>
									<div>
										<span className="text-lg font-bold text-sky-500">
											{product.price}
										</span>
									</div>
								</div>
								<button className="mt-4 px-6 py-2 bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300">
									Buy Wholesale
								</button>
							</div>
						))}
					</div>
				</section>

				{/* About Section */}
				<section className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white animate-fadeIn">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6 text-center">
							About Us
						</h2>
						<div className="text-sky-700 text-lg space-y-4 mb-8">
							<p>
								We're committed to helping your business thrive. That's why we offer{" "}
								<strong className="text-sky-500">bulk discounts for wholesalers</strong>
								, ensuring you get the best possible prices. Our catalog is constantly
								updated with the{" "}
								<strong className="text-sky-500">latest electronic gadgets</strong>
								, so you can provide your customers with the most innovative products on
								the market.
							</p>
							<p>
								We know that in business, every moment counts. Our{" "}
								<strong className="text-sky-500">fast shipping & secure payments</strong>{" "}
								options ensure a smooth, worry-free process from order to delivery.
								Should you have any questions or need assistance, our{" "}
								<strong className="text-sky-500">dedicated customer support</strong> team
								is always ready to help. We're here to be your partner, not just another
								supplier.
							</p>
							<p>
								Our commitment to quality and service has earned the trust of businesses
								just like yours. We're proud to be{" "}
								<strong className="text-sky-500">trusted by over 10,000 businesses</strong>
								—a testament to our reliability and the value we bring to our partners.
							</p>
						</div>
						<ul className="space-y-4 text-lg text-sky-600 font-medium">
							<li className="flex items-center gap-2">
								<span className="text-sky-500 text-xl">✓</span> Bulk discounts for
								wholesalers
							</li>
							<li className="flex items-center gap-2">
								<span className="text-sky-500 text-xl">✓</span> Latest electronic
								gadgets
							</li>
							<li className="flex items-center gap-2">
								<span className="text-sky-500 text-xl">✓</span> Fast shipping & secure
								payments
							</li>
							<li className="flex items-center gap-2">
								<span className="text-sky-500 text-xl">✓</span> Dedicated customer
								support
							</li>
							<li className="flex items-center gap-2">
								<span className="text-sky-500 text-xl">✓</span> Trusted by 10,000+
								businesses
							</li>
						</ul>
						<div className="flex flex-wrap justify-center gap-8 mt-10">
							{[1, 2, 3, 4].map((img) => (
								<img
									key={img}
									src={`/${img}.jpg`}
									alt="Support Illustration"
									className="w-72 h-56 object-contain rounded-xl bg-sky-100 animate-fadeIn"
								/>
							))}
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="py-16 px-6 bg-gradient-to-br from-white via-sky-50 to-white">
					<h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-10 text-center">
						What Our Customers Say
					</h2>
					<div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
						{testimonials.map((t, idx) => (
							<div
								key={t.name}
								className="bg-white border-2 border-sky-100 rounded-2xl p-8 flex flex-col items-center text-center animate-fadeIn hover:scale-105 transition-transform duration-300"
								style={{ animationDelay: `${0.2 * idx}s`, animationFillMode: "both" }}
							>
								<img
									src={t.avatar}
									alt={t.name}
									className="w-16 h-16 rounded-full mb-3 border-2 border-sky-400"
								/>
								<p className="text-sky-700 italic mb-2">"{t.text}"</p>
								<span className="text-sky-500 font-semibold">{t.name}</span>
							</div>
						))}
					</div>
				</section>

				{/* Call to Action Banner */}
				<section className="py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-r from-sky-200 via-blue-100 to-sky-100">
					<div className="flex-1 flex flex-col items-center md:items-start">
						<h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-3">
							Elevate Your Business with{" "}
							<span className="text-blue-500">Wholesale</span>
						</h3>
						<p className="text-sky-600 text-lg mb-4">
							Get exclusive access to the latest tech, unbeatable prices, and a seamless
							wholesale experience.
						</p>
						<a
							href="#products"
							className="inline-block px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
						>
							Explore Products
						</a>
					</div>
					<div className="flex-1 flex justify-center">
						<svg
							width="260"
							height="180"
							viewBox="0 0 260 180"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<ellipse
								cx="130"
								cy="90"
								rx="120"
								ry="70"
								fill="#38bdf8"
								fillOpacity="0.13"
							/>
							<rect
								x="60"
								y="60"
								width="140"
								height="60"
								rx="20"
								fill="#38bdf8"
								fillOpacity="0.18"
							/>
							<circle cx="130" cy="90" r="30" fill="#0ea5e9" fillOpacity="0.22" />
							<rect
								x="110"
								y="80"
								width="40"
								height="20"
								rx="8"
								fill="#fff"
								fillOpacity="0.12"
							>
								<animate
									attributeName="x"
									values="110;150;110"
									dur="2s"
									repeatCount="indefinite"
								/>
							</rect>
						</svg>
					</div>
				</section>

				{/* Animations */}
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
          .animate-float {
            animation: float 3s ease-in-out infinite;
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
          @keyframes float {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-18px);}
          }
        `}
				</style>
			</div>
		</>
	);
};

export default Home;