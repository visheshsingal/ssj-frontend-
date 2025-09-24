import React, { useState, useEffect } from 'react';

// Main App component
const Category = () => {
    // State to hold category data
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock API call to simulate fetching data
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulating a network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const data = [
                { name: "Handfree", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Handfree" },
                { name: "Earbuds", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Earbuds" },
                { name: "Mix Items", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Mix+Items" },
                { name: "Car Bluetooth", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Bluetooth" },
                { name: "OTG Cables", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=OTG+Cables" },
                { name: "Car Chargers", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Chargers" },
                { name: "Cables and Chargers", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Cables" },
                { name: "Battery", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Battery" },
                { name: "Selfie Sticks", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Selfie+Sticks" },
                { name: "Car and Bike Stand", imageUrl: "https://placehold.co/120x120/EBF8FF/1D4ED8?text=Stand" },
            ];
            setCategories(data);
        } catch (err) {
            setError("Failed to fetch categories.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Render the component
    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            {/* Main content area */}
            <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-sky-800 mb-2">Shop by Category</h1>
                    <p className="text-lg text-gray-600">Explore our wide range of electronic accessories</p>
                </div>

                {/* Category Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categories.map((category, index) => (
                            <a
                                href="#"
                                key={index}
                                className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 p-4 border border-gray-200"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-sky-200 group-hover:border-sky-400 transition-colors duration-300">
                                        <img
                                            src={category.imageUrl}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://placehold.co/120x120/EBF8FF/1D4ED8?text=${encodeURIComponent(category.name)}`;
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-sky-700 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Category;
