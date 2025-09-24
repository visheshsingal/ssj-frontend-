/* eslint-disable react/prop-types */
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { getDeliveryDate, getDiscount } from "../../../utils/functions";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cart";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ product, inCart }) => {
    const [, , addItems, removeItems, , addLater] = useCart();
    const [quantity, setQuantity] = useState(product?.quantity);

    const increaseQuantity = (product) => {
        const newQty = quantity + 1;
        if (newQty > product?.stock) {
            toast.warning("Product Stock is Limited!", {
                style: {
                    top: "40px",
                },
            });
            return;
        }
        setQuantity(newQty);
        addItems(product, newQty);
    };

    const decreaseQuantity = (product) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        setQuantity(newQty);
        addItems(product, newQty);
    };

    const removeCartItem = (product) => {
        removeItems(product);
    };

    const saveForLaterHandler = (product) => {
        addLater(product);
    };

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden">
            <Link
                to={`/product/${product?.productId}`}
                className="flex flex-col sm:flex-row gap-5 items-stretch w-full "
            >
                {/* product image */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <img
                        draggable="false"
                        className="h-full w-full object-contain"
                        src={product?.image}
                        alt={product?.name}
                    />
                </div>
                {/* description */}
                <div className="flex flex-col sm:gap-5 w-full ">
                    <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
                        <div className="flex flex-col gap-0.5 group sm:w-3/5">
                            <p className="group-hover:text-primaryBlue">
                                {product?.name?.length > 30
                                    ? `${product?.name?.substring(0, 30)}...`
                                    : product?.name}
                            </p>
                            <span className="text-sm text-gray-500">
                                Seller: {product?.brandName}
                            </span>
                        </div>
                        <div className="flex flex-col sm:gap-2 w-[50%]">
                            <p className="text-sm">
                                Delivery by {getDeliveryDate()} |{" "}
                                <span className="line-through">₹{40}</span>{" "}
                                <span className="text-primaryGreen">Free</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span className="text-sm text-gray-500 line-through font-normal">
                            ₹
                            {(
                                product?.price * product?.quantity
                            ).toLocaleString()}
                        </span>
                        <span>
                            ₹
                            {(
                               (product?.price - product?.discountPrice) * product?.quantity
                            ).toLocaleString()}
                        </span>
                        <span className="text-sm font-[600] text-primaryGreen">
                            {getDiscount(
                                product?.price,
                                product?.discountPrice
                            )}
                            %&nbsp;off
                        </span>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6">
                {/* quantity */}
                <div className="flex gap-2 items-center justify-between w-[130px]">
                    <button
                        onClick={() => decreaseQuantity(product)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-indigo-300 hover:bg-indigo-950 transition-all duration-200"
                        aria-label="Decrease"
                    >
                        <RemoveIcon fontSize="small" />
                    </button>
                    <input
                        className="w-11 border border-gray-700 outline-none text-center select-none rounded-sm py-0.5 bg-gray-900 text-indigo-200 font-medium text-sm qtyInput"
                        value={quantity}
                        disabled
                    />
                    <button
                        onClick={() => increaseQuantity(product)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-indigo-300 hover:bg-indigo-950 transition-all duration-200"
                        aria-label="Increase"
                    >
                        <AddIcon fontSize="small" />
                    </button>
                </div>
                {/* save for later & remove */}
                {inCart && (
                    <>
                        <button
                            onClick={() => saveForLaterHandler(product)}
                            className="sm:ml-4 font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 border border-indigo-500 rounded px-3 py-1 transition-all duration-200 bg-gray-900 hover:bg-indigo-950 shadow"
                        >
                            <SaveIcon sx={{ fontSize: "18px" }} />
                            SAVE FOR LATER
                        </button>
                        <button
                            onClick={() => removeCartItem(product)}
                            className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 border border-red-500 rounded px-3 py-1 transition-all duration-200 bg-gray-900 hover:bg-red-950 shadow"
                        >
                            <DeleteIcon sx={{ fontSize: "18px" }} />
                            REMOVE
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartItem;
