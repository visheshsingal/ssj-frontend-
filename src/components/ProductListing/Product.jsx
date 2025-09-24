/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Product = ({
    _id,
    images,
    name,
    ratings,
    numOfReviews,
    price,
    discountPrice,
    wishlistItems,
    setWishlistItems,
}) => {
    const { auth, isAdmin } = useAuth();

    const itemInWishlist = wishlistItems?.some((itemId) => itemId === _id);

    const updateWishlistUI = (add) => {
        setWishlistItems((prev) =>
            add ? [...prev, _id] : prev.filter((item) => item !== _id)
        );
    };

    const addToWishlistHandler = async () => {
        if (auth?.token === undefined) {
            toast.error("Please login!", {
                style: { top: "40px" },
            });
            return;
        }
        const type = itemInWishlist ? "remove" : "add";
        try {
            updateWishlistUI(type === "add");
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
                { productId: _id, type },
                { headers: { Authorization: auth.token } }
            );
        } catch (error) {
            if (error.message.includes("403")) {
                toast.error(
                    "Admins are not allowed to add items to the wishlist",
                    { toastId: "error" }
                );
            } else {
                toast.error("Something went wrong! Please try again later.", {
                    toastId: "error",
                });
            }
            updateWishlistUI(type !== "add");
        }
    };

    const handleShareProduct = async () => {
        const shareUrl = `${window.location.origin}/product/${_id}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: name,
                    url: shareUrl,
                });
            } catch (err) {}
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Product link copied!", {
                    style: { top: "40px" },
                });
            } catch (err) {}
        }
    };

    return (
        <>
            <ScrollToTopOnRouteChange />
            <div className="relative p-1 sm:p-2 animate-fadeIn">
                {/* Wishlist badge */}
                <span
                    onClick={addToWishlistHandler}
                    className={`${itemInWishlist
                        ? "text-red-400"
                        : "hover:text-red-400 text-gray-400"
                    } ${isAdmin ? "hidden" : ""}
                    absolute z-10 top-2 right-3 sm:top-3 sm:right-4 cursor-pointer transition-colors duration-200`}
                >
                    <FavoriteIcon sx={{ fontSize: "20px" }} />
                </span>
                {/* Share badge */}
                <span
                    onClick={handleShareProduct}
                    className="absolute z-10 top-2 right-10 sm:top-3 sm:right-12 cursor-pointer text-indigo-400 hover:text-indigo-600 bg-gray-900 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow"
                    title="Share this product"
                >
                    <ShareIcon sx={{ fontSize: "14px" }} />
                </span>
                {/* Product Card */}
                <div className="relative group w-full mx-w-[500px]">
                    {/* Glowing border */}
                    <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-[0_0_5px_2px_#6366f1]"></div>
                    <div className="border border-gray-600 overflow-hidden flex flex-col items-center gap-2 w-full  shadow-2xl relative rounded-xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-950/90 backdrop-blur-md transition-all duration-300">
                        {/* Image & product title */}
                        <Link
                            to={`/product/${_id}`}
                            className="flex flex-col items-center w-full text-center group"
                        >
                            <div className="w-full aspect-[5/5] flex items-center justify-center bg-red-500 rounded-md overflow-hidden">
                                <img
                                    draggable="false"
                                    className="w-full h-full object-cover rounded-md bg-gray-800"
                                    src={images && images[0]?.url}
                                    alt={name}
                                />
                            </div>
                        </Link>
                        {/* Product description */}
                        <div className="flex flex-col gap-1 items-start w-full px-1.5 py-3 sm:px-3 sm:py-4 pt-0">
                            <h2 className="w-full text-[12px] xs:text-sm sm:text-base md:text-base leading-5 font-semibold mt-1 sm:mt-2 group-hover:text-indigo-400 text-left text-gray-100 truncate"
                                title={name}
                            >
                                {name}
                            </h2>
                            {/* Rating badge */}
                            <span className="text-xs xs:text-sm text-gray-400 font-medium flex gap-2 items-center justify-between w-full">
                                <span className="text-xs px-1 py-0.5 bg-indigo-600 rounded-sm text-white flex items-center gap-0.5">
                                    {ratings.toFixed(1)}
                                    <StarIcon sx={{ fontSize: "12px" }} />
                                </span>
                                <span>({numOfReviews})</span>
                            </span>
                            {/* Price container */}
                            <div className="flex flex-wrap items-center gap-1 text-sm xs:text-base font-medium w-full">
                                <span className="text-indigo-300">
                                    ₹{(price - discountPrice).toLocaleString()}
                                </span>
                                <span className="text-gray-500 line-through text-xs">
                                    ₹{price.toLocaleString()}
                                </span>
                                <span className="text-xs text-green-400">
                                    {getDiscount(price, discountPrice)}%&nbsp;off
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Animation styles */}
                <style>
                    {`
                        .animate-fadeIn {
                            animation: fadeIn 0.8s cubic-bezier(.68,-0.55,.27,1.55) both;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(30px);}
                            to { opacity: 1; transform: translateY(0);}
                        }
                        @media (max-width: 640px) {
                            .text-xs { font-size: 11px !important; }
                            .text-sm { font-size: 12px !important; }
                            .text-base { font-size: 14px !important; }
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default Product;
