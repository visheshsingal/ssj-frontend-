/* eslint-disable react/prop-types */
import { getDiscount } from "../../../utils/functions";
import { useCart } from "../../../context/cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const SaveForLaterItem = ({ product }) => {
    const [, , , , saveLaterItems, addLater, moveToCart, removeLater] =
        useCart();

    const removeFromSaveForLaterHandler = (product) => {
        removeLater(product);
    };

    const moveToCartHandler = (product, quantity) => {
        moveToCart(product, quantity);
    };

    return (
        <div
            className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b border-gray-800 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl shadow"
            key={product.productId}
        >
            <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full">
                {/* Product image */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
                    <img
                        draggable="false"
                        className="h-full w-full object-contain"
                        src={product?.image}
                        alt={product?.name}
                    />
                </div>
                {/* Description */}
                <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
                    {/* Product title */}
                    <div className="flex justify-between items-start pr-5">
                        <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
                            <p className="font-semibold text-indigo-200">
                                {product?.name?.length > 50
                                    ? `${product?.name?.substring(0, 50)}...`
                                    : product?.name}
                            </p>
                            <span className="text-sm text-gray-400">
                                Seller: {product?.brandName}
                            </span>
                        </div>
                    </div>
                    {/* Price desc */}
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span className="text-white">
                            ₹{(product?.price * product?.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through font-normal">
                            ₹{(product?.discountPrice * product?.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm text-green-400">
                            {getDiscount(product?.price, product?.discountPrice)}%&nbsp;off
                        </span>
                    </div>
                </div>
            </div>
            {/* Move to cart & remove */}
            <div className="flex justify-evenly sm:justify-start sm:gap-6 mt-2">
                {/* Quantity */}
                <div className="flex gap-2 items-center justify-between w-[130px]">
                    <span className="w-7 h-7 text-3xl font-light bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center cursor-not-allowed text-gray-500">
                        <p>-</p>
                    </span>
                    <input
                        className="w-11 border border-gray-700 outline-none text-center rounded-sm py-0.5 bg-gray-900 text-indigo-200 font-medium text-sm qtyInput"
                        value={product?.quantity}
                        disabled
                    />
                    <span className="w-7 h-7 text-xl font-light bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center cursor-not-allowed text-gray-500">
                        +
                    </span>
                </div>
                {/* Move to cart button */}
                <button
                    onClick={() => moveToCartHandler(product, product?.quantity)}
                    className="sm:ml-4 font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 border border-indigo-500 rounded px-3 py-1 transition-all duration-200 bg-gray-900 hover:bg-indigo-950 shadow"
                >
                    <ShoppingCartIcon sx={{ fontSize: "18px" }} />
                    MOVE TO CART
                </button>
                {/* Remove button */}
                <button
                    onClick={() => removeFromSaveForLaterHandler(product)}
                    className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 border border-red-500 rounded px-3 py-1 transition-all duration-200 bg-gray-900 hover:bg-red-950 shadow"
                >
                    <DeleteIcon sx={{ fontSize: "18px" }} />
                    REMOVE
                </button>
            </div>
        </div>
    );
};

export default SaveForLaterItem;
