import { useState, useEffect } from "react";
import Product from "./Product";
import MinCategory from "../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import SeoData from "../../../SEO/SeoData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 5; // Number of items per page
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch wishlist count and product details
        const fetchWishlist = async (page) => {
            try {
                setIsLoading(true);
                console.log("Fetching wishlist page:", page);
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/wishlist-products?page=${page}&pageSize=${pageSize}`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                const newItems = res.data.wishlistItems;
                // append new items in state
                setWishlistItems((prev) => [...prev, ...newItems]);
                setCount(res?.data?.totalItems);
                setIsLoading(false);
                setIsLoadMore(false);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };
        auth.token && !isAdmin && fetchWishlist(page); // Fetch initial page
    }, [page, auth.token, isAdmin]);

    // Fetch more wishlist items when "Load more" is clicked
    const handleLoadMore = () => {
        setIsLoadMore(true);
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            if (nextPage <= Math.ceil(count / pageSize)) {
                return nextPage;
            }
            return prevPage;
        });
    };

    // Remove item from wishlist
    const updateWishlist = async (productId) => {
        try {
            setIsLoading(true);
            await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update-wishlist`,
                { productId, type: "remove" },
                { headers: { Authorization: auth.token } }
            );
            toast.success("Product Removed From Wishlist");
            setWishlistItems((prev) =>
                prev.filter((item) => item._id !== productId)
            );
            setCount((prev) => prev - 1);
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <>
            <SeoData title="My Wishlist" />
            <MinCategory />

            {isLoading && page === 1 ? (
                <Spinner />
            ) : (
                <main className="w-full pt-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen text-gray-100">
                    <div className="flex gap-3.5 w-full sm:w-11/12 sm:mt-4 m-auto pb-7">
                        <div className="flex-1 shadow-xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl border border-gray-800">
                            {/* Back button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-4 py-2 mt-4 mb-2 text-indigo-300 hover:text-indigo-400 bg-gray-900 rounded-lg border border-gray-800 shadow transition-all duration-200 w-fit"
                            >
                                <ArrowBackIcon />
                                <span className="font-medium">Back</span>
                            </button>
                            {/* Wishlist container */}
                            <div className="flex flex-col">
                                <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b border-gray-800 text-indigo-300">
                                    My Wishlist ({count})
                                </span>

                                {wishlistItems.length === 0 ? (
                                    <div className="flex items-center flex-col gap-2 m-6 pb-10">
                                        <img
                                            draggable="false"
                                            className="object-contain w-52 h-44 mt-6"
                                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                            alt="Empty Wishlist"
                                        />
                                        <span className="text-lg font-semibold text-indigo-300 mt-6">
                                            Empty Wishlist
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            You have no items in your wishlist. Start
                                            adding!
                                        </p>
                                    </div>
                                ) : (
                                    wishlistItems.map((item, index) => (
                                        <Product
                                            {...item}
                                            func={updateWishlist}
                                            key={index}
                                        />
                                    ))
                                )}

                                {count > wishlistItems.length && (
                                    <span className="font-medium text-md px-4 sm:px-8 py-4 flex items-center justify-center border-b border-gray-800">
                                        <button
                                            onClick={handleLoadMore}
                                            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg border-2 border-indigo-400 transition-all duration-300 group relative"
                                            disabled={isLoadMore}
                                        >
                                            <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-indigo-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_2px_#6366f1] transition-all duration-300"></span>
                                            <span className="relative z-10">
                                                {isLoadMore
                                                    ? "Loading..."
                                                    : "Load more items"}
                                            </span>
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default Wishlist;
