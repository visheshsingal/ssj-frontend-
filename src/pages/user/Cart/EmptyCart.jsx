import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-4 m-6 pb-10 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl shadow-xl border border-gray-800">
            <div className="w-52 h-44 mt-6">
                <img
                    draggable="false"
                    className="w-full h-full object-contain"
                    src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                    alt="Empty Cart"
                />
            </div>
            <span className="text-lg font-semibold text-indigo-300">Your cart is empty!</span>
            <p className="text-sm text-gray-400">Add items to it now.</p>
            <Link
                to="/products"
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-md text-white px-12 py-2 rounded-lg shadow hover:shadow-lg border-2 border-indigo-400 transition-all duration-300 group relative mt-3"
            >
                <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-indigo-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_2px_#6366f1] transition-all duration-300"></span>
                <span className="relative z-10">Shop Now</span>
            </Link>
        </div>
    );
};

export default EmptyCart;
